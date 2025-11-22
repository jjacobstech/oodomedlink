<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, router, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

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
    file_name: string;
    file_path: string;
    file_type: 'pdf' | 'image' | 'csv';
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
    latest_result: PatientResult | null;
    results_count: number;
}

interface PaginationData {
    current_page: number;
    data: Patient[];
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
    patients: PaginationData;
    filters?: {
        search?: string;
        gender?: string;
    };
}

const props = defineProps<Props>();

const selectedFilter = ref(props.filters?.gender || 'all');
const searchQuery = ref(props.filters?.search || '');
const showAddPatientModal = ref(false);
const showEditPatientModal = ref(false);
const editingPatient = ref<Patient | null>(null);

// Add patient form
const addPatientForm = useForm({
    full_name: '',
    email: '',
    phone_no: '',
    gender: '',
    date_of_birth: '',
    address: '',
});

// Edit patient form
const editPatientForm = useForm({
    full_name: '',
    email: '',
    phone_no: '',
    gender: '',
    date_of_birth: '',
    address: '',
});

// Apply filters
const applyFilters = (genderFilter?: string) => {
    if (genderFilter !== undefined) {
        selectedFilter.value = genderFilter;
    }

    const payload: Record<string, any> = {};

    if (selectedFilter.value && selectedFilter.value !== 'all') {
        payload.gender = selectedFilter.value;
    }

    if (searchQuery.value && searchQuery.value.trim() !== '') {
        payload.search = searchQuery.value.trim();
    }

    router.get(route('user.patients'), payload, {
        preserveScroll: true,
        preserveState: true,
    });
};

