<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { computed, ref } from 'vue';

interface PatientEmail {
    id: number;
    patient_name: string;
    email: string;
    subject: string;
    sent_at: string;
    status: 'sent' | 'failed' | 'in_progress';
    message_preview: string;
}

interface Props {
    emails?: PatientEmail[];
}

const props = defineProps<Props>();

const selectedFilter = ref('all');
const searchQuery = ref('');
const previewEmail = ref<PatientEmail | null>(null);

const mockEmails: PatientEmail[] = props.emails || [
    {
        id: 1,
        patient_name: 'John Doe',
        email: 'john.doe@example.com',
        subject: 'Blood Test Results',
        sent_at: '2025-11-05T09:30:00',
        status: 'sent',
        message_preview: 'Your blood test results are now available...',
    },
    {
        id: 2,
        patient_name: 'Jane Smith',
        email: 'jane.smith@example.com',
        subject: 'X-Ray Review Pending',
        sent_at: '2025-11-05T10:15:00',
        status: 'in_progress',
        message_preview: 'Your X-Ray report is currently under review...',
    },
    {
        id: 3,
        patient_name: 'Mike Johnson',
        email: 'mike.j@example.com',
        subject: 'Lab Analysis Error',
        sent_at: '2025-11-04T13:45:00',
        status: 'failed',
        message_preview: 'We encountered an issue sending your lab results...',
    },
];

// Search & Filter
const filteredEmails = computed(() => {
    let filtered = mockEmails;

    if (selectedFilter.value !== 'all') {
        filtered = filtered.filter((e) => e.status === selectedFilter.value);
    }

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
            (e) =>
                e.patient_name.toLowerCase().includes(query) ||
                e.email.toLowerCase().includes(query) ||
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
const retryEmail = (email: PatientEmail) => {
    alert(`Retrying email to ${email.patient_name}...`);
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
                            @click="selectedFilter = 'in_progress'"
                            :class="
                                selectedFilter === 'in_progress'
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-gray-200 text-gray-700'
                            "
                            class="rounded-lg px-4 py-2 font-medium transition-colors"
                        >
                            In Progress
                        </button>
                        <button
                            @click="selectedFilter = 'sent'"
                            :class="
                                selectedFilter === 'sent'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-200 text-gray-700'
                            "
                            class="rounded-lg px-4 py-2 font-medium transition-colors"
                        >
                            Sent
                        </button>
                        <button
                            @click="selectedFilter = 'failed'"
                            :class="
                                selectedFilter === 'failed'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-200 text-gray-700'
                            "
                            class="rounded-lg px-4 py-2 font-medium transition-colors"
                        >
                            Failed
                        </button>
                    </div>

                    <div class="relative">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search by patient, email, or subject..."
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 md:w-80"
                        />
                        <span
                            class="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                            >🔍</span
                        >
                    </div>
                </div>

                <!-- Emails Table -->
                <div class="overflow-x-auto rounded-xl bg-white shadow-md">
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
                                >
                                    Patient
                                </th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
                                >
                                    Email
                                </th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
                                >
                                    Subject
                                </th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
                                >
                                    Sent At
                                </th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
                                >
                                    Status
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
                                v-for="email in filteredEmails"
                                :key="email.id"
                                class="hover:bg-gray-50"
                            >
                                <td class="px-4 py-3 font-medium text-gray-800">
                                    {{ email.patient_name }}
                                </td>
                                <td class="px-4 py-3 text-gray-700">
                                    {{ email.email }}
                                </td>
                                <td
                                    class="max-w-[200px] truncate px-4 py-3 text-gray-700"
                                >
                                    {{ email.subject }}
                                </td>
                                <td class="px-4 py-3 text-gray-600">
                                    {{ formatDate(email.sent_at) }}
                                </td>
                                <td class="px-4 py-3">
                                    <span
                                        :class="{
                                            'bg-green-100 text-green-800':
                                                email.status === 'sent',
                                            'bg-red-100 text-red-800':
                                                email.status === 'failed',
                                            'bg-orange-100 text-orange-800':
                                                email.status === 'in_progress',
                                        }"
                                        class="rounded-full px-3 py-1 text-xs font-semibold capitalize"
                                    >
                                        {{ email.status.replace('_', ' ') }}
                                    </span>
                                </td>
                                <td class="px-4 py-3">
                                    <div class="flex gap-2">
                                        <button
                                            @click="previewEmail = email"
                                            class="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-200"
                                        >
                                            View
                                        </button>
                                        <button
                                            v-if="email.status === 'failed'"
                                            @click="retryEmail(email)"
                                            class="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 transition hover:bg-red-200"
                                        >
                                            Retry
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="filteredEmails.length === 0">
                                <td
                                    colspan="6"
                                    class="px-4 py-8 text-center text-gray-500"
                                >
                                    No emails found.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Preview Modal -->
                <div
                    v-if="previewEmail"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <div class="w-full max-w-2xl rounded-xl bg-white p-6">
                        <div class="mb-4 flex items-center justify-between">
                            <h3 class="text-2xl font-bold text-gray-800">
                                {{ previewEmail.subject }}
                            </h3>
                            <button
                                @click="previewEmail = null"
                                class="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                        <div class="mb-4 text-sm text-gray-600">
                            <p>
                                <strong>To:</strong>
                                {{ previewEmail.patient_name }} ({{
                                    previewEmail.email
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
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
