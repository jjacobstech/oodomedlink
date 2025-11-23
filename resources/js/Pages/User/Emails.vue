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
    status: 'pending' | 'sent' | 'failed' | 'scheduled';
    files: File[];
}

interface PatientEmail {
    id: string;
    patient_result_id: string;
    patient_email: string;
    subject: string;
    sent_by: string;
    sent_at: string;
    status: 'sent' | 'failed' | 'pending' | 'scheduled';
    message_preview: string;
    delivery_attempts: number;
    patient: {
        full_name: string;
        email: string;
    } | null;
    result: PatientResult;
}

interface PaginationData {
    current_page: number;
    data: PatientEmail[];
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
    emails: PaginationData;
    search?: string;
    filter?: string;
    error?: any;
}

const props = defineProps<Props>();

const selectedFilter = ref(props.filter || 'all');
const searchQuery = ref(props.search || '');
const previewEmail = ref<PatientEmail | null>(null);
const selectionFilter = ['all', 'pending', 'sent', 'failed', 'scheduled'];
const retrying = ref<string | null>(null);

const downloadResult = (file: File) => {
    window.open(file.file_url, '_blank');
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

    router.get(route('user.emails'), payload, {
        preserveScroll: true,
        preserveState: true,
        onError: (response) => {
           // console.error('Filter error:', response);
        },
    });
};