// Clear filters
const clearFilters = () => {
    selectedFilter.value = 'all';
    searchQuery.value = '';

    router.get(route('user.patients'), {}, {
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

// Format date
const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

// View patient details
const viewPatient = (patient: Patient) => {
    router.visit(route('user.patients.show', patient.id));
};

// Open edit modal
const openEditModal = (patient: Patient) => {
    editingPatient.value = patient;
    editPatientForm.full_name = patient.full_name;
    editPatientForm.email = patient.email;
    editPatientForm.phone_no = patient.phone_no;
    editPatientForm.gender = patient.gender;
    editPatientForm.date_of_birth = patient.date_of_birth || '';
    editPatientForm.address = patient.address || '';
    showEditPatientModal.value = true;
};

// Submit add patient
const submitAddPatient = () => {
    addPatientForm.post(route('user.patients.store'), {
        onSuccess: () => {
            addPatientForm.reset();
            showAddPatientModal.value = false;
        },
        onError: (errors) => {
            console.error('Add patient error:', errors);
        },
    });
};

// Submit edit patient
const submitEditPatient = () => {
    if (!editingPatient.value) return;

    editPatientForm.put(route('user.patients.update', editingPatient.value.id), {
        onSuccess: () => {
            editPatientForm.reset();
            showEditPatientModal.value = false;
            editingPatient.value = null;
        },
        onError: (errors) => {
            console.error('Edit patient error:', errors);
        },
    });
};

// Handle Enter key in search input
const handleSearchKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        applyFilters();
    }
};
</script>

<template>

    <Head title="Manage Patients" />

    <AuthenticatedLayout>
        <div class="flex w-full gap-1 h-full overflow-y-hidden bg-primaryLight">
            <div class="overflow-y-scroll w-full p-6">
                <!-- Header -->
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-800">
                            Patients Management
                        </h1>
                        <p class="text-gray-600">
                            View and manage all registered patients and their
                            test results
                        </p>
                    </div>
                    <div>
                        <button @click="showAddPatientModal = true"
                            class="rounded-md bg-primaryDark px-6 py-3 text-base font-semibold text-white transition-all duration-150 hover:-translate-y-1 hover:shadow-lg">
                            + Add Patient
                        </button>
                    </div>
                </div>

                <!-- Filters & Search -->
                <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div class="flex gap-2">
                        <button @click="applyFilters('all')" :class="selectedFilter === 'all'
                            ? 'bg-primaryDark text-white'
                            : 'bg-gray-200 text-gray-700'
                            " class="rounded-lg px-4 py-2 font-medium transition-all hover:shadow-md">
                            All
                        </button>
                        <button @click="applyFilters('Male')" :class="selectedFilter === 'Male'
                            ? 'bg-primaryDark text-white'
                            : 'bg-gray-200 text-gray-700'
    " class="rounded-lg px-4 py-2 font-medium transition-all hover:shadow-md">
                            Male
                        </button>
                        <button @click="applyFilters('Female')" :class="selectedFilter === 'Female'
                            ? 'bg-primaryDark text-white'
                            : 'bg-gray-200 text-gray-700'
                            " class="rounded-lg px-4 py-2 font-medium transition-all hover:shadow-md">
                            Female
                        </button>
                    </div>

                    <div class="flex gap-2 items-center w-full md:w-auto">
                        <div class="relative flex-1 md:flex-initial">
                            <input v-model="searchQuery" type="text" placeholder="Search by name, email or phone..."
                                @keydown="handleSearchKeydown"
                                class="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-primaryDark md:w-80" />
                            <span class="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400">🔍</span>
                        </div>
                        <button @click="applyFilters()"
                            class="px-4 py-2 text-sm font-semibold text-white bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg whitespace-nowrap">
                            Search
                        </button>
                        <button @click="clearFilters"
                            class="px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 hover:shadow-lg whitespace-nowrap">
                            Clear
                        </button>
                    </div>
                </div>

                <!-- Results Summary -->
                <div class="mb-4 text-sm text-gray-600">
                    <p>
                        Showing {{ patients.from || 0 }} to
                        {{ patients.to || 0 }} of {{ patients.total }} patients
                    </p>
                </div>

                <!-- Patients Table -->
                <div class="overflow-x-auto rounded-xl bg-white shadow-md">
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                                    Name
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                                    Email
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                                    Phone
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                                    Gender
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                                    Date of Birth
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                                    Total Results
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                                    Last Result
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="patient in patients.data" :key="patient.id" class="hover:bg-gray-50">
                                <td class="px-4 py-3 font-medium text-gray-800">
                                    {{ patient.full_name }}
                                </td>
                                <td class="px-4 py-3 text-gray-700">
                                    {{ patient.email }}
                                </td>
                                <td class="px-4 py-3 text-gray-700">
                                    {{ patient.phone_no || 'N/A' }}
                                </td>
                                <td class="px-4 py-3 text-gray-700">
                                    {{ patient.gender || 'N/A' }}
                                </td>
                                <td class="px-4 py-3 text-gray-700">
                                    {{ formatDate(patient.date_of_birth) }}
                                </td>
                                <td class="px-4 py-3 text-center text-gray-700">
                                    <span
                                        class="inline-flex items-center justify-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                                        {{ patient.results_count }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-gray-600">
                                    {{
                                        patient.latest_result
                                            ? formatDate(
                                                patient.latest_result
                                                    .uploaded_at
                                            )
                                            : 'N/A'
                                    }}
                                </td>
                                <td class="px-4 py-3">
                                    <div class="flex gap-2">
                                        <button @click="viewPatient(patient)"
                                            class="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-200">
                                            View
                                        </button>
                                        <button @click="openEditModal(patient)"
                                            class="rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-700 transition hover:bg-green-200">
                                            Edit
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="patients.data.length === 0">
                                <td colspan="8" class="px-4 py-8 text-center text-gray-500">
                                    No patients found.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="patients.last_page > 1" class="mt-6 flex items-center justify-between">
                    <button @click="goToPage(patients.prev_page_url)" :disabled="!patients.prev_page_url"
                        class="rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed">
                        Previous
                    </button>

                    <span class="text-sm text-gray-600">
                        Page {{ patients.current_page }} of
                        {{ patients.last_page }}
                    </span>

                    <button @click="goToPage(patients.next_page_url)" :disabled="!patients.next_page_url"
                        class="rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed">
                        Next
                    </button>
                </div>

                <!-- Add Patient Modal -->
                <div v-if="showAddPatientModal"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                    @click.self="showAddPatientModal = false">
                    <div class="w-full max-w-2xl p-6 bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
                        <h3 class="mb-6 text-2xl font-bold text-gray-800">
                            Add New Patient
                        </h3>

                        <form @submit.prevent="submitAddPatient" class="space-y-4">
                            <!-- Full Name -->
                            <div>
                                <label class="block mb-2 text-sm font-bold text-gray-700">
                                    Full Name *
                                </label>
                                <input v-model="addPatientForm.full_name" type="text" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"
                                    placeholder="Enter full name" />
                            </div>

                            <!-- Email -->
                            <div>
                                <label class="block mb-2 text-sm font-bold text-gray-700">
                                    Email *
                                </label>
                                <input v-model="addPatientForm.email" type="email" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"
                                    placeholder="Enter email address" />
                            </div>

                            <!-- Phone -->
                            <div>
                                <label class="block mb-2 text-sm font-bold text-gray-700">
                                    Phone Number *
                                </label>
                                <input v-model="addPatientForm.phone_no" type="tel" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"
                                    placeholder="Enter phone number" />
                            </div>

                            <!-- Gender -->
                            <div>
                                <label class="block mb-2 text-sm font-bold text-gray-700">
                                    Gender *
                                </label>
                                <select v-model="addPatientForm.gender" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent">
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <!-- Date of Birth -->
                            <div>
                                <label class="block mb-2 text-sm font-bold text-gray-700">
                                    Date of Birth
                                </label>
                                <input v-model="addPatientForm.date_of_birth" type="date"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent" />
                            </div>

                            <!-- Address -->
                            <div>
                                <label class="block mb-2 text-sm font-bold text-gray-700">
                                    Address
                                </label>
                                <textarea v-model="addPatientForm.address" rows="3"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"
                                    placeholder="Enter address"></textarea>
                            </div>

                            <!-- Buttons -->
                            <div class="flex gap-3 pt-4">
                                <button type="submit" :disabled="addPatientForm.processing"
                                    class="flex-1 px-4 py-2 font-semibold text-white bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    {{
                                    addPatientForm.processing
                                    ? 'Adding...'
                                    : 'Add Patient'
                                    }}
                                </button>
                                <button type="button" @click="
                                    () => {
                                        showAddPatientModal = false;
                                        addPatientForm.reset();
                                    }
                                "
                                    class="flex-1 px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:shadow-lg transition">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Edit Patient Modal -->
                <div v-if="showEditPatientModal && editingPatient"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                    @click.self="showEditPatientModal = false">
                    <div class="w-full max-w-2xl p-6 bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
                        <h3 class="mb-6 text-2xl font-bold text-gray-800">
                            Edit Patient: {{ editingPatient.full_name }}
                        </h3>

                        <form @submit.prevent="submitEditPatient" class="space-y-4">
                            <!-- Same form fields as Add Patient -->
                            <div>
                                <label class="block mb-2 text-sm font-bold text-gray-700">
                                    Full Name *
                                </label>
                                <input v-model="editPatientForm.full_name" type="text" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent" />
                            </div>

                            <div>
                                <label class="block mb-2 text-sm font-bold text-gray-700">
                                    Email *
                                </label>
                                <input v-model="editPatientForm.email" type="email" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent" />
                            </div>

                            <div>
                                <label class="block mb-2 text-sm font-bold text-gray-700">
                                    Phone Number *
                                </label>
                                <input v-model="editPatientForm.phone_no" type="tel" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent" />
                            </div>

                            <div>
                                <label class="block mb-2 text-sm font-bold text-gray-700">
                                    Gender *
                                </label>
                                <select v-model="editPatientForm.gender" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent">
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label class="block mb-2 text-sm font-bold text-gray-700">
                                    Date of Birth
                                </label>
                                <input v-model="editPatientForm.date_of_birth" type="date"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent" />
                            </div>

                            <div>
                                <label class="block mb-2 text-sm font-bold text-gray-700">
                                    Address
                                </label>
                                <textarea v-model="editPatientForm.address" rows="3"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"></textarea>
                            </div>

                            <div class="flex gap-3 pt-4">
                                <button type="submit" :disabled="editPatientForm.processing"
                                    class="flex-1 px-4 py-2 font-semibold text-white bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    {{
                                    editPatientForm.processing
                                    ? 'Updating...'
                                    : 'Update Patient'
                                    }}
                                </button>
                                <button type="button" @click="
                                    () => {
                                        showEditPatientModal = false;
                                        editPatientForm.reset();
                                        editingPatient = null;
                                    }
                                "
                                    class="flex-1 px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:shadow-lg transition">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>