<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { CloseCircle } from '@solar-icons/vue';
import { useToast } from '@/components/ui/toast';
import { Spinner } from '@/components/ui/spinner';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import Label from '@/components/ui/label/Label.vue';
import { CheckCircle } from '@solar-icons/vue';
import axios from 'axios';
import Toaster from '@/components/ui/toast/Toaster.vue';
import { Refresh } from '@solar-icons/vue';

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

interface PatientResult {
      id: number;
      patient: {
            id: string;
            full_name: string;
            email: string;
      };
      result_type: string;
      file_name: string;
      file_path: string;
      file_type: 'pdf' | 'image' | 'csv';
      uploaded_at: string;
      status: 'pending' | 'sent' | 'failed' | 'uploaded' | 'archived';
      files: file[];
}

interface PaginationData {
      current_page: number;
      data: PatientResult[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: Array<{
            url: string | null;
            label: string;
            active: boolean;
      }>;
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number;
      total: number;
}

interface Props {
      user?: any;
      results: PaginationData;
      stats?: {
            total_uploads: number;
            total_patients: number;
            pending_results: number;
            completed_result: number;
      };
      filters?: {
            filter?: string;
            search?: string;
      };
}

interface FormData {
      patient_name: string;
      patient_email: string;
      patient_phone_no: string;
      test_date: string;
      test_name: string;
      result_type: string;
      file: File[];
      notes: string;
      sendViaEmail: boolean;
      sendViaWhatsapp: boolean;
      scheduleDate: string;
      scheduleTime: string;
      summary: string;
}

interface Trace {
      name: boolean;
      result_type: boolean;
      test_name: boolean;
}

const props = defineProps<Props>();

const showUploadModal = ref(false);
const selectedFilter = ref(props.filters?.filter || 'all');
const searchQuery = ref(props.filters?.search || '');
const previewFile = ref<PatientResult | null>(null);
const { toast } = useToast();
const noErrors = ref<boolean>(false);
const foundError = ref<boolean>(false);
const checking = ref(false);
const connectionError = ref(false);
const errorTrace = ref<Trace>();

const file = ref(null);
const error = ref(null);
const dragActive = ref(false);
const documentText = ref('');
const summary = ref()
const summarizing = ref(false);

const stats = [
      {
            name: 'total uploads',
            count: props.stats?.total_uploads || 0,
            icon: '📤',
            color: 'primaryDark',
      },
      {
            name: 'pending results',
            count: props.stats?.pending_results || 0,
            icon: '⏳',
            color: 'primaryDark',
      },
      {
            name: 'completed results',
            count: props.stats?.completed_result || 0,
            icon: '✅',
            color: 'primaryDark',
      },
      {
            name: 'total patients',
            count: props.stats?.total_patients || 0,
            icon: '👥',
            color: 'primaryDark',
      },
];

const selectionFilter = ['all', 'pending', 'sent', 'failed'];

// Upload form
const uploadForm = useForm<FormData>({
      patient_name: '',
      patient_email: '',
      patient_phone_no: '',
      test_date: '',
      test_name: '',
      result_type: '',
      file: [],
      notes: '',
      sendViaEmail: true,
      sendViaWhatsapp: false,
      scheduleDate: '',
      scheduleTime: '',
      summary: ''
});


const uploadedFiles = ref<File[]>([]);
const resultTypes = ref<string[]>([
      'Blood Test',
      'Complete Blood Count (CBC)',
      'Blood Chemistry Panel',
      'Lipid Panel',
      'Liver Function Tests',
      'Kidney Function Tests',
      'Thyroid Function Tests',
      'Glucose Test',
      'Coagulation Tests',
      'Urinalysis',
      'Urine Culture',
      '24-Hour Urine Collection',
      'X-Ray',
      'CT Scan',
      'MRI',
      'Ultrasound',
      'Mammography',
      'PET Scan',
      'Tissue Biopsy',
      'Bone Marrow Biopsy',
      'Skin Biopsy',
      'Lumbar Puncture (CSF)',
      'Bacterial Culture',
      'Viral Culture',
      'Fungal Culture',
      'Parasite Test',
      'Allergy Test',
      'Antibody Test',
      'Autoimmune Panel',
      'Genetic Test',
      'DNA Test',
      'PCR Test',
      'Drug Screening',
      'Toxicology Screen',
      'Hormone Panel',
      'Pregnancy Test',
      'STI Test',
      'COVID-19 Test',
      'Flu Test',
      'Strep Test',
      'Helicobacter Pylori Test',
      'Tuberculosis Test',
      'Bone Density (DEXA)',
      'EKG/ECG',
      'Echocardiogram',
      'Stress Test',
      'Holter Monitor',
      'Sleep Study',
      'Pulmonary Function Test',
      'Endoscopy',
      'Colonoscopy',
      'Gastroscopy',
      'Bronchoscopy',
      'Vision Test',
      'Hearing Test',
      'Other'
])

// File input handling
const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
            for (let file of target.files) {
                  uploadedFiles.value.push(file);
                  uploadForm.file.push(file);
            }
      }

      checkDocument();
      return 1;
};

