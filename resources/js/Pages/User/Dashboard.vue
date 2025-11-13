<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { ref, computed } from 'vue';


const page = usePage();

const onDrop = (file: File[] | null) => {
      console.log(file)
      return;
}



console.log(page.props.auth)

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

const props = defineProps<Props>();


// Upload form
const uploadForm = useForm({
      patient_name: '',
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
            color: "deepblue",
      },
      {
            name: "pending reviews",
            count: 12,
            icon: "⏳",
            color: "deepgreen",
      },
      {
            name: "completed results",
            count: 132,
            icon: "✅",
            color: "deepgreen",
      },
      {
            name: "total patients",
            count: 89,
            icon: "👥",
            color: "deeppurple",
      }
];


// Mock data for demonstration (remove when backend is connected)
let results: PatientResult[] = [
      {
            id: 1,
            patient_name: 'John Doe',
            result_type: 'Blood Test',
            file_name: 'blood_test_results.pdf',
            file_path: '/storage/results/blood_test_results.pdf',
            file_type: 'pdf',
            upload_date: '2025-11-05T10:30:00',
            status: 'completed'
      },
      {
            id: 2,
            patient_name: 'Jane Smith',
            result_type: 'X-Ray',
            file_name: 'xray_scan.jpg',
            file_path: '/storage/results/xray_scan.jpg',
            file_type: 'image',
            upload_date: '2025-11-04T14:15:00',
            status: 'reviewed'
      },
      {
            id: 3,
            patient_name: 'Mike Johnson',
            result_type: 'Lab Analysis',
            file_name: 'lab_data.csv',
            file_path: '/storage/results/lab_data.csv',
            file_type: 'csv',
            upload_date: '2025-11-03T09:00:00',
            status: 'pending'
      }
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

                        <!-- Upload Section -->
                        <div class="p-6 mb-6 bg-white shadow-md rounded-xl">
                              <div class="flex items-center justify-between mb-4">
                                    <h2 class="text-2xl font-bold text-gray-800 ">Upload Patient Results</h2>
                                    <button @click="showUploadModal = true"
                                          class="px-6 py-3 text-xl font-bold text-white bg-deepgradient rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-150">
                                          + Upload New Result
                                    </button>
                              </div>
                              <p class="text-md font-bold text-gray-600">Supported formats: PDF, Images (JPG, PNG), CSV,
                                    XLSX, XLS, DOC, DOCX
                                    files</p>
                        </div>

                        <!-- Results List Section -->
                        <div class="p-6 bg-white shadow-md rounded-xl">
                              <div class="mb-6">
                                    <h2 class="mb-4 text-2xl font-bold text-gray-800">Patient Results</h2>

                                    <!-- Filters and Search -->
                                    <div
                                          class="flex flex-col gap-4 mb-4 md:flex-row md:items-center text-xl font-extrabold md:justify-between">
                                          <div class="flex gap-2">
                                                <button @click="filteredResults('all')"
                                                      :class="selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
                                                      class="px-4 py-2 font-medium rounded-lg transition-colors">
                                                      All
                                                </button>
                                                <button @click="filteredResults('pending')"
                                                      :class="selectedFilter === 'pending' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'"
                                                      class="px-4 py-2 font-medium rounded-lg transition-colors">
                                                      Pending
                                                </button>
                                                <button @click="filteredResults('completed')"
                                                      :class="selectedFilter === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'"
                                                      class="px-4 py-2 font-medium rounded-lg transition-colors">
                                                      Completed
                                                </button>
                                                <button @click="filteredResults('reviewed')"
                                                      :class="selectedFilter === 'reviewed' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'"
                                                      class="px-4 py-2 font-medium rounded-lg transition-colors">
                                                      Reviewed
                                                </button>
                                          </div>

                                          <div class="relative">
                                                <input v-model="searchQuery" type="text"
                                                      placeholder="Search patient or result type..."
                                                      class="w-full px-4 py-2 pl-10 border placeholder:font-extrabold placeholder:text-md border-gray-300 rounded-lg md:w-80 focus:ring-2 focus:ring-blue-500 focus:border-transparent"></input>
                                                <span
                                                      class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2">🔍</span>
                                          </div>
                                    </div>
                              </div>

                              <!-- Results Table -->
                              <div class="overflow-x-auto">
                                    <table class="w-full">
                                          <thead class="bg-gray-50 ">
                                                <tr>
                                                      <th
                                                            class="px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase">
                                                            Patient</th>
                                                      <th
                                                            class="px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase">
                                                            Result Type</th>
                                                      <th
                                                            class="px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase">
                                                            File</th>
                                                      <th
                                                            class="px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase">
                                                            Upload Date</th>
                                                      <th
                                                            class="px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase">
                                                            Status</th>
                                                      <th
                                                            class="px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase">
                                                            Actions</th>
                                                </tr>
                                          </thead>
                                          <tbody class="bg-white divide-y divide-gray-200 text-lg font-extrabold">
                                                <tr v-for="result in filtered" :key="result.id"
                                                      class="transition-colors hover:bg-gray-50">
                                                      <td class="px-4 py-4 text-sm font-medium text-gray-900">{{
                                                            result.patient_name
}}
                                                      </td>
                                                      <td class="px-4 py-4 text-sm text-gray-700">{{ result.result_type
                                                      }}</td>
                                                      <td class="px-4 py-4 text-sm text-gray-700">
                                                            <span class="flex items-center gap-2">
                                                                  <span>{{ getFileIcon(result.file_type) }}</span>
                                                                  <span class="truncate max-w-[200px]">{{
                                                                        result.file_name }}</span>
                                                            </span>
                                                      </td>
                                                      <td class="px-4 py-4 text-sm text-gray-700">{{
                                                            formatDate(result.upload_date) }}
                                                      </td>
                                                      <td class="px-4 py-4 text-sm">
                                                            <span :class="{
                                                                  'bg-orange-100 text-orange-800': result.status === 'pending',
                                                                  'bg-green-100 text-green-800': result.status === 'completed',
                                                                  'bg-purple-100 text-purple-800': result.status === 'reviewed'
                                                            }" class="px-3 py-1 text-xs font-semibold rounded-full">
                                                                  {{ result.status.charAt(0).toUpperCase() +
                                                                        result.status.slice(1) }}
                                                            </span>
                                                      </td>
                                                      <td class="px-4 py-4 text-sm">
                                                            <div class="flex gap-2">
                                                                  <button @click="viewPreview(result)"
                                                                        class="px-3 py-1 text-xs font-medium text-blue-700 transition-colors bg-blue-100 rounded hover:bg-blue-200">
                                                                        View
                                                                  </button>
                                                                  <button @click="downloadResult(result)"
                                                                        class="px-3 py-1 text-xs font-medium text-green-700 transition-colors bg-green-100 rounded hover:bg-green-200">
                                                                        Download
                                                                  </button>
                                                            </div>
                                                      </td>
                                                </tr>
                                                <tr v-if="filteredResults.length === 0">
                                                      <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                                                            No results found
                                                      </td>
                                                </tr>
                                          </tbody>
                                    </table>
                              </div>
                        </div>

                        <!-- Upload Modal -->
                        <div v-if="showUploadModal"
                              class="fixed inset-0 z-50 flex items-center justify-center bg-black py-10 bg-opacity-50">
                              <div class="w-1/2 p-10 2xl:p-20 bg-white rounded-xl">
                                    <h3 class="mb-4 text-2xl font-bold text-gray-800">Upload Patient Result</h3>

                                    <form @submit.prevent="submitUpload" class="space-y-4 ">
                                          <div>
                                                <label class="block mb-2 text-sm font-medium text-gray-700">Patient
                                                      Name</label>
                                                <input v-model="uploadForm.patient_name" type="text" required
                                                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                      placeholder="Enter patient name">
                                          </div>
                                          <div>
                                                <label class="block mb-2 text-sm font-medium text-gray-700">Patient
                                                      Email</label>
                                                <input v-model="uploadForm.patient_name" type="text" required
                                                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                      placeholder="Enter patient name">
                                          </div>

                                          <div>
                                                <label class="block mb-2 text-sm font-medium text-gray-700">Result
                                                      Type</label>
                                                <select v-model="uploadForm.result_type" required
                                                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                      <option class="font-chillax-bold" value="">Select result type
                                                      </option>
                                                      <option value="Blood Test">Blood Test</option>
                                                      <option value="X-Ray">X-Ray</option>
                                                      <option value="MRI">MRI</option>
                                                      <option value="CT Scan">CT Scan</option>
                                                      <option value="Lab Analysis">Lab Analysis</option>
                                                      <option value="Other">Other</option>
                                                </select>
                                          </div>


                                          <div @dragenter="handleFileChange" @drop="console.log('drop')"
                                                class="flex items-center justify-center w-full">
                                                <label for="dropzone-file"
                                                      class="flex flex-col items-center justify-center w-full group h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-deepblue/30 ">
                                                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                                  aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                                  fill="none" viewBox="0 0 20 16">
                                                                  <path stroke="currentColor" stroke-linecap="round"
                                                                        stroke-linejoin="round" stroke-width="2"
                                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                            <p class="mb-2 text-lg text-gray-500 dark:text-gray-400">
                                                                  <span class="font-bold">Click to upload</span> or
                                                                  drag and drop
                                                            </p>
                                                            <p class="text-md text-gray-500 dark:text-gray-400">SVG,
                                                                  PNG, JPG or GIF (MAX. 800x400px)</p>
                                                      </div>
                                                      <input id="dropzone-file" type="file" class="hidden" />
                                                </label>
                                          </div>


                                          <div class=" flex justify-between">
                                                <div class="flex items-center gap-3 w-1/2 pt-4">
                                                      <input type="checkbox"
                                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                      <span>Click to upload and send result</span>
                                                </div>
                                                <div class="flex gap-3 w-1/2 pt-4">
                                                      <button type="submit" :disabled="uploadForm.processing"
                                                            class="flex-1 hover:-translate-y-1  duration-150 px-4 py-2 font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
                                                            {{ uploadForm.processing ? 'Uploading...' :
                                                                  'Upload' }}
                                                      </button>
                                                      <button type="button" @click="showUploadModal = false"
                                                            class="flex-1 px-4 py-2 font-semibold text-gray-700 transition-all hover:-translate-y-1  duration-150 bg-gray-200 rounded-lg hover:bg-gray-300">
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