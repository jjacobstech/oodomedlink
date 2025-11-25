<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, router, useForm, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import { useToast } from '@/components/ui/toast';

interface file {
      id: string;
      original_file_name: string;
      file_path: string;
      file_url: string;
      file_name: string;
      file_type: string;
      file_size: number;
      result: string;

}



interface FormData {
      patient_name: string;
      patient_email: string;
      test_date: string;
      test_name: string;
      result_type: string;
      file: File[];
      notes: string;
      sendViaEmail: boolean;
      scheduleDate: string;
      scheduleTime: string;
}

interface PatientResult {
      id: number;
      result_type: string;
      test_name: string;
      test_date: string;
      notes: string;
      uploaded_at: string;
      status: 'pending' | 'sent' | 'failed';
      files: file[];
}

interface Patient {
      id: string;
      full_name: string;
      email: string;
      phone_no: string;
      gender: string;
      date_of_birth: string | null;
      address: string | null;
      created_at: string;
      updated_at: string;
      results?: PatientResult[];
}

interface Props {
      patient: Patient;
}

const props = defineProps<Props>();
const page = usePage();
const { toast } = useToast();
const showDeleteConfirm = ref(false);
const selectedResult = ref<PatientResult | null>(null);

// Format date
const formatDate = (dateString: string | null | undefined) => {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
      });
};

const formatDateTime = (dateString: string | null | undefined) => {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
      });
};
const showUploadModal = ref(false);
const p = props.patient;

// Upload form
const uploadForm = useForm<FormData>({
      patient_name: p.full_name ?? '',
      patient_email: p.email ?? '',
      test_date: '',
      test_name: '',
      result_type: '',
      file: [] as File[],
      notes: '',
      sendViaEmail: true,
      scheduleDate: '',
      scheduleTime: '',
});

// File input handling
const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
            for (let file of target.files) {
                  uploadedFiles.value.push(file);
                  uploadForm.file.push(file);
            }
      }
}

const uploadedFiles = ref<File[]>([]);

const handleFileRemove = (index: number) => {
      uploadedFiles.value.splice(index, 1);
      uploadForm.file.splice(index, 1);
};

// Submit upload
const submitUpload = () => {
      uploadForm.post(route('user.result.upload'), {
            onSuccess: (response) => {
                  uploadForm.reset();
                  uploadedFiles.value = [];
                  showUploadModal.value = false;

                  toast({
                        title: response.props.error ? 'Error' : 'Success',
                        description: response.props.error ? response.props.error : 'Upload successful',
                        type: 'foreground',
                        variant: 'default',
                        class: 'text-primaryDark bg-white shadow-lg bottom-96',
                        open: true,

                  });

            },
            onError: (errors) => {
                  console.error('Upload error:', errors);
            },
      });
}

// Calculate age from date of birth
const calculateAge = (dob: string | null) => {
      if (!dob) return 'N/A';
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
            age--;
      }
      return `${age} years`;
};

// Navigate back to patients list
const goBack = () => {
      router.visit(route('user.patients'));
};

// Delete patient
const deletePatient = () => {
      if (
            confirm(
                  'Are you sure you want to delete this patient? This action cannot be undone.'
            )
      ) {
            router.delete(route('user.patients.destroy', props.patient.id), {
                  onSuccess: (response) => {
                        toast({
                              title: response.props.success
                                    ? 'Patient Deleted'
                                    : 'Patient Deletion Error',
                              description: response.props.success ?? response.props.error,
                              variant: 'default',
                              open: true,
                              class: 'text-primaryDark bg-white shadow-lg bottom-96',
                              duration: 10000,
                        });
                  },
                  onError: (error) => {
                        //      console.error('Error:', error);
                        toast({
                              title: 'Deletion Failed',
                              description: 'Failed to delete patient. Please try again.',
                              variant: 'destructive',
                              duration: 5000,
                        });
                  },
            });
      }
};

// Get status badge color
const getStatusColor = (status: string) => {
      switch (status) {
            case 'sent':
                  return 'bg-green-100 text-green-800';
            case 'pending':
                  return 'bg-yellow-100 text-yellow-800';
            case 'failed':
                  return 'bg-red-100 text-red-800';
            default:
                  return 'bg-gray-100 text-gray-800';
      }
};

// View result details
const viewResult = (result: PatientResult) => {
      selectedResult.value = result;
};