const handleFileRemove = (index: number) => {
      uploadedFiles.value.splice(index, 1);
      uploadForm.file.splice(index, 1);
};

const handleDrop = (e: any) => {
      dragActive.value = false;
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            uploadedFiles.value.push(e.dataTransfer.files[0]);
            uploadForm.file.push(e.dataTransfer.files[0]);
            error.value = null;
      }
};



const checkDocument = async () => {

      checking.value = true;
      noErrors.value = false;
      foundError.value = false;

      const formData = new FormData();

      formData.append('patient_name', uploadForm.patient_name);
      formData.append('test_date', uploadForm.test_date);
      formData.append('test_name', uploadForm.test_name);
      formData.append('result_type', uploadForm.result_type);


      if (uploadForm.file && uploadForm.file.length > 0) {
            for (let i = 0; i < uploadForm.file.length; i++) {
                  formData.append('file[]', uploadForm.file[i]);
            }
      } else {
            toast({
                  title: 'No Files Selected',
                  description: 'Please select at least one document to upload and continue.',
                  type: 'foreground',
                  variant: 'default',
                  class: 'text-primaryDark bg-white shadow-lg',
                  open: true,
            });
            return; // Exit if no files are present
      }

      try {

            const check = await axios.post(route('user.result.check'), formData);

            errorTrace.value = check.data.trace


            if (check.data.status === true) {
                  checking.value = false;
                  noErrors.value = true;
                  foundError.value = false;

                  documentText.value = check.data.document

                  return 1;
            }

            else if (check.data.status === false) {

                  checking.value = false;
                  noErrors.value = false;
                  foundError.value = true;
                  documentText.value = check.data.document
                  return;

            }
            else {
                  toast({
                        title: 'Connection Error',
                        description: 'Document Check failed , check your connection',
                        type: 'foreground',
                        variant: 'default',
                        class: 'text-primaryDark bg-white shadow-lg',
                        open: true,

                  });
                  connectionError.value = true
                  checking.value = false;
                  noErrors.value = false;
                  foundError.value = false;
                  documentText.value = check.data.document
                  return 0;

            }

      } catch (error: unknown) {
            console.error("Error during upload:", error);
            toast({
                  title: 'Connection Error',
                  description: 'Document Check failed , check your connection',
                  type: 'foreground',
                  variant: 'default',
                  class: 'text-primaryDark bg-white shadow-lg',
                  open: true,

            });
            connectionError.value = true


      }
      checking.value = false;
      foundError.value = false;
      return 0;
}

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
                        class: 'text-primaryDark bg-white shadow-lg',
                        open: true,

                  });
                  router.get(route('user.dashboard'));


            },
            onError: (errors) => {
                  console.error('Upload error:', errors);
            },
      });
};


// Filter and search results
const applyFilters = (filterValue?: string) => {
      if (filterValue !== undefined) {
            selectedFilter.value = filterValue;
      }

      const payload: Record<string, any> = {};

      if (selectedFilter.value && selectedFilter.value !== 'all') {
            payload.filter = selectedFilter.value;
      }

      if (searchQuery.value && searchQuery.value.trim() !== '') {
            payload.search = searchQuery.value.trim();
      }

      router.get(route('user.dashboard'), payload, {
            onError: (response) => {
                  // console.error('Filter error:', response);
            },
            preserveScroll: true,
            preserveState: true,
      });
};