// Clear all filters
const clearFilters = () => {
    selectedFilter.value = 'all';
    searchQuery.value = '';

    router.get(
        route('user.emails'),
        {},
        {
            preserveScroll: true,
            preserveState: true,
        }
    );
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
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

// Retry failed email
const retryEmail = (email: PatientEmail) => {
    if (retrying.value) return;

    retrying.value = email.id;
    const retryForm = useForm({
        id: email.id,
    });

    retryForm.post(route('user.email.retry'), {
        onSuccess: () => {
            retrying.value = null;
        },
        onError: (errors) => {
          //  console.error('Retry error:', errors);
            retrying.value = null;
        },
    });
};

// Handle Enter key in search input
const handleSearchKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        applyFilters();
    }
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

    <Head title="Email Management" />

    <AuthenticatedLayout>
        <div class="flex w-full gap-1 h-full overflow-y-hidden bg-primaryLight">
            <div class="overflow-y-scroll w-full p-4 sm:p-6">
                <!-- Header -->
                <div class="mb-6">
                    <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">
                        Patient Emails
                    </h1>
                    <p class="text-sm sm:text-base text-gray-600 mt-1">
                        Monitor and manage all sent emails to patients
                    </p>
                </div>

                <!-- Filters & Search -->
                <div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <!-- Filter Buttons -->
                    <div class="flex flex-wrap gap-2">
                        <button v-for="selection in selectionFilter" :key="selection" @click="applyFilters(selection)"
                            :class="selectedFilter === selection
                                    ? 'bg-primaryDark text-white'
                                    : 'bg-gray-200 text-gray-700'
                                "
                            class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all hover:shadow-md capitalize">
                            {{ selection }}
                        </button>
                    </div>

                    <!-- Search Section -->
                    <div class="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                        <div class="relative flex-1 lg:flex-initial">
                            <input v-model="searchQuery" type="text" placeholder="Search by patient name..."
                                @keydown="handleSearchKeydown"
                                class="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-primaryDark lg:w-80" />
                            <span class="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400">🔍</span>
                        </div>
                        <div class="flex gap-2">
                            <button @click="applyFilters()"
                                class="flex-1 sm:flex-initial px-4 py-2 text-sm font-semibold text-white bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg transition whitespace-nowrap">
                                Search
                            </button>
                            <button @click="clearFilters"
                                class="flex-1 sm:flex-initial px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 hover:shadow-lg transition whitespace-nowrap">
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Results Summary -->
                <div class="mb-4 text-xs sm:text-sm text-gray-600">
                    <p>
                        Showing {{ emails.from || 0 }} to
                        {{ emails.to || 0 }} of {{ emails.total }} emails
                    </p>
                </div>

                <!-- Mobile Card View -->
                <div class="lg:hidden space-y-4">
                    <div v-for="email in emails.data" :key="email.id"
                        class="bg-white rounded-xl shadow-md p-4 space-y-3">
                        <div class="flex justify-between items-start">
                            <div class="flex-1 min-w-0">
                                <h3 class="font-semibold text-gray-800 truncate" :class="email.patient
                                        ? 'text-gray-800'
                                        : 'text-red-800'
                                    ">
                                    {{
                                        email.patient === null
                                            ? 'Deleted Patient'
                                            : email.patient.full_name
                                    }}
                                </h3>
                                <p class="text-sm text-gray-600 truncate">
                                    {{
                                        email.patient === null
                                            ? 'Deleted Patient'
                                            : email.patient.email
                                    }}
                                </p>
                            </div>
                            <span :class="{
                                'bg-green-100 text-green-800':
                                    email.status === 'sent',
                                'bg-red-100 text-red-800':
                                    email.status === 'failed',
                                'bg-orange-100 text-orange-800':
                                    email.status === 'pending',
                                'bg-primaryDark text-white':
                                    email.status === 'scheduled',
                            }"
                                class="rounded-full px-2.5 py-1 text-xs font-semibold capitalize whitespace-nowrap ml-2">
                                {{ email.status }}
                            </span>
                        </div>

                        <div class="space-y-1 text-sm">
                            <p class="text-gray-700 truncate">
                                <span class="font-medium">Subject:</span>
                                {{ email.subject }}
                            </p>
                            <p class="text-gray-600 text-xs">
                                {{ formatDate(email.sent_at) }}
                            </p>
                        </div>

                        <div class="flex gap-2 pt-2">
                            <button v-if="email.patient" @click="previewEmail = email"
                                class="flex-1 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-200">
                                View Details
                            </button>
                            <button v-if="
                                email.status === 'failed' ||
                                email.status === 'scheduled'
                            " @click="retryEmail(email)" :disabled="retrying === email.id"
                                class="flex-1 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                {{ retrying === email.id ? 'Retrying...' : 'Retry' }}
                            </button>
                        </div>
                    </div>

                    <div v-if="emails.data.length === 0"
                        class="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
                        <div class="text-4xl mb-2">📧</div>
                        <p>No emails found.</p>
                    </div>
                </div>

                <!-- Desktop Table View -->
                <div class="hidden lg:block overflow-x-auto rounded-xl bg-white shadow-md">
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                                    Patient
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                                    Email
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                                    Subject
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                                    Sent At
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                                    Status
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="email in emails.data" :key="email.id" class="hover:bg-gray-50">
                                <td class="px-4 py-3 font-medium" :class="email.patient
                                        ? 'text-gray-800'
                                        : 'text-red-800'
                                    ">
                                    {{
                                        email.patient === null
                                            ? 'Deleted Patient'
                                            : email.patient.full_name
                                    }}
                                </td>
                                <td class="px-4 py-3 font-medium" :class="email.patient
                                        ? 'text-gray-800'
                                        : 'text-red-800'
                                    ">
                                    {{
                                        email.patient === null
                                            ? 'Deleted Patient'
                                            : email.patient.email
                                    }}
                                </td>
                                <td class="max-w-[200px] truncate px-4 py-3 text-gray-700">
                                    {{ email.subject }}
                                </td>
                                <td class="px-4 py-3 text-gray-600">
                                    {{ formatDate(email.sent_at) }}
                                </td>
                                <td class="px-4 py-3">
                                    <span :class="{
                                        'bg-green-100 text-green-800':
                                            email.status === 'sent',
                                        'bg-red-100 text-red-800':
                                            email.status === 'failed',
                                        'bg-orange-100 text-orange-800':
                                            email.status === 'pending',
                                        'bg-primaryDark text-white':
                                            email.status === 'scheduled',
                                    }" class="rounded-full px-3 py-1 text-xs font-semibold capitalize">
                                        {{ email.status }}
                                    </span>
                                </td>
                                <td class="px-4 py-3">
                                    <div class="flex gap-2">
                                        <button @click="previewEmail = email" v-if="email.patient"
                                            class="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-200">
                                            View
                                        </button>
                                        <button v-if="
                                            email.status === 'failed' ||
                                            email.status === 'scheduled'
                                        " @click="retryEmail(email)" :disabled="retrying === email.id"
                                            class="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 transition hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                            {{
                                                retrying === email.id
                                                    ? 'Retrying...'
                                                    : 'Retry'
                                            }}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="emails.data.length === 0">
                                <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                                    No emails found.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="emails.last_page > 1"
                    class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button @click="goToPage(emails.prev_page_url)" :disabled="!emails.prev_page_url"
                        class="w-full sm:w-auto rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed">
                        Previous
                    </button>

                    <span class="text-sm text-gray-600">
                        Page {{ emails.current_page }} of
                        {{ emails.last_page }}
                    </span>

                    <button @click="goToPage(emails.next_page_url)" :disabled="!emails.next_page_url"
                        class="w-full sm:w-auto rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed">
                        Next
                    </button>
                </div>

                <!-- Preview Modal -->
                <div v-if="previewEmail"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                    @click.self="previewEmail = null">
                    <div class="w-full max-w-4xl bg-white rounded-xl max-h-[90vh] overflow-y-auto">
                        <!-- Modal Header -->
                        <div
                            class="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-start justify-between gap-4">
                            <h3 class="text-lg sm:text-2xl font-bold text-gray-800 break-words flex-1">
                                {{ previewEmail.subject }}
                            </h3>
                            <button @click="previewEmail = null"
                                class="flex-shrink-0 rounded-lg bg-gray-200 px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 transition">
                                Close
                            </button>
                        </div>

                        <!-- Modal Content -->
                        <div class="p-4 sm:p-6 space-y-6">
                            <!-- Email Info -->
                            <div class="text-sm sm:text-base text-gray-600 space-y-2">
                                <p class="break-words">
                                    <strong>To:</strong>
                                    {{ previewEmail.patient?.full_name }} ({{
                                        previewEmail.patient_email
                                    }})
                                </p>
                                <p>
                                    <strong>Sent:</strong>
                                    {{ formatDate(previewEmail.sent_at) }}
                                </p>
                                <p>
                                    <strong>Status:</strong>
                                    <span :class="{
                                        'text-green-700':
                                            previewEmail.status === 'sent',
                                        'text-red-700':
                                            previewEmail.status === 'failed',
                                        'text-orange-700':
                                            previewEmail.status === 'pending',
                                        'text-primaryDark':
                                            previewEmail.status ===
                                            'scheduled',
                                    }" class="font-semibold capitalize">
                                        {{ previewEmail.status }}
                                    </span>
                                </p>
                                <p v-if="previewEmail.delivery_attempts > 1">
                                    <strong>Delivery Attempts:</strong>
                                    {{ previewEmail.delivery_attempts }}
                                </p>
                            </div>

                            <!-- Message Preview -->
                            <div class="rounded-lg bg-gray-50 p-4 text-sm sm:text-base text-gray-700">
                                <p class="whitespace-pre-wrap break-words">
                                    {{ previewEmail.message_preview }}
                                </p>
                            </div>

                            <!-- Attachments -->
                            <div v-if="
                                previewEmail.result &&
                                previewEmail.result.files &&
                                previewEmail.result.files.length > 0
                            " class="space-y-4">
                                <h4 class="text-base sm:text-lg font-semibold text-gray-800">
                                    Attachments ({{
                                        previewEmail.result.files.length
                                    }})
                                </h4>
                                <div v-for="file in previewEmail.result.files" :key="file.id"
                                    class="bg-gray-50 rounded-lg p-4 sm:p-6">
                                    <!-- Image Preview -->
                                    <div v-if="
                                        file.file_type === 'image/png' ||
                                        file.file_type === 'image/jpg' ||
                                        file.file_type === 'image/jpeg'
                                    " class="text-center space-y-4">
                                        <img :src="file.file_url" :alt="file.original_file_name"
                                            class="max-w-full max-h-96 mx-auto rounded-lg shadow" />
                                        <div class="flex flex-col sm:flex-row gap-2 justify-center">
                                            <p class="text-sm text-gray-600 break-all">
                                                {{ file.original_file_name }}
                                            </p>
                                            <button @click="downloadResult(file)"
                                                class="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                                                Download
                                            </button>
                                        </div>
                                    </div>

                                    <!-- PDF Preview -->
                                    <div v-else-if="
                                        file.file_type === 'application/pdf'
                                    " class="space-y-4">
                                        <iframe :src="file.file_url" class="w-full h-96 rounded-lg"></iframe>
                                        <div class="flex flex-col sm:flex-row gap-2 justify-center items-center">
                                            <p class="text-sm text-gray-600 break-all text-center">
                                                {{ file.original_file_name }}
                                            </p>
                                            <button @click="downloadResult(file)"
                                                class="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                                                Download PDF
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Other File Types -->
                                    <div v-else class="text-center space-y-4">
                                        <span class="text-4xl sm:text-6xl">📄</span>
                                        <p class="text-sm sm:text-base text-gray-600 font-medium break-all px-4">
                                            {{ file.original_file_name }}
                                        </p>
                                        <p class="text-xs sm:text-sm text-gray-500">
                                            {{ formatFileSize(file.file_size) }}
                                        </p>
                                        <button @click="downloadResult(file)"
                                            class="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                                            Download File
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>