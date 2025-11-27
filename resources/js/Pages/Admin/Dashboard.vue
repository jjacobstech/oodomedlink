<script setup lang="ts">
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout.vue';
import { Head, router, useForm, Link } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';

// Types
interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: PaginationLink[];
}

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

interface Clinic {
    id: string;
    name: string;
    email: string;
    phone_no: string;
    address: string;
    state: string;
    country: string;
    status: 'active' | 'inactive' | 'suspended';
    staff_no?: string;
    created_at: string;
}

interface Patient {
    id: string;
    clinic_id: string;
    full_name: string;
    email: string;
    phone_no: string;
    date_of_birth: string;
    gender: 'male' | 'female' | 'other';
    address: string;
    created_at: string;
}

interface PatientResult {
    id: string;
    clinic_id: string;
    patient_id: string;
    result_type: string;
    test_name: string;
    test_date: string;
    status: 'pending' | 'processed' | 'sent' | 'archived';
    uploaded_at: string;
    files: file[];
    patient: Patient
}

interface EmailDelivery {
    id: string;
    patient_result_id: string;
    patient_email: string;
    sent_by: string;
    subject: string;
    status: 'sent' | 'pending' | 'failed' | 'bounced' | 'scheduled';
    sent_at: string;
    delivery_attempts: number;
    error_message?: string;
    created_at: string;
    scheduled_at: string;
}

interface Admin {
    id: string;
    name: string;
    email: string;
    phone_no: string;
    role: 'admin' | 'super_admin';
    status: 'active' | 'inactive' | 'suspended';
    created_at: string;
}

interface Props {
    clinics?: PaginatedData<Clinic>;
    patients?: PaginatedData<Patient>;
    results?: PaginatedData<PatientResult>;
    emails?: PaginatedData<EmailDelivery>;
    admins?: PaginatedData<Admin>;
    stats?: {
        totalClinics: number;
        activeClinics: number;
        totalPatients: number;
        totalResults: number;
        totalEmails: number;
        pendingResults: number;
        emailsFailed: number;
    };
    filters?: {
        search: string;
        status: string;
        per_page: number;
        tab: string;
    };
}

const props = defineProps<Props>();

// State
const activeTab = ref<'overview' | 'clinics' | 'patients' | 'results' | 'emails' | 'admins'>(
    (props.filters?.tab as any) || 'overview'
);
const searchQuery = ref(props.filters?.search || '');
const filterStatus = ref(props.filters?.status || 'all');
const perPage = ref(props.filters?.per_page || 15);

// Watch for tab changes and update URL
watch(activeTab, (newTab) => {
    router.get(
        route('admin.dashboard'),
        {
            tab: newTab,
            search: searchQuery.value,
            status: filterStatus.value,
            per_page: perPage.value,
        },
        {
            preserveState: true,
            replace: true,
        }
    );
});

// Watch for filter changes with debounce
let searchTimeout: number;
watch([searchQuery, filterStatus, perPage], () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        router.get(
            route('admin.dashboard'),
            {
                tab: activeTab.value,
                search: searchQuery.value,
                status: filterStatus.value,
                per_page: perPage.value,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    }, 300);
});

const stats = computed(() => props.stats);

