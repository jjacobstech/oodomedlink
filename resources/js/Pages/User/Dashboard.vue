<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm, router, usePage, Link } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import { Upload, UsersGroupTwoRounded, ClockCircle, CloseCircle } from '@solar-icons/vue';

const page = usePage();
const base_url = page.props.ziggy.base_url;

// Define props for patient results data from backend
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
      status: 'pending' | 'sent' | 'failed';
      files: file[];
}

interface Props {
      user?: any,
      results?: PatientResult[];
      stats?: {
            total_uploads: number,
            total_patients: number,
            pending_results: number,
            completed_result: number
      };
      filter?: string;
      search?: string;
      page?: number;
      prevPage?: string;
      nextPage?: string;

}



const props = defineProps<Props>();
const showUploadModal = ref(false);
const selectedFilter = ref(props.filter);
const searchQuery = ref(props.search);
const previewFile = ref<PatientResult | null>(null);
const stats = [
      {
            name: "total uploads",
            count: props.stats?.total_uploads,
            icon: "📤",
            color: "primaryDark",
      },
      {
            name: "pending results",
            count: props.stats?.pending_results,
            icon: "⏳",
            color: "primaryDark",
      },
      {
            name: "completed results",
            count: props.stats?.completed_result,
            icon: "✅",
            color: "primaryDark",
      },
      {
            name: "total patients",
            count: props.stats?.total_patients,
            icon: "👥",
            color: "primaryDark",
      }
];



let results: PatientResult[] = props.results || [];

let filtered: PatientResult[] = results

const selectionFilter = ['all', 'pending', 'sent', 'failed']
// Upload form
const uploadForm = useForm({
      patient_name: '',
      patient_email: '',
      test_date: '',
      test_name: '',
      result_type: '',
      file: [] as File[],
      notes: '',
      sendViaEmail: true as boolean
});




const uploadedFiles = ref<File[]>([])


// File input handling
const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
            for (let file of target.files) {

                  uploadedFiles.value.push(file)
                  uploadForm?.file?.push(file)
            }


      }
};

const handleFileRemove = (file: File) => {



      console.log(uploadedFiles.value, uploadForm.file)
};

// Submit upload
const submitUpload = () => {
      uploadForm.post(route('clinic.result.upload'), {
            onSuccess: (response) => {
                  uploadForm.reset();
                  uploadedFiles.value = [];
                  showUploadModal.value = false;
                  router.get(route('user.dashboard'));
            },
            onError: (response) => {
            }
      });
};

// Filter and search results
const filteredResults = (filter?: string, search?: string) => {

      selectedFilter.value = filter ?? 'all';

      const payload: Record<string, any> = {
            filter: selectedFilter.value,
            search: searchQuery.value
      }

      if (searchQuery.value === '') delete payload.search;
      if (selectedFilter.value === '') delete payload.filter;


      router.get(route('user.dashboard'), payload,
            {
                  onError: (response) => {
                        console.log(response);
                  },
                  preserveScroll: true,

            }
      );

}