const summarize = async () => {

      summarizing.value = true
      const formData = new FormData();

      formData.append('text', documentText.value)

      try {

            const resultSummary = await axios.post(route('user.result.summarize'), formData);




            if (resultSummary.data) {
                  summary.value = resultSummary.data
                  uploadForm.summary = summary.value
                  summarizing.value = false

            }

            else if (resultSummary.data === false) {
                  toast({
                        title: 'Server error',
                        description: 'Summary failed , an error has occured',
                        type: 'foreground',
                        variant: 'default',
                        class: 'text-primaryDark bg-white shadow-lg',
                        open: true,

                  });
                  summarizing.value = false

                  return;
            }
            else {
                  toast({
                        title: 'Connection Error',
                        description: 'Summary failed , check your connection',
                        type: 'foreground',
                        variant: 'default',
                        class: 'text-primaryDark bg-white shadow-lg',
                        open: true,

                  });
                  summarizing.value = false


                  return 0;
            }

      } catch (error: unknown) {
            summarizing.value = false
            // console.error("Error during upload:", error);
            toast({
                  title: 'Connection Error',
                  description: 'Document Check failed , check your connection',
                  type: 'foreground',
                  variant: 'default',
                  class: 'text-primaryDark bg-white shadow-lg',
                  open: true,

            });

      }
}

// Clear all filters
const clearFilters = () => {
      selectedFilter.value = 'all';
      searchQuery.value = '';

      router.get(route('user.dashboard'), {}, {
            onError: (response) => {
                  // console.error('Clear error:', response);
            },
            preserveScroll: true,
            preserveState: true,
      });
};

// Navigate to page
const goToPage = (url: string | null) => {
      if (!url) return;

      router.get(url, {}, {
            preserveScroll: true,
            preserveState: true,
      });
};

// Download result
const downloadResult = (file: file) => {
      window.open(file.file_url, '_blank');
};

// View result preview
const viewPreview = (result: PatientResult) => {
      previewFile.value = result;
};

// Format date
const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
      });
};

// Get file type icon
const getFileIcon = (fileType: string) => {
      switch (fileType) {
            case 'pdf':
                  return '📄';
            case 'image':
                  return '🖼️';
            case 'csv':
                  return '📊';
            default:
                  return '📁';
      }
};

// Handle Enter key in search input
const handleSearchKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
            applyFilters();
      }
};
</script>

