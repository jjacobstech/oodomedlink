<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { ref, computed } from 'vue';


const page = usePage();

const onDrop = (file: File[] | null) => {
      console.log(file)
      return;
}



console.log(page.props)

// Define props for patient results data from backend
interface PatientResult {
      id: number;
      patient_name: string;
      result_type: string;
      file_name: string;
      file_path: string;
      file_type: 'pdf' | 'image' | 'csv';
      upload_date: string;
      status: 'pending' | 'completed' | 'reviewed';
}

interface Props {
      results?: PatientResult[];
      stats?: {
            name: string,
            count: number,
            icon: string,
            color: string,
      };
}

const props = defineProps<Props>(

);

console.log(props)


// Upload form
const uploadForm = useForm({
      patient_name: '',
      patient_email: '',
      result_type: '',
      file: null as File | null,
});

const showUploadModal = ref(false);
const selectedFilter = ref('all');
const searchQuery = ref('');
const previewFile = ref<PatientResult | null>(null);

const mockStats = [
      {
            name: "total uploads",
            count: 156,
            icon: "📤",
            color: "primaryLight",
      },
      {
            name: "pending reviews",
            count: 12,
            icon: "⏳",
            color: "primaryDark",
      },
      {
            name: "completed results",
            count: 132,
            icon: "✅",
            color: "primaryDark",
      },
      {
            name: "total patients",
            count: 89,
            icon: "👥",
            color: "primaryDark",
      }
];


// Mock data for demonstration (remove when backend is connected)
let results: PatientResult[] = [

];

let filtered: PatientResult[] = results

// File input handling
const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
            uploadForm.file = target.files[0];
      }
};

// Submit upload
const submitUpload = () => {
      uploadForm.post('/clinic/results/upload', {
            onSuccess: () => {
                  uploadForm.reset();
                  showUploadModal.value = false;
            },
      });
};

// Filter and search results
const filteredResults = (filter: string) => {
      selectedFilter.value = filter;

      if (selectedFilter.value !== 'all') {
            filtered = results.filter(p => p.status === selectedFilter.value);
      }

      if (selectedFilter.value === 'all') {
            filtered = results
      }

      if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase();
            filtered = results.filter(p =>
                  p.patient_name.toLowerCase().includes(query) ||
                  p.result_type.toLowerCase().includes(query) ||
                  p.file_name.toLowerCase().includes(query)
            );
      };
}

// Download result
const downloadResult = (result: PatientResult) => {
      window.open(result.file_path, '_blank');
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
            minute: '2-digit'
      });
};

// Get file type icon
const getFileIcon = (fileType: string) => {
      switch (fileType) {
            case 'pdf': return '📄';
            case 'image': return '🖼️';
            case 'csv': return '📊';
            default: return '📁';
      }
};

const loadFile = (event: Event) => {
      console.log(event)
}



</script>