// Filter and search results
const clearFilteredResults = () => {

      const payload: Record<string, any> = {

      }


      router.get(route('user.dashboard'), payload,
            {
                  onError: (response) => {
                        console.log(response);
                  },
                  preserveScroll: true,

            }
      );

}

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

            <div class=" flex w-full  gap-1 overflow-y-hidden bg-primaryLight">
                  <!-- Main Content -->
                  <div
                        class="w-full p-6 mb-16 overflow-y-auto  bg-transparent scrollbar-thin scrollbar-thumb-primaryDark scrollbar-track-primaryLight">

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
                              <div v-for="stat in stats" :key="stat.name"
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
                                                <button v-for="selection in selectionFilter" :key="selection"
                                                      @click="filteredResults(selection)"
                                                      :class="selectedFilter === selection ? 'bg-primaryDark text-white' : 'bg-gray-200 text-gray-700'"
                                                      class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-medium rounded-lg transition-all hover:shadow-md">
                                                      {{ selection.charAt(0).toUpperCase() +
                                                      selection.slice(1) }}
                                                </button>
                                          </div>

                                          <!-- Search Input -->
                                          <div
                                                class="flex gap-10 justify-between items-center  w-full sm:w-auto sm:max-w-md lg:max-w-xl">
                                                <div class="relative lg:w-[80%] sm:w-auto sm:max-w-md ">
                                                      <input v-model="searchQuery" type="text"
                                                            placeholder="Search patient or result type..."
                                                            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 text-sm sm:text-base border border-gray-300 rounded-lg placeholder:text-gray-400 placeholder:text-sm sm:placeholder:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                                                      <span
                                                            class="absolute text-base sm:text-lg text-gray-400 transform -translate-y-1/2 left-3 top-1/2">
                                                            🔍
                                                      </span>
                                                </div>

                                                <div class="flex gap-2 items-center">
                                                      <button @click="filteredResults()"
                                                            class="w-[20%] sm:w-auto sm:max-w-md lg:max-w-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:transform-none">
                                                            Search
                                                      </button>
                                                      <button @click="clearFilteredResults"
                                                            class="w-[20%] sm:w-auto sm:max-w-md lg:max-w-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:transform-none">
                                                            Clear
                                                      </button>
                                                </div>
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
                                                                              {{ result.patient.full_name }}
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
                                                                        <span v-for="file of result.files"
                                                                              :key="file.id" class="flex items-center gap-2 text-xs
                                                                              sm:text-sm text-gray-700">
                                                                              <span>{{ getFileIcon(result.file_type)
                                                                              }}</span>
                                                                              <span
                                                                                    class="truncate max-w-[150px] xl:max-w-[200px]">
                                                                                    {{ file.original_file_name
                                                                                    }}
                                                                              </span>
                                                                        </span>
                                                                  </td>

                                                                  <!-- Upload Date (hidden on mobile, tablet, and desktop) -->
                                                                  <td
                                                                        class="hidden xl:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">
                                                                        {{ formatDate(result.uploaded_at) }}
                                                                  </td>

                                                                  <!-- Status -->
                                                                  <td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                                                                        <span :class="{
                                                                              'bg-orange-100 text-orange-800': result.status === 'pending',
                                                                              'bg-green-100 text-green-800': result.status === 'sent',
                                                                              'bg-purple-100 text-purple-800': result.status === 'failed'
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
                                                                              <!-- <button @click="downloadResult(result)" -->
                                                                              <!-- class="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-green-700 transition-all bg-green-100 rounded hover:bg-green-200 hover:shadow-sm whitespace-nowrap"> -->
                                                                              <!-- Download -->
                                                                              <!-- </button> -->
                                                                        </div>
                                                                  </td>
                                                            </tr>

                                                            <!-- No Results -->
                                                            <tr v-if="filtered.length === 0">
                                                                  <td colspan="6"
                                                                        class="px-4 py-8 sm:py-12 text-center sm:text-base lg:text-lg text-gray-600">
                                                                        No results found
                                                                  </td>
                                                            </tr>
                                                      </tbody>
                                                </table>

                                          </div>
                                          <div
                                                class="w-full py-3 bg-transparent flex items-center  h-full gap-10  justify-end px-5">
                                                <Link v-if="prevPage !== null" :href="prevPage ?? '#'" v-html="'Prev'"
                                                      preserve-scroll
                                                      class="btn bg-primaryDark  rounded-xl hover:text-primaryDark hover:bg-white hover:shadow-primaryDark/30 px-3 text-lg font-bold py-2 shadow-md text-white" />

                                                <Link v-if="nextPage !== null" :href="nextPage" v-html="'Next'"
                                                      preserve-scroll
                                                      class="btn bg-primaryDark rounded-xl hover:text-primaryDark hover:bg-white hover:shadow-primaryDark/30 px-3 text-lg font-bold py-2 shadow-md text-white" />
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
                                                      class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700">
                                                      Patient Name
                                                </label>
                                                <input v-model="uploadForm.patient_name" type="text" required
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                      placeholder="Enter patient name" autofocus autocomplete="name">
                                          </div>

                                          <!-- Patient Email -->
                                          <div>
                                                <label
                                                      class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700">
                                                      Patient Email
                                                </label>
                                                <input v-model="uploadForm.patient_email" type="email" required
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                      placeholder="Enter patient email" autofocus autocomplete="email">
                                          </div>

                                          <!-- Test Name -->
                                          <div>
                                                <label
                                                      class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700">
                                                      Test Name
                                                </label>
                                                <input v-model="uploadForm.test_name" type="text" required
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                      placeholder="Enter patient email" autofocus autocomplete="date">
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
                                                      <option value="Lab Analysis">Lab Analysis</option>
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
                                                      placeholder="Enter patient email" autofocus autocomplete="date">
                                          </div>

                                          <!-- Notes -->
                                          <div>
                                                <label
                                                      class="block mb-2 text-sm font-extrabold sm:text-basetext-gray-700">
                                                      Notes
                                                </label>
                                                <textarea v-model="uploadForm.notes"
                                                      class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                      placeholder="e.g referrals, prescriptions etc ">
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
                                                                  <span class="font-semibold">Click to upload</span> or
                                                                  drag and drop
                                                            </p>
                                                            <p class="text-xs sm:text-sm text-gray-500 text-center">
                                                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                                            </p>
                                                      </div>
                                                      <input id="dropzone-file" type="file" multiple
                                                            @change="handleFileChange"
                                                            @dragenter="console.log('dragenter')"
                                                            @dragleave="console.log('dragleave')"
                                                            @dragover="console.log('dragover')"
                                                            @drop="console.log('drop')" class="hidden" />
                                                </label>
                                          </div>

                                          <div class="space-y-2">

                                                <p v-for="files of uploadedFiles" :key="files.name"
                                                      class="w-full flex justify-between items-center px-3 sm:px-4 py-1 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                      placeholder="e.g referrals, prescriptions etc ">
                                                      <span
                                                            class="truncate max-w-[100px] md:max-w-[300px] xl:max-w-[300px]">
                                                            {{ files.name }}</span>

                                                      <span class="font-extrabold text-lg btn text-primaryDark">
                                                            <CloseCircle weight="Bold" size="24" />
                                                      </span>
                                                </p>
                                          </div>

                                          <!-- Actions Section -->
                                          <div class="flex flex-col sm:flex-row sm:justify-between gap-4 pt-2 sm:pt-4">
                                                <!-- Checkbox -->
                                                <div class="flex items-center gap-2 sm:gap-3">
                                                      <input type="checkbox" v-model="uploadForm.sendViaEmail"
                                                            class="w-4 h-4 sm:w-5 sm:h-5 text-primaryDark bg-gray-100 border-gray-300 rounded focus:ring-primaryDark focus:ring-2 transition-all flex-shrink-0" />
                                                      <span
                                                            class="text-xs font-extrabold  sm:text-sm lg:text-base text-gray-700">
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
                                          <h3 class="text-2xl font-bold text-gray-800">{{ previewFile.patient.full_name
                                                ?? "Patient" }} -
                                                {{
                                                      previewFile.result_type }}</h3>
                                          <button @click="previewFile = null"
                                                class="px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300">
                                                Close
                                          </button>
                                    </div>

                                    <div class="p-4 mb-4 bg-gray-50 rounded-lg">
                                          <p v-for="file in previewFile.files" :key="file.id"
                                                class="text-sm text-gray-600">
                                                File: {{ file.original_file_name
                                                }}</p>
                                          <p class="text-sm text-gray-600">Uploaded: {{
                                                formatDate(previewFile.uploaded_at) }}</p>
                                    </div>

                                    <div v-for="file in previewFile.files" :key="file.id"
                                          class="flex items-center justify-center p-8 my-2 bg-gray-100 rounded-lg">

                                          <div v-if="file.file_type === 'image/png' || file.file_type === 'image/jpg' || file.file_type === 'image/jpeg'"
                                                class="text-center">
                                                <img :src="file.file_url" alt="Result preview"
                                                      class="max-w-full max-h-96">
                                                <button @click="downloadResult(file)"
                                                      class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                                      Download Image
                                                </button>
                                          </div>
                                          <div v-else-if="file.file_type === 'application/pdf'"
                                                class="text-center w-full">
                                                <iframe :src="file.file_url" frameborder="10"
                                                      class="w-full h-96"></iframe>
                                                <button @click="downloadResult(file)"
                                                      class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                                      Download
                                                </button>
                                          </div>
                                          <div v-else class="text-center">
                                                <span class="text-6xl">📊</span>
                                                <p class="mt-4 text-gray-600"> File</p>
                                                <button @click="downloadResult(file)"
                                                      class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                                      Download
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>


                  </div>
            </div>
      </AuthenticatedLayout>
</template>