// Download file
const downloadFile = (file: file) => {
      window.open(file.file_url, '_blank');
};

// Format file size
const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
</script>
<template>

      <Head :title="`Patient: ${patient.full_name}`" />

      <AuthenticatedLayout>
            <div class="flex w-full gap-1  overflow-y-hidden bg-primaryLight">
                  <div class="overflow-y-scroll w-full p-4 sm:p-6">
                        <!-- Header with Back Button -->
                        <div class="mb-6">
                              <button @click="goBack"
                                    class="mb-4 flex items-center gap-2 text-primaryDark hover:text-primaryDark/80 font-semibold transition text-sm sm:text-base">
                                    <span>←</span> Back to Patients
                              </button>

                              <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
                                    <div class="flex-1 min-w-0">
                                          <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 break-words">
                                                {{ patient.full_name }}
                                          </h1>
                                          <p class="text-sm sm:text-base text-gray-600 mt-1">
                                                Patient Details & Medical Records
                                          </p>
                                    </div>
                                    <div class="flex gap-2 sm:gap-3 w-full sm:w-auto">
                                          <button @click="deletePatient"
                                                class="flex-1 sm:flex-initial rounded-md bg-red-600 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all duration-150 hover:-translate-y-1 hover:shadow-lg">
                                                Delete
                                          </button>
                                    </div>
                              </div>
                        </div>

                        <!-- Patient Information Card -->
                        <div class="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
                              <h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
                                    Personal Information
                              </h2>
                              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div class="space-y-1">
                                          <label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase">Full
                                                Name</label>
                                          <p class="text-base sm:text-lg text-gray-800 break-words">
                                                {{ patient.full_name }}
                                          </p>
                                    </div>
                                    <div class="space-y-1">
                                          <label
                                                class="text-xs sm:text-sm font-semibold text-gray-500 uppercase">Email</label>
                                          <p class="text-base sm:text-lg text-gray-800 break-all">
                                                {{ patient.email }}
                                          </p>
                                    </div>
                                    <div class="space-y-1">
                                          <label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase">Phone
                                                Number</label>
                                          <p class="text-base sm:text-lg text-gray-800">
                                                {{ patient.phone_no || 'N/A' }}
                                          </p>
                                    </div>
                                    <div class="space-y-1">
                                          <label
                                                class="text-xs sm:text-sm font-semibold text-gray-500 uppercase">Gender</label>
                                          <p class="text-base sm:text-lg text-gray-800">
                                                {{ patient.gender || 'N/A' }}
                                          </p>
                                    </div>
                                    <div class="space-y-1">
                                          <label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase">Date
                                                of Birth</label>
                                          <p class="text-base sm:text-lg text-gray-800">
                                                {{ formatDate(patient.date_of_birth) }}
                                                <span v-if="patient.date_of_birth"
                                                      class="text-gray-500 text-sm sm:text-base ml-2">
                                                      ({{ calculateAge(patient.date_of_birth) }})
                                                </span>
                                          </p>
                                    </div>
                                    <div class="space-y-1">
                                          <label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase">Patient
                                                Since</label>
                                          <p class="text-base sm:text-lg text-gray-800">
                                                {{ formatDate(patient.created_at) }}
                                          </p>
                                    </div>
                                    <div class="sm:col-span-2 space-y-1">
                                          <label
                                                class="text-xs sm:text-sm font-semibold text-gray-500 uppercase">Address</label>
                                          <p class="text-base sm:text-lg text-gray-800 break-words">
                                                {{ patient.address || 'N/A' }}
                                          </p>
                                    </div>
                              </div>
                        </div>

                        <!-- Medical Results Section -->
                        <div class="bg-white rounded-xl shadow-md p-4 sm:p-6">
                              <div
                                    class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-2 border-b">
                                    <h2 class="text-lg sm:text-xl font-bold text-gray-800">
                                          Medical Results ({{
                                          patient.results?.length || 0
                                          }})
                                    </h2>
                                    <button @click="showUploadModal = true"
                                          class="w-full sm:w-auto rounded-md bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition-all duration-150 hover:shadow-lg">
                                          + Upload Result
                                    </button>
                              </div>

                              <!-- Results List -->
                              <div v-if="patient.results && patient.results.length > 0" class="space-y-4">
                                    <div v-for="result in patient.results" :key="result.id"
                                          class="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition">
                                          <div class="flex flex-col sm:flex-row justify-between items-start gap-3">
                                                <div class="flex-1 w-full min-w-0">
                                                      <div class="flex flex-wrap items-center gap-2 mb-2">
                                                            <h3
                                                                  class="text-base sm:text-lg font-semibold text-gray-800 break-words">
                                                                  {{
                                                                        result.result_type ||
                                                                        'Medical Result'
                                                                  }}
                                                            </h3>
                                                            <span :class="getStatusColor(result.status)"
                                                                  class="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold uppercase whitespace-nowrap">
                                                                  {{ result.status }}
                                                            </span>
                                                      </div>
                                                      <div
                                                            class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                                                            <div>
                                                                  <span class="font-semibold">Uploaded:</span>
                                                                  {{
                                                                        formatDateTime(
                                                                              result.uploaded_at
                                                                        )
                                                                  }}
                                                            </div>
                                                            <div>
                                                                  <span class="font-semibold">Files:</span>
                                                                  {{ result.files?.length || 0 }}
                                                                  file(s)
                                                            </div>
                                                      </div>
                                                </div>
                                                <div class="w-full sm:w-auto">
                                                      <button @click="viewResult(result)"
                                                            class="w-full sm:w-auto rounded bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-200">
                                                            View Details
                                                      </button>
                                                </div>
                                          </div>

                                          <!-- Files Preview -->
                                          <div v-if="result.files && result.files.length > 0"
                                                class="mt-4 pt-4 border-t">
                                                <p class="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                                      Attached Files:
                                                </p>
                                                <div
                                                      class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                                                      <div v-for="file in result.files" :key="file.id"
                                                            class="border rounded-lg p-2 sm:p-3 hover:shadow-md transition cursor-pointer"
                                                            @click="downloadFile(file)">
                                                            <div class="flex items-center gap-2">
                                                                  <span class="text-xl sm:text-2xl">📄</span>
                                                                  <div class="flex-1 min-w-0">
                                                                        <p class="text-xs font-medium text-gray-800 truncate"
                                                                              :title="file.original_file_name
                                                                                    ">
                                                                              {{
                                                                                    file.original_file_name
                                                                              }}
                                                                        </p>
                                                                        <p class="text-xs text-gray-500">
                                                                              {{
                                                                                    formatFileSize(
                                                                                          file.file_size
                                                                                    )
                                                                              }}
                                                                        </p>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              <!-- No Results -->
                              <div v-else class="text-center py-8 sm:py-12 text-gray-500">
                                    <div class="text-4xl sm:text-6xl mb-4">📋</div>
                                    <p class="text-base sm:text-lg font-medium">
                                          No medical results found
                                    </p>
                                    <p class="text-xs sm:text-sm mt-2 px-4">
                                          Upload results to start tracking this patient's
                                          medical history
                                    </p>
                              </div>
                        </div>

                        <!-- Result Details Modal -->
                        <div v-if="selectedResult"
                              class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                              @click.self="selectedResult = null">
                              <div class="w-full max-w-3xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
                                    <!-- Modal Header -->
                                    <div
                                          class="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-start justify-between gap-4">
                                          <h3 class="text-lg sm:text-2xl font-bold text-gray-800 break-words flex-1">
                                                Result Details
                                          </h3>
                                          <button @click="selectedResult = null"
                                                class="flex-shrink-0 text-gray-400 hover:text-gray-600 text-2xl font-bold">
                                                ×
                                          </button>
                                    </div>

                                    <!-- Modal Content -->
                                    <div class="p-4 sm:p-6 space-y-4">
                                          <div class="space-y-1">
                                                <label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase">Result
                                                      Type</label>
                                                <p class="text-base sm:text-lg text-gray-800 break-words">
                                                      {{ selectedResult.result_type }}
                                                </p>
                                          </div>
                                          <div class="space-y-1">
                                                <label
                                                      class="text-xs sm:text-sm font-semibold text-gray-500 uppercase">Status</label>
                                                <span :class="getStatusColor(selectedResult.status)
                                                      "
                                                      class="inline-block mt-1 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase">
                                                      {{ selectedResult.status }}
                                                </span>
                                          </div>
                                          <div class="space-y-1">
                                                <label
                                                      class="text-xs sm:text-sm font-semibold text-gray-500 uppercase">Uploaded</label>
                                                <p class="text-base sm:text-lg text-gray-800">
                                                      {{
                                                            formatDateTime(
                                                                  selectedResult.uploaded_at
                                                            )
                                                      }}
                                                </p>
                                          </div>
                                          <div class="space-y-2">
                                                <label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase">Files
                                                      ({{
                                                            selectedResult.files?.length || 0
                                                      }})</label>
                                                <div class="space-y-2">
                                                      <div v-for="file in selectedResult.files" :key="file.id"
                                                            class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 border rounded-lg hover:bg-gray-50">
                                                            <div class="flex items-center gap-3 flex-1 min-w-0">
                                                                  <span class="text-2xl">📄</span>
                                                                  <div class="min-w-0 flex-1">
                                                                        <p
                                                                              class="font-medium text-gray-800 text-sm sm:text-base break-all">
                                                                              {{
                                                                                    file.original_file_name
                                                                              }}
                                                                        </p>
                                                                        <p class="text-xs sm:text-sm text-gray-500">
                                                                              {{
                                                                                    formatFileSize(
                                                                                          file.file_size
                                                                                    )
                                                                              }}
                                                                        </p>
                                                                  </div>
                                                            </div>
                                                            <button @click="downloadFile(file)"
                                                                  class="w-full sm:w-auto px-4 py-2 bg-primaryDark text-white rounded-lg hover:bg-primaryDark/90 transition text-sm font-semibold whitespace-nowrap">
                                                                  Download
                                                            </button>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>

                                    <!-- Modal Footer -->
                                    <div class="border-t p-4 sm:p-6">
                                          <button @click="selectedResult = null"
                                                class="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold text-sm sm:text-base">
                                                Close
                                          </button>
                                    </div>
                              </div>
                        </div>


                        <!-- Upload Modal -->
                        <div v-if="showUploadModal"
                              class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6 lg:p-10"
                              @click.self="showUploadModal = false">
                              <div
                                    class="w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl p-6 sm:p-8 lg:p-10 xl:p-16 bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
                                    <h3 class="mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                                          Upload Patient Result
                                    </h3>

                                    <form @submit.prevent="submitUpload" class="space-y-4 sm:space-y-5 lg:space-y-6">
                                          <!-- Patient Name -->
                                          <div>
                                                <label
                                                      class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700">
                                                      Patient Name
                                                </label>
                                                <input v-model="uploadForm.patient_name" type="text" required
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                      placeholder="Enter patient name" autocomplete="name" />
                                          </div>

                                          <!-- Patient Email -->
                                          <div>
                                                <label
                                                      class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700">
                                                      Patient Email
                                                </label>
                                                <input v-model="uploadForm.patient_email" type="email" required
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                      placeholder="Enter patient email" autocomplete="email" />
                                          </div>

                                          <!-- Test Name -->
                                          <div>
                                                <label
                                                      class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700">
                                                      Test Name
                                                </label>
                                                <input v-model="uploadForm.test_name" type="text" required
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                      placeholder="Enter test name" />
                                          </div>

                                          <!-- Result Type -->
                                          <div>
                                                <label
                                                      class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700">
                                                      Result Type
                                                </label>
                                                <select v-model="uploadForm.result_type" required
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                                                      <option value="">Select result type</option>
                                                      <option value="Blood Test">Blood Test</option>
                                                      <option value="X-Ray">X-Ray</option>
                                                      <option value="MRI">MRI</option>
                                                      <option value="CT Scan">CT Scan</option>
                                                      <option value="Lab Analysis">
                                                            Lab Analysis
                                                      </option>
                                                      <option value="Other">Other</option>
                                                </select>
                                          </div>

                                          <!-- Test Date -->
                                          <div>
                                                <label
                                                      class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700">
                                                      Test Date
                                                </label>
                                                <input v-model="uploadForm.test_date" type="date" required
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                      autocomplete="date" />
                                          </div>

                                          <!-- Notes -->
                                          <div>
                                                <label
                                                      class="block mb-2 text-sm font-extrabold sm:text-base text-gray-700">
                                                      Notes
                                                </label>
                                                <textarea v-model="uploadForm.notes" rows="3"
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                      placeholder="e.g referrals, prescriptions etc">
                                </textarea>
                                          </div>

                                          <!-- File Upload Dropzone -->
                                          <div class="flex items-center justify-center w-full">
                                                <label for="dropzone-file"
                                                      class="flex flex-col items-center justify-center w-full h-48 sm:h-56 lg:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-primaryLight/30 transition-colors group">
                                                      <div class="flex flex-col items-center justify-center px-4">
                                                            <svg class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-3 sm:mb-4 text-gray-500 group-hover:text-gray-600 transition-colors"
                                                                  aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                                  fill="none" viewBox="0 0 20 16">
                                                                  <path stroke="currentColor" stroke-linecap="round"
                                                                        stroke-linejoin="round" stroke-width="2"
                                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                            <p
                                                                  class="mb-2 text-sm sm:text-base lg:text-lg text-gray-500 text-center">
                                                                  <span class="font-semibold">Click to upload</span>
                                                                  or drag and drop
                                                            </p>
                                                            <p class="text-xs sm:text-sm text-gray-500 text-center">
                                                                  PDF, PNG, JPG (MAX. 10MB per file)
                                                            </p>
                                                      </div>
                                                      <input id="dropzone-file" type="file" multiple
                                                            accept=".pdf,.png,.jpg,.jpeg" @change="handleFileChange"
                                                            class="hidden" />
                                                </label>
                                          </div>

                                          <!-- Uploaded Files List -->
                                          <div v-if="uploadedFiles.length > 0" class="space-y-2">
                                                <p class="text-sm font-semibold text-gray-700 mb-2">
                                                      Selected Files ({{ uploadedFiles.length }})
                                                </p>
                                                <div v-for="(file, index) in uploadedFiles" :key="index"
                                                      class="w-full flex justify-between items-center px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50">
                                                      <span
                                                            class="truncate max-w-[200px] md:max-w-[300px] xl:max-w-[400px]">
                                                            {{ file.name }}
                                                      </span>

                                                      <button type="button" @click="handleFileRemove(index)"
                                                            class="text-red-600 hover:text-red-800 transition-colors">
                                                            <CloseCircle weight="Bold" :size="24" />
                                                      </button>
                                                </div>
                                          </div>

                                          <div v-if="uploadForm.sendViaEmail" class="space-y-2">
                                                <label
                                                      class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700">
                                                      Schedule Date
                                                </label>
                                                <input v-model="uploadForm.scheduleDate" type="date"
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                                                <label
                                                      class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700">
                                                      Schedule Time
                                                </label>
                                                <input v-model="uploadForm.scheduleTime" type="time"
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                                          </div>

                                          <!-- Actions Section -->
                                          <div class="flex flex-col sm:flex-row sm:justify-between gap-4 pt-2 sm:pt-4">
                                                <!-- Checkbox -->
                                                <div class="flex items-center gap-2 sm:gap-3">
                                                      <input type="checkbox" v-model="uploadForm.sendViaEmail"
                                                            class="w-4 h-4 sm:w-5 sm:h-5 text-primaryDark bg-gray-100 border-gray-300 rounded focus:ring-primaryDark focus:ring-2 transition-all flex-shrink-0" />
                                                      <span
                                                            class="text-xs font-extrabold sm:text-sm lg:text-base text-gray-700">
                                                            Upload and send result immediately
                                                      </span>
                                                </div>

                                                <!-- Buttons -->
                                                <div class="flex gap-2 sm:gap-3 w-full sm:w-auto">
                                                      <button type="submit" :disabled="uploadForm.processing ||
                                                            uploadedFiles.length === 0
                                                            "
                                                            class="flex-1 sm:flex-none sm:min-w-[100px] hover:-translate-y-1 duration-150 px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:transform-none">
                                                            {{
                                                                  uploadForm.processing
                                                                        ? 'Uploading...'
                                                                        : 'Upload'
                                                            }}
                                                      </button>
                                                      <button type="button" @click="
                                                            () => {
                                                                  showUploadModal = false;
                                                                  uploadForm.reset();
                                                                  uploadedFiles = [];
                                                            }
                                                      "
                                                            class="flex-1 sm:flex-none sm:min-w-[100px] px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-gray-700 transition-all hover:-translate-y-1 duration-150 bg-gray-200 rounded-lg hover:bg-gray-300 hover:shadow-lg">
                                                            Cancel
                                                      </button>
                                                </div>
                                          </div>
                                    </form>
                              </div>
                        </div>
                  </div>
            </div>
      </AuthenticatedLayout>
</template>