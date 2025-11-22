<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, router, useForm } from '@inertiajs/vue3';
import { ref, watch } from 'vue';

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
    };
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
    error: any;
}

const props = defineProps<Props>();

const selectedFilter = ref(props.filter || 'all');
const searchQuery = ref(props.search || '');
const previewEmail = ref<PatientEmail | null>(null);
const selectionFilter = ['all', 'pending', 'sent', 'failed', 'scheduled'];

console.log('Props:', props);

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
        onError: (response) => {
            console.error('Filter error:', response);
        },
        preserveScroll: true,
        preserveState: true,
    });
};

// Clear all filters
const clearFilters = () => {
    selectedFilter.value = 'all';
    searchQuery.value = '';

    router.get(route('user.emails'), {}, {
        onError: (response) => {
            console.error('Clear error:', response);
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

    const retryForm = useForm({
        id: email.id
    });
    console.log('send')
    console.log(email.patient_email)
    // if (confirm(`Retry sending email to ${email.patient_email}?`)) {
    retryForm.post(
        route('user.email.retry'),

        {
            onSuccess: () => {
                alert('Email retry initiated successfully');
            },
            onError: (errors) => {
                console.error('Retry error:', errors);
                alert('Failed to retry email');
            },
        }
    );
    // }
};

// Handle Enter key in search input
const handleSearchKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        applyFilters();
    }
};
</script>

<template>

    <Head title="Email Management" />

    <AuthenticatedLayout>
        <div class="h-full w-full bg-gray-100">
            <div class="overflow-y-scroll p-6">
                <!-- Header -->
                <div class="mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">
                        Patient Emails
                    </h1>
                    <p class="text-gray-600">
                        Monitor and manage all sent emails to patients
                    </p>
                </div>

                <!-- Filters & Search -->
                <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <!-- Filter Buttons -->
                    <div class="flex flex-wrap gap-2 sm:gap-3">
                        <button v-for="selection in selectionFilter" :key="selection" @click="applyFilters(selection)"
                            :class="selectedFilter === selection
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

                    <div class="flex gap-2 sm:gap-3 justify-between items-center w-full sm:w-auto">
                        <div class="relative flex-1 sm:flex-initial">
                            <input v-model="searchQuery" type="text" placeholder="Search by patient name..."
                                @keydown="handleSearchKeydown"
                                class="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-primaryDark md:w-80" />
                            <span class="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400">🔍</span>
                        </div>
                        <div class="flex gap-2 items-center">
                            <button @click="applyFilters()"
                                class="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-white transition-all bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg whitespace-nowrap">
                                Search
                            </button>
                            <button @click="clearFilters"
                                class="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-white transition-all bg-gray-600 rounded-lg hover:bg-gray-700 hover:shadow-lg whitespace-nowrap">
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Results Summary -->
                <div class="mb-4 text-sm text-gray-600">
                    <p>
                        Showing {{ emails.from || 0 }} to {{ emails.to || 0 }} of
                        {{ emails.total }} emails
                    </p>
                </div>

                <!-- Emails Table -->
                <div class="overflow-x-auto rounded-xl bg-white shadow-md">
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
                                <td class="px-4 py-3 font-medium text-gray-800">
                                    {{ email.patient.full_name }}
                                </td>
                                <td class="px-4 py-3 text-gray-700">
                                    {{ email.patient.email }}
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
                                        {{ email.status.replace('_', ' ') }}
                                    </span>
                                </td>
                                <td class="px-4 py-3">
                                    <div class="flex gap-2">
                                        <button @click="previewEmail = email"
                                            class="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-200">
                                            View
                                        </button>
                                        <button v-if="email.status === 'failed' || email.status === 'scheduled'"
                                            @click="retryEmail(email)"
                                            class="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 transition hover:bg-red-200">
                                            Retry
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
                <div v-if="emails.last_page > 1" class="mt-6 flex items-center justify-between">
                    <button @click="goToPage(emails.prev_page_url)" :disabled="!emails.prev_page_url"
                        class="rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed">
                        Previous
                    </button>

                    <span class="text-sm text-gray-600">
                        Page {{ emails.current_page }} of {{ emails.last_page }}
                    </span>

                    <button @click="goToPage(emails.next_page_url)" :disabled="!emails.next_page_url"
                        class="rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed">
                        Next
                    </button>
                </div>

                <!-- Preview Modal -->
                <div v-if="previewEmail"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    @click.self="previewEmail = null">
                    <div class="w-full max-w-4xl p-6 bg-white rounded-xl max-h-[90vh] overflow-y-auto">
                        <div class="mb-4 flex items-center justify-between">
                            <h3 class="text-2xl font-bold text-gray-800">
                                {{ previewEmail.subject }}
                            </h3>
                            <button @click="previewEmail = null"
                                class="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
                                Close
                            </button>
                        </div>
                        <div class="mb-4 text-sm text-gray-600 space-y-1">
                            <p>
                                <strong>To:</strong>
                                {{ previewEmail.patient.full_name }} ({{
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
                                    'bg-primaryDark text-white':
                                        previewEmail.status === 'scheduled',
                                }" class="font-semibold capitalize">
                                    {{ previewEmail.status.replace('_', ' ') }}
                                </span>
                            </p>
                        </div>
                        <div class="rounded-lg bg-gray-50 p-4 text-gray-700 mb-4">
                            <p class="whitespace-pre-wrap">
                                {{ previewEmail.message_preview }}
                            </p>
                        </div>

                        <!-- Attachments -->
                        <div v-if="
                            previewEmail.result &&
                            previewEmail.result.files &&
                            previewEmail.result.files.length > 0
                        " class="space-y-4">
                            <h4 class="text-lg font-semibold text-gray-800">
                                Attachments
                            </h4>
                            <div v-for="file in previewEmail.result.files" :key="file.id"
                                class="flex items-center justify-center p-8 bg-gray-100 rounded-lg">
                                <div v-if="
                                    file.file_type === 'image/png' ||
                                    file.file_type === 'image/jpg' ||
                                    file.file_type === 'image/jpeg'
                                " class="text-center w-full">
                                    <img :src="file.file_url" :alt="file.original_file_name"
                                        class="max-w-full max-h-96 mx-auto rounded-lg shadow" />
                                    <button @click="downloadResult(file)"
                                        class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                        Download Image
                                    </button>
                                </div>
                                <div v-else-if="
                                    file.file_type === 'application/pdf'
                                " class="text-center w-full">
                                    <iframe :src="file.file_url" class="w-full h-96 rounded-lg"></iframe>
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