<template>

      <Head title="Clinic Dashboard" />

      <AuthenticatedLayout>

            <div class=" flex w-full h-full gap-1 overflow-hidden bg-white">
                  <!-- Main Content -->
                  <div
                        class="w-full p-6 mb-16 overflow-y-scroll bg-white scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">

                        <!-- Header -->
                        <div class="mb-6">
                              <h1 class="text-4xl font-bold text-gray-800">Dashboard</h1>
                              <p class="text-gray-600 text-xl font-bold">Manage patient test results and uploads</p>
                        </div>

                        <!-- Upload Section -->
                        <div class="p-6  rounded-xl">
                              <div class="flex items-center justify-center mb-4">
                                    <button @click="showUploadModal = true"
                                          class="px-6 py-5 text-xl font-bold text-white bg-primaryDark rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-150">
                                          + Upload New Result
                                    </button>
                              </div>

                        </div>

                        <!-- Stats Cards -->
                        <div class="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4 ">
                              <div v-for="stat in mockStats" :key="stat.name"
                                    class="p-6 bg-white shadow-md rounded-xl group hover:shadow-lg transition-all duration-150">
                                    <div class="flex items-center justify-between">
                                          <div>
                                                <p class="text-lg capitalize font-bold text-gray-600">{{ stat.name }}
                                                </p>
                                                <p class="mt-2 text-3xl font-bold text-blue-600">{{ stat.count }}</p>
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
                                                <button @click="filteredResults('all')"
                                                      :class="selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
                                                      class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-medium rounded-lg transition-all hover:shadow-md">
                                                      All
                                                </button>
                                                <button @click="filteredResults('pending')"
                                                      :class="selectedFilter === 'pending' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'"
                                                      class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-medium rounded-lg transition-all hover:shadow-md">
                                                      Pending
                                                </button>
                                                <button @click="filteredResults('completed')"
                                                      :class="selectedFilter === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'"
                                                      class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-medium rounded-lg transition-all hover:shadow-md">
                                                      Completed
                                                </button>
                                                <button @click="filteredResults('reviewed')"
                                                      :class="selectedFilter === 'reviewed' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'"
                                                      class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-medium rounded-lg transition-all hover:shadow-md">
                                                      Reviewed
                                                </button>
                                          </div>

                                          <!-- Search Input -->
                                          <div class="relative w-full sm:w-auto sm:max-w-md lg:max-w-lg">
                                                <input v-model="searchQuery" type="text"
                                                      placeholder="Search patient or result type..."
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 text-sm sm:text-base border border-gray-300 rounded-lg placeholder:text-gray-400 placeholder:text-sm sm:placeholder:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                                                <span
                                                      class="absolute text-base sm:text-lg text-gray-400 transform -translate-y-1/2 left-3 top-1/2">
                                                      🔍
                                                </span>
                                          </div>
                                    </div>
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
                                                            <tr v-for="result in filtered" :key="result.id"
                                                                  class="transition-colors hover:bg-gray-50">
                                                                  <!-- Patient Name -->
                                                                  <td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                                                                        <div
                                                                              class="text-xs sm:text-sm lg:text-base font-medium text-gray-900">
                                                                              {{ result.patient_name }}
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
                                                                        <span
                                                                              class="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                                                                              <span>{{ getFileIcon(result.file_type)
                                                                                    }}</span>
                                                                              <span
                                                                                    class="truncate max-w-[150px] xl:max-w-[200px]">
                                                                                    {{ result.file_name }}
                                                                              </span>
                                                                        </span>
                                                                  </td>

                                                                  <!-- Upload Date (hidden on mobile, tablet, and desktop) -->
                                                                  <td
                                                                        class="hidden xl:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">
                                                                        {{ formatDate(result.upload_date) }}
                                                                  </td>

                                                                  <!-- Status -->
                                                                  <td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                                                                        <span :class="{
                                                                              'bg-orange-100 text-orange-800': result.status === 'pending',
                                                                              'bg-green-100 text-green-800': result.status === 'completed',
                                                                              'bg-purple-100 text-purple-800': result.status === 'reviewed'
                                                                        }"
                                                                              class="inline-flex px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold rounded-full whitespace-nowrap">
                                                                              {{ result.status.charAt(0).toUpperCase() +
                                                                                    result.status.slice(1) }}
                                                                        </span>
                                                                  </td>

                                                                  <!-- Actions -->
                                                                  <td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                                                                        <div
                                                                              class="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                                                              <button @click="viewPreview(result)"
                                                                                    class="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-blue-700 transition-all bg-blue-100 rounded hover:bg-blue-200 hover:shadow-sm whitespace-nowrap">
                                                                                    View
                                                                              </button>
                                                                              <button @click="downloadResult(result)"
                                                                                    class="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-green-700 transition-all bg-green-100 rounded hover:bg-green-200 hover:shadow-sm whitespace-nowrap">
                                                                                    Download
                                                                              </button>
                                                                        </div>
                                                                  </td>
                                                            </tr>

                                                            <!-- No Results -->
                                                            <tr v-if="filtered.length === 0">
                                                                  <td colspan="6"
                                                                        class="px-4 py-8 sm:py-12 text-center text-sm sm:text-base text-gray-500">
                                                                        No results found
                                                                  </td>
                                                            </tr>
                                                      </tbody>
                                                </table>
                                          </div>
                                    </div>
                              </div>
                        </div>

                        <!-- Upload Modal -->
                        <div v-if="showUploadModal"
                              class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6 lg:p-10">
                              <div
                                    class="w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl p-6 sm:p-8 lg:p-10 xl:p-16 bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
                                    <h3 class="mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                                          Upload Patient Result
                                    </h3>

                                    <form @submit.prevent="submitUpload" class="space-y-4 sm:space-y-5 lg:space-y-6">
                                          <!-- Patient Name -->
                                          <div>
                                                <label
                                                      class="block mb-2 text-sm sm:text-base font-medium text-gray-700">
                                                      Patient Name
                                                </label>
                                                <input v-model="uploadForm.patient_name" type="text" required
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                      placeholder="Enter patient name">
                                          </div>

                                          <!-- Patient Email -->
                                          <div>
                                                <label
                                                      class="block mb-2 text-sm sm:text-base font-medium text-gray-700">
                                                      Patient Email
                                                </label>
                                                <input v-model="uploadForm.patient_email" type="email" required
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                      placeholder="Enter patient email">
                                          </div>

                                          <!-- Result Type -->
                                          <div>
                                                <label
                                                      class="block mb-2 text-sm sm:text-base font-medium text-gray-700">
                                                      Result Type
                                                </label>
                                                <select v-model="uploadForm.result_type" required
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                                                      <option value="">Select result type</option>
                                                      <option value="Blood Test">Blood Test</option>
                                                      <option value="X-Ray">X-Ray</option>
                                                      <option value="MRI">MRI</option>
                                                      <option value="CT Scan">CT Scan</option>
                                                      <option value="Lab Analysis">Lab Analysis</option>
                                                      <option value="Other">Other</option>
                                                </select>
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
                                                                  <span class="font-semibold">Click to upload</span> or
                                                                  drag and drop
                                                            </p>
                                                            <p class="text-xs sm:text-sm text-gray-500 text-center">
                                                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                                            </p>
                                                      </div>
                                                      <input id="dropzone-file" type="file"
                                                            @dragenter="handleFileChange" @drop="console.log('drop')"
                                                            @change="loadFile" class="hidden" />
                                                </label>
                                          </div>

                                          <!-- Actions Section -->
                                          <div class="flex flex-col sm:flex-row sm:justify-between gap-4 pt-2 sm:pt-4">
                                                <!-- Checkbox -->
                                                <div class="flex items-center gap-2 sm:gap-3">
                                                      <input type="checkbox"
                                                            class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all flex-shrink-0" />
                                                      <span class="text-xs sm:text-sm lg:text-base text-gray-700">
                                                            Upload and send result immediately
                                                      </span>
                                                </div>

                                                <!-- Buttons -->
                                                <div class="flex gap-2 sm:gap-3 w-full sm:w-auto">
                                                      <button type="submit" :disabled="uploadForm.processing"
                                                            class="flex-1 sm:flex-none sm:min-w-[100px] hover:-translate-y-1 duration-150 px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:transform-none">
                                                            {{ uploadForm.processing ? 'Uploading...' : 'Upload' }}
                                                      </button>
                                                      <button type="button" @click="showUploadModal = false"
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
                              class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                              <div class="w-full max-w-4xl p-6 bg-white rounded-xl max-h-[90vh] overflow-y-auto">
                                    <div class="flex items-center justify-between mb-4">
                                          <h3 class="text-2xl font-bold text-gray-800">{{ previewFile.patient_name }} -
                                                {{
                                                previewFile.result_type }}</h3>
                                          <button @click="previewFile = null"
                                                class="px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300">
                                                Close
                                          </button>
                                    </div>

                                    <div class="p-4 mb-4 bg-gray-50 rounded-lg">
                                          <p class="text-sm text-gray-600">File: {{ previewFile.file_name }}</p>
                                          <p class="text-sm text-gray-600">Uploaded: {{
                                                formatDate(previewFile.upload_date) }}</p>
                                    </div>

                                    <div class="flex items-center justify-center p-8 bg-gray-100 rounded-lg">
                                          <div v-if="previewFile.file_type === 'pdf'" class="text-center">
                                                <span class="text-6xl">📄</span>
                                                <p class="mt-4 text-gray-600">PDF Preview</p>
                                                <button @click="downloadResult(previewFile)"
                                                      class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                                      Open PDF
                                                </button>
                                          </div>
                                          <div v-else-if="previewFile.file_type === 'image'" class="text-center">
                                                <img :src="previewFile.file_path" alt="Result preview"
                                                      class="max-w-full max-h-96">
                                          </div>
                                          <div v-else class="text-center">
                                                <span class="text-6xl">📊</span>
                                                <p class="mt-4 text-gray-600">CSV Data File</p>
                                                <button @click="downloadResult(previewFile)"
                                                      class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                                      Download CSV
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>


                  </div>
            </div>
      </AuthenticatedLayout>
</template>