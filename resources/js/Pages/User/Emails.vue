<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';

const page = usePage();
const base_url = page.props.ziggy.base_url;

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
    status: 'pending' | 'completed' | 'reviewed';
    files: file[];
}

interface PatientEmail {
    id: number;
    patient_result_id: string;
    patient_email: string;
    subject: string;
    sent_by: string;
    sent_at: string;
    status: 'sent' | 'failed' | 'in_progress';
    message_preview: string;
    delivery_attempts: number;
    patient: {
        full_name: string;
        email: string;
    };
    result: PatientResult
}

interface Props {
    emails?: PatientEmail[];
}

const props = defineProps<Props>();

console.log(props);

const selectedFilter = ref('all');
const searchQuery = ref('');
const previewEmail = ref<PatientEmail | null>(null);

const downloadResult = (file: file) => {
    window.open(file.file_url, '_blank');
};

// Search & Filter
const filteredEmails = computed(() => {
    let filtered = props.emails;

    if (selectedFilter.value !== 'all') {
        filtered = filtered?.filter((e) => e.status === selectedFilter.value);
    }

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered?.filter(
            (e) =>
                e.patient.full_name.toLowerCase().includes(query) ||
                e.patient_email.toLowerCase().includes(query) ||
                e.subject.toLowerCase().includes(query),
        );
    }

    return filtered;
});

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
const retryEmail = (patient: PatientEmail) => {
    alert(`Retrying email to ${patient.patient_email}...`);
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
                    <div class="flex gap-2">
                        <button @click="selectedFilter = 'all'" :class="selectedFilter === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700'
    " class="rounded-lg px-4 py-2 font-medium transition-colors">
                            All
                        </button>
                        <button @click="selectedFilter = 'in_progress'" :class="selectedFilter === 'in_progress'
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-200 text-gray-700'
    " class="rounded-lg px-4 py-2 font-medium transition-colors">
                            In Progress
                        </button>
                        <button @click="selectedFilter = 'sent'" :class="selectedFilter === 'sent'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                            " class="rounded-lg px-4 py-2 font-medium transition-colors">
                            Sent
                        </button>
                        <button @click="selectedFilter = 'failed'" :class="selectedFilter === 'failed'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                            " class="rounded-lg px-4 py-2 font-medium transition-colors">
                            Failed
                        </button>
                    </div>

                    <div class="relative">
                        <input v-model="searchQuery" type="text" placeholder="Search by patient, email, or subject..."
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 md:w-80" />
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400">🔍</span>
                    </div>
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
                            <tr v-for="email in filteredEmails" :key="email.id" class="hover:bg-gray-50">
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
                                            email.status === 'in_progress',
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
                                        <button v-if="email.status === 'failed'" @click="retryEmail(email)"
                                            class="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 transition hover:bg-red-200">
                                            Retry
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="filteredEmails?.length === 0">
                                <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                                    No emails found.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Preview Modal -->
                <div v-if="previewEmail"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
                        <div class="mb-4 text-sm text-gray-600">
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
                                {{ previewEmail.status }}
                            </p>
                        </div>
                        <div class="rounded-lg bg-gray-50 p-4 text-gray-700">
                            <p>{{ previewEmail.message_preview }}</p>
                        </div>

                        <div v-for="file in previewEmail.result.files" :key="file.id"
                            class="flex items-center justify-center p-8 my-2 bg-gray-100 rounded-lg">

                            <div v-if="file.file_type === 'image/png' || file.file_type === 'image/jpg' || file.file_type === 'image/jpeg'"
                                class="text-center">
                                <img :src="file.file_url" alt="Result preview" class="max-w-full max-h-96">
                                <button @click="downloadResult(file)"
                                    class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                    Download Image
                                </button>
                            </div>
                            <div v-else-if="file.file_type === 'application/pdf'" class="text-center w-full">
                                <iframe :src="file.file_url" frameborder="10" class="w-full h-96">

                                </iframe>
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
