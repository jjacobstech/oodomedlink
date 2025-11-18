<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';

// Patient type
interface Patient {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    gender: string;
    date_of_birth: string;
    total_results: number;
    last_result_date?: string;
}

// Props from backend
interface Props {
    patients?: Patient[];
}

const props = defineProps<Props>();

const selectedFilter = ref('all');
const searchQuery = ref('');
const previewPatient = ref<Patient | null>(null);
const addPatientModal = ref(false);

// Mock data for demonstration (replace when backend connected)
const mockPatients: Patient[] = props.patients || [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: 'No 6, keffi street',
        phone: '+2348012345678',
        gender: 'Male',
        date_of_birth: '1985-06-15',
        total_results: 4,
        last_result_date: '2025-11-05T10:30:00',
    },
];

// Search & Filter
const filteredPatients = computed(() => {
    let filtered = mockPatients;

    if (selectedFilter.value !== 'all') {
        filtered = filtered.filter((p) => p.gender === selectedFilter.value);
    }

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
            (p) =>
                p.name.toLowerCase().includes(query) ||
                p.email.toLowerCase().includes(query) ||
                p.phone.toLowerCase().includes(query),
        );
    }

    return filtered;
});

// Format date
const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

// Redirect to patient results page
const viewPatientResults = (patient: Patient) => {
    router.visit(`/clinic/patients/${patient.id}/results`);
};
</script>

<template>
    <Head title="Manage Patients" />

    <AuthenticatedLayout>
        <div class="h-full w-full bg-gray-100 px-10 pt-5">
            <div class="overflow-y-scroll p-6">
                <!-- Header -->
                <div class="flex justify-between">
                    <div class="mb-6">
                        <h1 class="text-3xl font-bold text-gray-800">
                            Patients Management
                        </h1>
                        <p class="text-gray-600">
                            View and manage all registered patients and their
                            test results
                        </p>
                    </div>
                    <div>
                        <button
                            class="btn rounded-md bg-primary px-10 py-7 text-2xl text-white transition-all duration-150 hover:-translate-y-1"
                        >
                            Add Patient
                        </button>
                    </div>
                </div>

                <!-- Filters & Search -->
                <div
                    class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                >
                    <div class="flex gap-2">
                        <button
                            @click="selectedFilter = 'all'"
                            :class="
                                selectedFilter === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700'
                            "
                            class="rounded-lg px-4 py-2 font-medium transition-colors"
                        >
                            All
                        </button>
                        <button
                            @click="selectedFilter = 'Male'"
                            :class="
                                selectedFilter === 'Male'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-200 text-gray-700'
                            "
                            class="rounded-lg px-4 py-2 font-medium transition-colors"
                        >
                            Male
                        </button>
                        <button
                            @click="selectedFilter = 'Female'"
                            :class="
                                selectedFilter === 'Female'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-200 text-gray-700'
                            "
                            class="rounded-lg px-4 py-2 font-medium transition-colors"
                        >
                            Female
                        </button>
                    </div>

                    <div class="relative">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search by name, email or phone..."
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 md:w-80"
                        />
                        <span
                            class="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                            >🔍</span
                        >
                    </div>
                </div>

                <!-- Patients Table -->
                <div class="overflow-x-auto rounded-xl bg-white shadow-md">
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
                                >
                                    Name
                                </th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
                                >
                                    Email
                                </th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
                                >
                                    Phone
                                </th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
                                >
                                    Gender
                                </th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
                                >
                                    Date of Birth
                                </th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
                                >
                                    Address
                                </th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
                                >
                                    Total Results
                                </th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
                                >
                                    Last Result
                                </th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr
                                v-for="patient in filteredPatients"
                                :key="patient.id"
                                class="hover:bg-gray-50"
                            >
                                <td class="px-4 py-3 font-medium text-gray-800">
                                    {{ patient.name }}
                                </td>
                                <td class="px-4 py-3 text-gray-700">
                                    {{ patient.email }}
                                </td>
                                <td class="px-4 py-3 text-gray-700">
                                    {{ patient.phone }}
                                </td>
                                <td class="px-4 py-3 text-gray-700">
                                    {{ patient.gender }}
                                </td>
                                <td class="px-4 py-3 text-gray-700">
                                    {{ formatDate(patient.date_of_birth) }}
                                </td>
                                <td class="px-4 py-3 text-gray-700">
                                    {{ patient.address }}
                                </td>
                                <td class="px-4 py-3 text-center text-gray-700">
                                    {{ patient.total_results }}
                                </td>
                                <td class="px-4 py-3 text-gray-600">
                                    {{ formatDate(patient.last_result_date) }}
                                </td>
                                <td class="px-4 py-3">
                                    <button
                                        @click="viewPatientResults(patient)"
                                        class="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-200"
                                    >
                                        View Results
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="filteredPatients.length === 0">
                                <td
                                    colspan="8"
                                    class="px-4 py-8 text-center text-gray-500"
                                >
                                    No patients found.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