<template>

      <Head title="Clinic Dashboard" />

      <AuthenticatedLayout>

            <Toaster />

            <div class="flex w-full gap-1 overflow-y-hidden bg-primaryLight">
                  <!-- Main Content -->
                  <div
                        class="w-full p-6 mb-16 overflow-y-auto bg-transparent scrollbar-thin scrollbar-thumb-primaryDark scrollbar-track-primaryLight">
                        <!-- Header -->
                        <div class="mb-6">
                              <h1 class="text-4xl font-bold text-gray-800">Dashboard</h1>
                              <p class="text-gray-600 text-xl font-bold">
                                    Manage patient test results and uploads
                              </p>
                        </div>

                        <!-- Upload Section -->
                        <div class="p-6 rounded-xl">
                              <div class="flex items-center justify-center mb-4">
                                    <button @click="showUploadModal = true"
                                          class="px-6 py-5 text-xl font-bold text-white bg-primaryDark rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-150">
                                          + Upload New Result
                                    </button>
                              </div>
                        </div>

                        <!-- Stats Cards -->
                        <div class="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
                              <div v-for="stat in stats" :key="stat.name"
                                    class="p-6 bg-white shadow-md rounded-xl group hover:shadow-lg transition-all duration-150">
                                    <div class="flex items-center justify-between">
                                          <div>
                                                <p class="text-lg capitalize font-bold text-gray-600">
                                                      {{ stat.name }}
                                                </p>
                                                <p class="mt-2 text-3xl font-bold text-blue-600">
                                                      {{ stat.count }}
                                                </p>
                                          </div>
                                          <div class="p-3 bg-blue-100 rounded-full">
                                                <span class="text-2xl">{{ stat.icon }}</span>
                                          </div>
                                    </div>
                              </div>
                        </div>

                        <!-- Results List Section -->
                        <div class="p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-xl">
                              <div class="mb-4 sm:mb-6">
                                    <h2 class="mb-3 sm:mb-4 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                                          Patient Results
                                    </h2>

                                    <!-- Filters and Search -->
                                    <div class="flex flex-col gap-3 sm:gap-4 mb-4">
                                          <!-- Filter Buttons -->
                                          <div class="flex flex-wrap gap-2 sm:gap-3">
                                                <button v-for="selection in selectionFilter" :key="selection"
                                                      @click="applyFilters(selection)" :class="selectedFilter === selection
                                                            ? 'bg-primaryDark text-white'
                                                            : 'bg-gray-200 text-gray-700'
                                                            "
                                                      class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-medium rounded-lg transition-all hover:shadow-md">
                                                      {{
                                                      selection.charAt(0).toUpperCase() +
                                                      selection.slice(1)
                                                      }}
                                                </button>
                                          </div>

                                          <!-- Search Input -->
                                          <div class="flex gap-2 sm:gap-3 justify-between items-center w-full">
                                                <div class="relative flex-1 sm:flex-initial sm:max-w-md lg:max-w-xl">
                                                      <input v-model="searchQuery" type="text"
                                                            placeholder="Search patient or result type..."
                                                            @keydown="handleSearchKeydown"
                                                            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 text-sm sm:text-base border border-gray-300 rounded-lg placeholder:text-gray-400 placeholder:text-sm sm:placeholder:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                                                      <span
                                                            class="absolute text-base sm:text-lg text-gray-400 transform -translate-y-1/2 left-3 top-1/2">
                                                            🔍
                                                      </span>
                                                </div>

                                                <div class="flex gap-2 items-center">
                                                      <button @click="applyFilters()"
                                                            class="px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg whitespace-nowrap">
                                                            Search
                                                      </button>
                                                      <button @click="clearFilters"
                                                            class="px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all bg-gray-600 rounded-lg hover:bg-gray-700 hover:shadow-lg whitespace-nowrap">
                                                            Clear
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              <!-- Results Summary -->
                              <div class="mb-4 text-sm text-gray-600">
                                    <p>
                                          Showing {{ results.from || 0 }} to
                                          {{ results.to || 0 }} of {{ results.total }} results
                                    </p>
                              </div>

                              <!-- Results Table -->
                              <div class="overflow-x-auto -mx-4 sm:mx-0 rounded-lg">
                                    <div class="inline-block min-w-full align-middle">
                                          <div class="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                <table class="min-w-full divide-y divide-gray-200">
                                                      <thead class="bg-gray-50">
                                                            <tr>
                                                                  <th
                                                                        class="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                        Patient
                                                                  </th>
                                                                  <th
                                                                        class="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                        Result Type
                                                                  </th>
                                                                  <th
                                                                        class="hidden lg:table-cell px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                        File
                                                                  </th>
                                                                  <th
                                                                        class="hidden xl:table-cell px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                        Upload Date
                                                                  </th>
                                                                  <th
                                                                        class="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                        Status
                                                                  </th>
                                                                  <th
                                                                        class="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                        Actions
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      <tbody class="bg-white divide-y divide-gray-200">
                                                            <tr v-for="result in results.data" :key="result.id"
                                                                  class="transition-colors hover:bg-gray-50">
                                                                  <!-- Patient Name -->
                                                                  <td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                                                                        <div
                                                                              class="text-xs sm:text-sm lg:text-base font-medium text-gray-900">
                                                                              {{
                                                                              result.patient.full_name
                                                                              }}
                                                                        </div>
                                                                        <!-- Show result type on mobile -->
                                                                        <div
                                                                              class="md:hidden text-xs text-gray-500 mt-1">
                                                                              {{ result.result_type }}
                                                                        </div>
                                                                  </td>

                                                                  <!-- Result Type (hidden on mobile) -->
                                                                  <td
                                                                        class="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base text-gray-700">
                                                                        {{ result.result_type }}
                                                                  </td>

                                                                  <!-- File (hidden on mobile & tablet) -->
                                                                  <td
                                                                        class="hidden lg:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                                                                        <div v-if="
                                                                              result.files &&
                                                                              result.files.length > 0
                                                                        " class="space-y-1">
                                                                              <span v-for="file of result.files"
                                                                                    :key="file.id"
                                                                                    class="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                                                                                    <span>{{
                                                                                          getFileIcon(
                                                                                          result.file_type
                                                                                          )
                                                                                          }}</span>
                                                                                    <span
                                                                                          class="truncate max-w-[150px] xl:max-w-[200px]">
                                                                                          {{
                                                                                          file.original_file_name
                                                                                          }}
                                                                                    </span>
                                                                              </span>
                                                                        </div>
                                                                  </td>

                                                                  <!-- Upload Date (hidden on mobile, tablet, and desktop) -->
                                                                  <td
                                                                        class="hidden xl:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">
                                                                        {{
                                                                        formatDate(
                                                                        result.uploaded_at
                                                                        )
                                                                        }}
                                                                  </td>

                                                                  <!-- Status -->
                                                                  <td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                                                                        <span :class="{
                                                                              'bg-orange-100 text-orange-800':
                                                                                    result.status ===
                                                                                    'pending',
                                                                              'bg-green-100 text-green-800':
                                                                                    result.status ===
                                                                                    'uploaded',
                                                                              'bg-red-100 text-red-800':
                                                                                    result.status ===
                                                                                    'failed',
                                                                        }"
                                                                              class="inline-flex px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold rounded-full whitespace-nowrap capitalize">
                                                                              {{ result.status }}
                                                                        </span>
                                                                  </td>

                                                                  <!-- Actions -->
                                                                  <td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                                                                        <div
                                                                              class="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                                                              <button @click="
                                                                                    viewPreview(result)
                                                                                    "
                                                                                    class="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-blue-700 transition-all bg-blue-100 rounded hover:bg-blue-200 hover:shadow-sm whitespace-nowrap">
                                                                                    View
                                                                              </button>
                                                                        </div>
                                                                  </td>
                                                            </tr>

                                                            <!-- No Results -->
                                                            <tr v-if="results.data.length === 0">
                                                                  <td colspan="6"
                                                                        class="px-4 py-8 sm:py-12 text-center sm:text-base lg:text-lg text-gray-600">
                                                                        No results found
                                                                  </td>
                                                            </tr>
                                                      </tbody>
                                                </table>
                                          </div>

                                          <!-- Pagination -->
                                          <div v-if="results.last_page > 1"
                                                class="mt-6 flex items-center justify-between px-4">
                                                <button @click="goToPage(results.prev_page_url)"
                                                      :disabled="!results.prev_page_url"
                                                      class="rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed">
                                                      Previous
                                                </button>

                                                <span class="text-sm text-gray-600">
                                                      Page {{ results.current_page }} of
                                                      {{ results.last_page }}
                                                </span>

                                                <button @click="goToPage(results.next_page_url)"
                                                      :disabled="!results.next_page_url"
                                                      class="rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed">
                                                      Next
                                                </button>
                                          </div>
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

                                          <!-- Patient Phone No-->
                                          <div>
                                                <label
                                                      class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700">
                                                      Patient Phone Number
                                                </label>
                                                <input v-model="uploadForm.patient_phone_no" type="tel" required
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                      placeholder="Enter patient email" autocomplete="phone number" />
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
                                                      <option v-for="type in resultTypes" :key="type" :value="type">
                                                            {{ type }}
                                                      </option>
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
                                          <div class="flex flex-col items-center justify-center w-full">
                                                <label @dragenter.prevent="dragActive = true"
                                                      @dragleave.prevent="dragActive = false" @dragover.prevent
                                                      @drop.prevent="handleDrop"
                                                      class="flex flex-col items-center justify-center w-full h-48 sm:h-56 lg:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-primaryLight/30 transition-colors group">
                                                      <div class="flex flex-col items-center justify-center px-4">
                                                            <svg class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-3 sm:mb-4 text-gray-500 group-hover:text-gray-600 transition-colors"
                                                                  aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                                  fill="none" viewBox="0 0 20 16">
                                                                  <path stroke="currentColor" stroke-linecap="round"
                                                                        stroke-linejoin="round" stroke-width="2"
                                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                            <p v-if="!dragActive"
                                                                  class="mb-2 text-sm sm:text-base lg:text-lg text-gray-500 text-center">
                                                                  <span class="font-semibold">Click to upload</span>
                                                                  or drag and drop
                                                            </p>
                                                            <p v-if="dragActive"
                                                                  class="mb-2 text-sm sm:text-base lg:text-lg text-gray-500 text-center">
                                                                  <span class="font-semibold">Click to upload</span>
                                                                  or drag and drop
                                                            </p>
                                                            <p class="text-xs sm:text-sm text-gray-500 text-center">
                                                                  PDF, PNG, JPG (MAX. 10MB per file)
                                                            </p>
                                                      </div>
                                                      <input id="dropzone-file" type="file"
                                                            :disabled="uploadForm.file.length > 0"
                                                            accept=".pdf,.png,.jpg,.jpeg" @change="handleFileChange"
                                                            class="hidden" />
                                                </label>

                                                <div class="flex items-center justify-between w-full"
                                                      v-if="checking || noErrors">

                                                      <div class="py-3 w-1/2 flex items-center justify-start gap-2 ">

                                                            <button v-if="checking"
                                                                  class="flex items-center gap-1 bg-primaryDark text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-primaryDark/90  disabled:cursor-not-allowed"
                                                                  disabled size="md">
                                                                  <Spinner />
                                                                  Checking for errors...
                                                            </button>

                                                            <button v-if="noErrors"
                                                                  class="flex items-center gap-1 bg-green-500 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-green-500/90  disabled:cursor-not-allowed"
                                                                  disabled size="md">
                                                                  <CheckCircle size="20" />
                                                                  No Errors Found
                                                            </button>
                                                      </div>

                                                      <div class="flex w-1/2 py-3 justify-end items-center">
                                                            <div @click="summarize" v-if="noErrors"
                                                                  class=" flex items-center gap-2 bg-green-500 text-white px-4 py-2 cursor-pointer  text-sm font-semibold rounded-lg hover:bg-green-500/90  disabled:cursor-not-allowed ">
                                                                  <Spinner v-show="summarizing" />
                                                                  {{ summarizing ? 'Summarizing' : 'Summarize Result' }}
                                                            </div>
                                                      </div>

                                                </div>

                                                <div class="w-full flex justify-between my-3  items-center"
                                                      v-if="foundError">
                                                      <button
                                                            class="flex items-center gap-1 bg-red-500 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-red-500/90  disabled:cursor-not-allowed"
                                                            disabled size="md">
                                                            <CheckCircle size="20" />
                                                            Errors Found. Please check the results.
                                                      </button>

                                                      <button @click="handleFileChange"
                                                            class="flex items-center gap-1 bg-primaryDark text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-red-500/90  disabled:cursor-not-allowed"
                                                            size="md">
                                                            <Refresh size="20" />
                                                            Retry
                                                      </button>
                                                </div>

                                                <div class="w-full flex justify-end my-3  items-center"
                                                      v-if="connectionError">
                                                      <button @click="handleFileChange"
                                                            class="flex items-center gap-1 bg-red-500 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-red-500/90  disabled:cursor-not-allowed"
                                                            size="md">
                                                            <Refresh size="20" />
                                                            Retry
                                                      </button>
                                                </div>

                                                <div class="w-full flex gap-5 my-3  items-center" v-if="errorTrace">
                                                      <button v-if="!errorTrace.name"
                                                            class="flex justify-between items-center gap-1 bg-red-500 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-red-500/90  disabled:cursor-not-allowed"
                                                            disabled size="md">
                                                            <CloseCircle size="20" />
                                                            Name
                                                      </button>

                                                      <button v-if="!errorTrace.result_type"
                                                            class="flex justify-between items-center gap-1 bg-red-500 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-red-500/90  disabled:cursor-not-allowed"
                                                            disabled size="md">
                                                            <CloseCircle size="20" />
                                                            Result Type
                                                      </button>

                                                      <button v-if="!errorTrace.test_name"
                                                            class="flex justify-between items-center gap-1 bg-red-500 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-red-500/90  disabled:cursor-not-allowed"
                                                            disabled size="md">
                                                            <CloseCircle size="20" />
                                                            Test Name
                                                      </button>


                                                </div>
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

                                          <!-- Summary -->
                                          <div v-show="summary">
                                                <textarea v-model="summary" rows="8"
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                                                 </textarea>
                                          </div>


                                          <!-- Selections -->
                                          <div class="lg:flex space-y-2 items-center justify-between gap-2 sm:gap-3">

                                                <Label class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primaryDark has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-primaryDark dark:has-[[aria-checked=true]]:bg-primaryDark"
                                                      for="whatsappToogle">
                                                      <Checkbox id="whatsappToogle" v-model="uploadForm.sendViaWhatsapp"
                                                            :default-value="uploadForm.sendViaWhatsapp"
                                                            class="data-[state=checked]:border-primaryDark data-[state=checked]:bg-primaryDark border-primaryDark data-[state=checked]:text-white dark:data-[state=checked]:border-primaryDark dark:data-[state=checked]:bg-primaryDark" />
                                                      <div class="grid gap-1.5 font-normal">
                                                            <p
                                                                  class="text-md text-gray-600 leading-none font-extrabold">
                                                                  Send via Whatsapp
                                                            </p>
                                                            <p class="text-muted-foreground font-bold text-md">
                                                                  Select this option if you want to send the result
                                                                  through Whatsapp
                                                            </p>
                                                      </div>
                                                </Label>

                                                <Label class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primaryDark has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-primaryDark dark:has-[[aria-checked=true]]:bg-primaryDark"
                                                      for="emailToogle">
                                                      <Checkbox id="emailToogle" v-model="uploadForm.sendViaEmail"
                                                            :default-value="uploadForm.sendViaEmail"
                                                            class="data-[state=checked]:border-primaryDark data-[state=checked]:bg-primaryDark border-primaryDark data-[state=checked]:text-white dark:data-[state=checked]:border-primaryDark dark:data-[state=checked]:bg-primaryDark" />
                                                      <div class="grid gap-1.5 font-normal">
                                                            <p
                                                                  class="text-md text-gray-600 leading-none font-extrabold">
                                                                  Upload and send result immediately
                                                            </p>
                                                            <p class="text-muted-foreground font-bold text-md">
                                                                  Select this option if you want to send the result
                                                                  immediately after uploading
                                                            </p>
                                                      </div>
                                                </Label>





                                          </div>

                                          <!-- Scheduler -->
                                          <transition enter-active-class="transition-all duration-700 ease-out"
                                                enter-from-class="opacity-0 max-h-0 scale-y-95"
                                                enter-to-class="opacity-100 max-h-[500px] scale-y-100"
                                                leave-active-class="transition-all duration-500 ease-in"
                                                leave-from-class="opacity-100 max-h-[500px] scale-y-100"
                                                leave-to-class="opacity-0 max-h-0 scale-y-95">

                                                <div v-if="!uploadForm.sendViaEmail"
                                                      class="space-y-2 origin-top overflow-hidden">

                                                      <div>
                                                            <label
                                                                  class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700">
                                                                  Schedule Date
                                                            </label>
                                                            <input v-model="uploadForm.scheduleDate" type="date"
                                                                  :required="!uploadForm.sendViaEmail" class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg
                    transition-all duration-300 ease-in-out hover:border-blue-400 hover:shadow-md" />
                                                      </div>

                                                      <div>
                                                            <label
                                                                  class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700">
                                                                  Schedule Time
                                                            </label>
                                                            <input v-model="uploadForm.scheduleTime" type="time"
                                                                  :required="!uploadForm.sendViaEmail" class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg
                    transition-all duration-300 ease-in-out hover:border-blue-400 hover:shadow-md" />
                                                      </div>
                                                </div>
                                          </transition>



                                          <!-- Actions Section -->
                                          <div class="flex flex-col sm:flex-row sm:justify-end gap-4 pt-2 sm:pt-4">

                                                <!-- Buttons -->
                                                <div class="flex gap-2 sm:gap-3 w-full sm:w-auto">
                                                      <button type="submit"
                                                            :disabled="(!uploadForm.sendViaEmail && (!uploadForm.scheduleDate || !uploadForm.scheduleTime)) || uploadedFiles.length === 0 || uploadForm.processing || foundError || checking"
                                                            class="flex-1 sm:flex-none sm:min-w-[100px] hover:-translate-y-1 duration-150 px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:transform-none">
                                                            {{ uploadForm.processing ? 'Uploading...' : 'Upload' }}
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

                        <!-- Preview Modal -->
                        <div v-if="previewFile"
                              class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                              @click.self="previewFile = null">
                              <div class="w-full max-w-4xl p-6 bg-white rounded-xl max-h-[90vh] overflow-y-auto">
                                    <div class="flex items-center justify-between mb-4">
                                          <h3 class="text-2xl font-bold text-gray-800">
                                                {{ previewFile.patient.full_name || 'Patient' }}
                                                - {{ previewFile.result_type }}
                                          </h3>
                                          <button @click="previewFile = null"
                                                class="px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300">
                                                Close
                                          </button>
                                    </div>

                                    <div class="p-4 mb-4 bg-gray-50 rounded-lg space-y-2">
                                          <p class="text-sm text-gray-600">
                                                <strong>Patient:</strong>
                                                {{ previewFile.patient.full_name }} ({{
                                                previewFile.patient.email
                                                }})
                                          </p>
                                          <p class="text-sm text-gray-600">
                                                <strong>Result Type:</strong>
                                                {{ previewFile.result_type }}
                                          </p>
                                          <p class="text-sm text-gray-600">
                                                <strong>Uploaded:</strong>
                                                {{ formatDate(previewFile.uploaded_at) }}
                                          </p>
                                          <p class="text-sm text-gray-600">
                                                <strong>Status:</strong>
                                                <span :class="{
                                                      'text-orange-700':
                                                            previewFile.status === 'pending',
                                                      'text-green-700':
                                                            previewFile.status === 'uploaded',
                                                      'text-red-700':
                                                            previewFile.status === 'failed',
                                                }" class="font-semibold capitalize">
                                                      {{ previewFile.status }}
                                                </span>
                                          </p>
                                    </div>

                                    <!-- Files Section -->
                                    <div v-if="
                                          previewFile.files &&
                                          previewFile.files.length > 0
                                    " class="space-y-4">
                                          <h4 class="text-lg font-semibold text-gray-800">
                                                Attached Files ({{ previewFile.files.length }})
                                          </h4>
                                          <div v-for="file in previewFile.files" :key="file.id"
                                                class="flex items-center justify-center p-8 bg-gray-100 rounded-lg">
                                                <div v-if="
                                                      file.file_type === 'image/png' ||
                                                      file.file_type === 'image/jpg' ||
                                                      file.file_type === 'image/jpeg'
                                                " class="text-center w-full">
                                                      <img :src="file.file_url" :alt="file.original_file_name"
                                                            class="max-w-full max-h-96 mx-auto rounded-lg shadow" />
                                                      <p class="mt-2 text-sm text-gray-600">
                                                            {{ file.original_file_name }}
                                                      </p>
                                                      <button @click="downloadResult(file)"
                                                            class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                                            Download Image
                                                      </button>
                                                </div>
                                                <div v-else-if="
                                                      file.file_type === 'application/pdf'
                                                " class="text-center w-full">
                                                      <iframe :src="file.file_url"
                                                            class="w-full h-96 rounded-lg"></iframe>
                                                      <p class="mt-2 text-sm text-gray-600">
                                                            {{ file.original_file_name }}
                                                      </p>
                                                      <button @click="downloadResult(file)"
                                                            class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                                            Download PDF
                                                      </button>
                                                </div>
                                                <div v-else class="text-center">
                                                      <span class="text-6xl">📄</span>
                                                      <p class="mt-4 text-gray-600 font-medium">
                                                            {{ file.original_file_name }}
                                                      </p>
                                                      <button @click="downloadResult(file)"
                                                            class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                                            Download File
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      </AuthenticatedLayout>
</template>