// Pagination helper
const goToPage = (url: string | null) => {
    if (!url) return;
    router.get(url, {}, { preserveState: true, preserveScroll: true });
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const formatDob = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800',
        suspended: 'bg-red-100 text-red-800',
        pending: 'bg-yellow-100 text-yellow-800',
        processed: 'bg-blue-100 text-blue-800',
        sent: 'bg-green-100 text-green-800',
        archived: 'bg-purple-100 text-purple-800',
        failed: 'bg-red-100 text-red-800',
        scheduled: 'bg-orange-100 text-orange-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};
</script>

<template>

    <Head title="Admin Panel" />

    <AdminAuthenticatedLayout>
        <div class="flex w-full h-screen gap-1 overflow-hidden bg-gray-100">
            <div class="w-full overflow-y-auto p-6">
                <!-- Header -->
                <div class="mb-6">
                    <h1 class="text-3xl font-bold text-gray-900">Admin Panel</h1>
                    <p class="text-gray-600">
                        Manage clinics, patients, results, and system administrators
                    </p>
                </div>

                <!-- Tab Navigation -->
                <div class="mb-6 flex gap-2 overflow-x-auto">
                    <button @click="activeTab = 'overview'"
                        :class="activeTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                        class="whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors">
                        📊 Overview
                    </button>
                    <button @click="activeTab = 'clinics'"
                        :class="activeTab === 'clinics' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                        class="whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors">
                        🏥 Clinics
                    </button>
                    <button @click="activeTab = 'patients'"
                        :class="activeTab === 'patients' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                        class="whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors">
                        👥 Patients
                    </button>
                    <button @click="activeTab = 'results'"
                        :class="activeTab === 'results' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                        class="whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors">
                        📋 Results
                    </button>
                    <button @click="activeTab = 'emails'"
                        :class="activeTab === 'emails' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                        class="whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors">
                        📧 Email Logs
                    </button>
                    <button @click="activeTab = 'admins'"
                        :class="activeTab === 'admins' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                        class="whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors">
                        👤 Admins
                    </button>
                </div>

                <!-- Overview Tab -->
                <div v-if="activeTab === 'overview'">
                    <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div class="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-600">Total Clinics</p>
                                    <p class="mt-2 text-3xl font-bold text-blue-600">{{ stats?.totalClinics }}</p>
                                    <p class="mt-1 text-xs text-green-600">{{ stats?.activeClinics }} active</p>
                                </div>
                                <div class="rounded-full bg-blue-100 p-3">
                                    <span class="text-3xl">🏥</span>
                                </div>
                            </div>
                        </div>

                        <div class="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-600">Total Patients</p>
                                    <p class="mt-2 text-3xl font-bold text-green-600">{{ stats?.totalPatients }}</p>
                                </div>
                                <div class="rounded-full bg-green-100 p-3">
                                    <span class="text-3xl">👥</span>
                                </div>
                            </div>
                        </div>

                        <div class="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-600">Test Results</p>
                                    <p class="mt-2 text-3xl font-bold text-purple-600">{{ stats?.totalResults }}</p>
                                    <p class="mt-1 text-xs text-orange-600">{{ stats?.pendingResults }} pending</p>
                                </div>
                                <div class="rounded-full bg-purple-100 p-3">
                                    <span class="text-3xl">📋</span>
                                </div>
                            </div>
                        </div>

                        <div class="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-600">Email Delivery</p>
                                    <p class="mt-2 text-3xl font-bold text-indigo-600">{{ stats?.totalEmails }}</p>
                                    <p class="mt-1 text-xs text-red-600">{{ stats?.emailsFailed }} failed</p>
                                </div>
                                <div class="rounded-full bg-indigo-100 p-3">
                                    <span class="text-3xl">📧</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Clinics Tab -->
                <div v-if="activeTab === 'clinics'">
                    <div class="rounded-xl bg-white p-6 shadow-sm">
                        <div class="mb-6 flex items-center justify-between">
                            <h2 class="text-xl font-bold text-gray-900">Manage Clinics</h2>
                        </div>

                        <!-- Filters -->
                        <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div class="flex gap-2">
                                <button @click="filterStatus = 'all'"
                                    :class="filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
                                    class="rounded-lg px-4 py-2 font-medium transition-colors">
                                    All
                                </button>
                                <button @click="filterStatus = 'active'"
                                    :class="filterStatus === 'active' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'"
                                    class="rounded-lg px-4 py-2 font-medium transition-colors">
                                    Active
                                </button>
                                <button @click="filterStatus = 'inactive'"
                                    :class="filterStatus === 'inactive' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'"
                                    class="rounded-lg px-4 py-2 font-medium transition-colors">
                                    Inactive
                                </button>
                            </div>

                            <input v-model="searchQuery" type="text" placeholder="Search clinics..."
                                class="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <!-- Clinics Table -->
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Clinic Name
                                        </th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Email
                                        </th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Phone
                                        </th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Location
                                        </th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="clinic in clinics?.data" :key="clinic.id" class="hover:bg-gray-50">
                                        <td class="px-4 py-4 text-sm font-medium text-gray-900">{{ clinic.name }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ clinic.email }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ clinic.phone_no }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ clinic.state }}, {{
                                            clinic.country }}</td>
                                        <td class="px-4 py-4 text-sm">
                                            <span :class="getStatusColor(clinic.status)"
                                                class="rounded-full px-3 py-1 text-xs font-semibold">
                                                {{ clinic.status }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination -->
                        <div v-if="clinics"
                            class="mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                            <div class="flex flex-1 justify-between sm:hidden">
                                <button @click="goToPage(clinics.links[0]?.url)" :disabled="!clinics.links[0]?.url"
                                    class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Previous
                                </button>
                                <button @click="goToPage(clinics.links[clinics.links.length - 1]?.url)"
                                    :disabled="!clinics.links[clinics.links.length - 1]?.url"
                                    class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Next
                                </button>
                            </div>
                            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p class="text-sm text-gray-700">
                                        Showing
                                        <span class="font-medium">{{ clinics.from }}</span>
                                        to
                                        <span class="font-medium">{{ clinics.to }}</span>
                                        of
                                        <span class="font-medium">{{ clinics.total }}</span>
                                        results
                                    </p>
                                </div>
                                <div>
                                    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm"
                                        aria-label="Pagination">
                                        <button v-for="(link, index) in clinics.links" :key="index"
                                            @click="goToPage(link.url)" :disabled="!link.url || link.active" :class="[
                                                link.active
                                                    ? 'z-10 bg-blue-600 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50',
                                                !link.url ? 'cursor-not-allowed opacity-50' : '',
                                                'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0'
                                            ]" v-html="link.label"></button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Similar pagination sections for Patients, Results, Emails, and Admins tabs -->
                <!-- For brevity, I'll show the patients tab as an example -->

                <!-- Patients Tab -->
                <div v-if="activeTab === 'patients'">
                    <div class="rounded-xl bg-white p-6 shadow-sm">
                        <div class="mb-6 flex items-center justify-between">
                            <h2 class="text-xl font-bold text-gray-900">Manage Patients</h2>
                        </div>

                        <div class="mb-6">
                            <input v-model="searchQuery" type="text"
                                placeholder="Search patients by name, email, or ID..."
                                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500" />
                        </div>

                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Full Name</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Email</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Phone</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Gender</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Date of Birth</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="patient in patients?.data" :key="patient.id" class="hover:bg-gray-50">
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ patient.full_name }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ patient.email }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ patient.phone_no ?? 'N/A' }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-700">
                                            <span class="capitalize">{{ patient.gender ?? 'N/A' }}</span>
                                        </td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ patient.date_of_birth ?
                                            formatDob(patient.date_of_birth) : 'N/A' }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination for Patients -->
                        <div v-if="patients"
                            class="mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p class="text-sm text-gray-700">
                                        Showing <span class="font-medium">{{ patients.from }}</span> to
                                        <span class="font-medium">{{ patients.to }}</span> of
                                        <span class="font-medium">{{ patients.total }}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                        <button v-for="(link, index) in patients.links" :key="index"
                                            @click="goToPage(link.url)" :disabled="!link.url || link.active" :class="[
                                                link.active ? 'z-10 bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50',
                                                !link.url ? 'cursor-not-allowed opacity-50' : '',
                                                'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300'
                                            ]" v-html="link.label"></button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Results Tab -->
                <div v-if="activeTab === 'results'">
                    <div class="rounded-xl bg-white p-6 shadow-sm">
                        <div class="mb-6 flex items-center justify-between">
                            <h2 class="text-xl font-bold text-gray-900">Manage Results</h2>
                        </div>

                        <div class="mb-6">
                            <input v-model="searchQuery" type="text"
                                placeholder="Search patients by name, email, or ID..."
                                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500" />
                        </div>

                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Full Name</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Email</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Phone <i class="ri-notification-3-line"></i></th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Result Type</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Test Name</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Test Date</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Status</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Uploaded At</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="result in results?.data" :key="result.id" class="hover:bg-gray-50">
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ result.patient.full_name }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ result.patient.email }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ result.patient.phone_no ?? 'N/A'
                                        }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-700">
                                            <span class="capitalize">{{ result.result_type ?? 'N/A' }}</span>
                                        </td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ result.test_name ?? 'N/A' }}
                                        </td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ formatDate(result.test_date) ??
                                            'N/A' }}
                                        </td>
                                        <td class="px-4 py-4 text-sm">
                                            <span :class="getStatusColor(result.status)"
                                                class="rounded-full px-3 py-1 text-xs font-semibold">
                                                {{ result.status }}
                                            </span>
                                        </td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ formatDate(result.uploaded_at) ??
                                            'N/A' }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination for results -->
                        <div v-if="results"
                            class="mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p class="text-sm text-gray-700">
                                        Showing <span class="font-medium">{{ results.from }}</span> to
                                        <span class="font-medium">{{ results.to }}</span> of
                                        <span class="font-medium">{{ results.total }}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                        <button v-for="(link, index) in results.links" :key="index"
                                            @click="goToPage(link.url)" :disabled="!link.url || link.active" :class="[
                                                link.active ? 'z-10 bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50',
                                                !link.url ? 'cursor-not-allowed opacity-50' : '',
                                                'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300'
                                            ]" v-html="link.label"></button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Email Tab -->
                <div v-if="activeTab === 'emails'">
                    <div class="rounded-xl bg-white p-6 shadow-sm">
                        <div class="mb-6 flex items-center justify-between">
                            <h2 class="text-xl font-bold text-gray-900">Manage Emails</h2>
                        </div>
                        <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div class="flex gap-2">
                                <button @click="filterStatus = 'all'"
                                    :class="filterStatus === 'all' ? 'bg-primaryDark text-white' : 'bg-gray-200 text-gray-700'"
                                    class="rounded-lg px-4 py-2 font-medium transition-colors">
                                    All
                                </button>
                                <button @click="filterStatus = 'sent'"
                                    :class="filterStatus === 'sent' ? 'bg-primaryDark text-white' : 'bg-gray-200 text-gray-700'"
                                    class="rounded-lg px-4 py-2 font-medium transition-colors">
                                    Sent
                                </button>
                                <button @click="filterStatus = 'pending'"
                                    :class="filterStatus === 'pending' ? 'bg-primaryDark text-white' : 'bg-gray-200 text-gray-700'"
                                    class="rounded-lg px-4 py-2 font-medium transition-colors">
                                    Pending
                                </button>
                                <button @click="filterStatus = 'scheduled'"
                                    :class="filterStatus === 'scheduled' ? 'bg-primaryDark text-white' : 'bg-gray-200 text-gray-700'"
                                    class="rounded-lg px-4 py-2 font-medium transition-colors">
                                    Scheduled
                                </button>
                                <button @click="filterStatus = 'failed'"
                                    :class="filterStatus === 'failed' ? 'bg-primaryDark text-white' : 'bg-gray-200 text-gray-700'"
                                    class="rounded-lg px-4 py-2 font-medium transition-colors">
                                    Failed
                                </button>
                            </div>

                            <input v-model="searchQuery" type="text" placeholder="Search clinics..."
                                class="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Email</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Sent By</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Subject</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Sent At</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Attempts</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Scheduled At</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Status</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="email in emails?.data" :key="email.id" class="hover:bg-gray-50">
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ email.patient_email }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ email.sent_by }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ email.subject ?? 'N/A'
                                        }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ formatDate(email.sent_at) ??
                                            'N/A' }}
                                        </td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ email.delivery_attempts ?? 'N/A'
                                        }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ formatDate(email.scheduled_at) ??
                                            'N/A' }}
                                        </td>

                                        <td class="px-4 py-4 text-sm">
                                            <span :class="getStatusColor(email.status)"
                                                class="rounded-full px-3 py-1 text-xs font-semibold">
                                                {{ email.status }}
                                            </span>
                                        </td>




                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination for results -->
                        <div v-if="emails"
                            class="mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p class="text-sm text-gray-700">
                                        Showing <span class="font-medium">{{ emails.from }}</span> to
                                        <span class="font-medium">{{ emails.to }}</span> of
                                        <span class="font-medium">{{ emails.total }}</span> emails
                                    </p>
                                </div>
                                <div>
                                    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                        <button v-for="(link, index) in emails.links" :key="index"
                                            @click="goToPage(link.url)" :disabled="!link.url || link.active" :class="[
                                                link.active ? 'z-10 bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50',
                                                !link.url ? 'cursor-not-allowed opacity-50' : '',
                                                'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300'
                                            ]" v-html="link.label"></button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Clinics Tab -->
                <div v-if="activeTab === 'admins'">
                    <div class="rounded-xl bg-white p-6 shadow-sm">
                        <div class="mb-6 flex items-center justify-between">
                            <h2 class="text-xl font-bold text-gray-900">Manage Admin</h2>
                        </div>

                        <!-- Filters -->
                        <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div class="flex gap-2">
                                <button @click="filterStatus = 'all'"
                                    :class="filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
                                    class="rounded-lg px-4 py-2 font-medium transition-colors">
                                    All
                                </button>
                                <button @click="filterStatus = 'active'"
                                    :class="filterStatus === 'active' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'"
                                    class="rounded-lg px-4 py-2 font-medium transition-colors">
                                    Active
                                </button>
                                <button @click="filterStatus = 'inactive'"
                                    :class="filterStatus === 'inactive' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'"
                                    class="rounded-lg px-4 py-2 font-medium transition-colors">
                                    Inactive
                                </button>
                            </div>

                            <input v-model="searchQuery" type="text" placeholder="Search clinics..."
                                class="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <!-- Clinics Table -->
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Name
                                        </th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Email
                                        </th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Phone
                                        </th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Role
                                        </th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="admins in admins?.data" :key="admins.id" class="hover:bg-gray-50">
                                        <td class="px-4 py-4 text-sm font-medium text-gray-900">{{ admins.name }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ admins.email }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ admins.phone_no }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-700">{{ admins.role }}</td>
                                        <td class="px-4 py-4 text-sm">
                                            <span :class="getStatusColor(admins.status)"
                                                class="rounded-full px-3 py-1 text-xs font-semibold">
                                                {{ admins.status }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination -->
                        <div v-if="admins"
                            class="mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                            <div class="flex flex-1 justify-between sm:hidden">
                                <button @click="goToPage(admins.links[0]?.url)" :disabled="!admins.links[0]?.url"
                                    class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Previous
                                </button>
                                <button @click="goToPage(admins.links[admins.links.length - 1]?.url)"
                                    :disabled="!admins.links[admins.links.length - 1]?.url"
                                    class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Next
                                </button>
                            </div>
                            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p class="text-sm text-gray-700">
                                        Showing
                                        <span class="font-medium">{{ admins.from }}</span>
                                        to
                                        <span class="font-medium">{{ admins.to }}</span>
                                        of
                                        <span class="font-medium">{{ admins.total }}</span>
                                        results
                                    </p>
                                </div>
                                <div>
                                    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm"
                                        aria-label="Pagination">
                                        <button v-for="(link, index) in admins.links" :key="index"
                                            @click="goToPage(link.url)" :disabled="!link.url || link.active" :class="[
                                                link.active
                                                    ? 'z-10 bg-blue-600 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50',
                                                !link.url ? 'cursor-not-allowed opacity-50' : '',
                                                'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0'
                                            ]" v-html="link.label"></button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Add similar sections for Results, Emails, and Admins tabs with pagination -->
            </div>
        </div>
    </AdminAuthenticatedLayout>
</template>