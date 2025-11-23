<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, router, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import { useToast } from '@/components/ui/toast';

interface File {
      id: string;
      original_file_name: string;
      file_path: string;
      file_url: string;
      file_name: string;
      file_type: string;
      file_size: number;
      result: string;
}

interface PatientResult {
      id: number;
      result_type: string;
      test_name: string;
      test_date: string;
      notes: string;
      uploaded_at: string;
      status: 'pending' | 'sent' | 'failed';
      files: File[];
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
const downloadFile = (file: File) => {
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
                                    <button
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
                  </div>
            </div>
      </AuthenticatedLayout>
</template>