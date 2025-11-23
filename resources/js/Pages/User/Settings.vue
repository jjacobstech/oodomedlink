<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { useToast } from '@/components/ui/toast';

interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    phone_no?: string;
    address?: string;
    state?: string;
    country?: string;
}

interface Props {
    user: User;
}

const props = defineProps<Props>();
const { toast } = useToast();

const form = useForm({
    name: props.user.name,
    email: props.user.email,
    avatar: null as File | null,
    current_password: '',
    password: '',
    password_confirmation: '',
    phone_no: props.user.phone_no || '',
    address: props.user.address || '',
    state: props.user.state || '',
    country: props.user.country || '',
});

const avatarPreview = ref(props.user.avatar || '/assets/doctor.jpeg');
const showPasswordFields = ref(false);

const handleAvatarChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('File size must be less than 2MB');
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        form.avatar = file;
        avatarPreview.value = URL.createObjectURL(file);
    }
};

const submitForm = () => {
    form.post(route('user.profile.update'), {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
            form.reset('current_password', 'password', 'password_confirmation');
            showPasswordFields.value = false;

            toast({
                title: 'Profile Updated',
                description: 'Profile updated successfully',
                variant: 'default',
                open: true,
                class: 'text-primaryDark bg-white shadow-lg bottom-96',
            });
        },
        onError: (errors) => {
        // console.error('Update errors:', errors);
        },
    });
};

const hasPasswordData = computed(() => {
    return form.current_password || form.password || form.password_confirmation;
});
</script>

<template>

    <Head title="Settings" />

    <AuthenticatedLayout>
        <div class="min-h-screen w-full bg-primaryLight">
            <div class="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                <!-- Header -->
                <div class="mb-6 sm:mb-8">
                    <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">
                        Account Settings
                    </h1>
                    <p class="text-sm sm:text-base text-gray-600 mt-1">
                        Manage your personal and clinic account details
                    </p>
                </div>

                <div class="grid gap-6 lg:grid-cols-3 lg:gap-8">
                    <!-- Profile Card -->
                    <div class="rounded-2xl bg-white p-6 shadow-md lg:sticky lg:top-6 lg:self-start">
                        <div class="flex flex-col items-center text-center">
                            <div class="relative mb-4">
                                <img :src="avatarPreview" alt="Profile Avatar"
                                    class="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover border-4 border-gray-100 shadow-lg" />
                                <div v-if="form.processing"
                                    class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                    <span class="text-white text-xs">Uploading...</span>
                                </div>
                            </div>
                            <h2 class="text-lg sm:text-xl font-semibold text-gray-800 break-words max-w-full">
                                {{ form.name }}
                            </h2>
                            <p class="text-xs sm:text-sm text-gray-500 break-all max-w-full mt-1">
                                {{ form.email }}
                            </p>

                            <div class="mt-4 w-full">
                                <label
                                    class="bg-primaryDark cursor-pointer rounded-lg px-4 py-2.5 text-sm sm:text-base font-semibold text-white transition-all duration-150 hover:-translate-y-1 hover:shadow-lg inline-block w-full">
                                    Change Avatar
                                    <input type="file" class="hidden" accept="image/*" @change="handleAvatarChange" />
                                </label>
                                <p class="text-xs text-gray-500 mt-2">
                                    Max size: 2MB
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Settings Form -->
                    <div class="rounded-2xl bg-white p-4 sm:p-6 shadow-md lg:col-span-2">
                        <form @submit.prevent="submitForm" class="space-y-5">
                            <!-- Basic Information Section -->
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                                    Basic Information
                                </h3>
                                <div class="grid gap-4 sm:gap-5 md:grid-cols-2">
                                    <div class="md:col-span-2 lg:col-span-1">
                                        <label class="mb-1 block text-sm font-medium text-gray-700">
                                            Full Name *
                                        </label>
                                        <input v-model="form.name" type="text" required
                                            class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base" />
                                        <p v-if="form.errors.name" class="text-red-500 text-xs mt-1">
                                            {{ form.errors.name }}
                                        </p>
                                    </div>
                                    <div class="md:col-span-2 lg:col-span-1">
                                        <label class="mb-1 block text-sm font-medium text-gray-700">
                                            Email Address *
                                        </label>
                                        <input v-model="form.email" type="email" required
                                            class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base" />
                                        <p v-if="form.errors.email" class="text-red-500 text-xs mt-1">
                                            {{ form.errors.email }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- Contact Information Section -->
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                                    Contact Information
                                </h3>
                                <div class="space-y-4">
                                    <div>
                                        <label class="mb-1 block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <input v-model="form.phone_no" type="tel"
                                            class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base" />
                                        <p v-if="form.errors.phone_no" class="text-red-500 text-xs mt-1">
                                            {{ form.errors.phone_no }}
                                        </p>
                                    </div>
                                    <div>
                                        <label class="mb-1 block text-sm font-medium text-gray-700">
                                            Address
                                        </label>
                                        <input v-model="form.address" type="text"
                                            class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base" />
                                    </div>
                                    <div class="grid gap-4 sm:gap-5 sm:grid-cols-2">
                                        <div>
                                            <label class="mb-1 block text-sm font-medium text-gray-700">
                                                State
                                            </label>
                                            <input v-model="form.state" type="text"
                                                class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base" />
                                        </div>
                                        <div>
                                            <label class="mb-1 block text-sm font-medium text-gray-700">
                                                Country
                                            </label>
                                            <input v-model="form.country" type="text"
                                                class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Password Section -->
                            <div>
                                <div class="flex items-center justify-between mb-4 pb-2 border-b">
                                    <h3 class="text-lg font-semibold text-gray-800">
                                        Change Password
                                    </h3>
                                    <button type="button" @click="showPasswordFields = !showPasswordFields"
                                        class="text-sm text-primaryDark font-medium hover:underline">
                                        {{ showPasswordFields ? 'Hide' : 'Show' }}
                                    </button>
                                </div>

                                <div v-if="showPasswordFields" class="space-y-4">
                                    <div>
                                        <label class="mb-1 block text-sm font-medium text-gray-700">
                                            Current Password
                                        </label>
                                        <input v-model="form.current_password" type="password"
                                            placeholder="Enter current password"
                                            class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base" />
                                        <p v-if="form.errors.current_password" class="text-red-500 text-xs mt-1">
                                            {{ form.errors.current_password }}
                                        </p>
                                    </div>
                                    <div class="grid gap-4 sm:gap-5 sm:grid-cols-2">
                                        <div>
                                            <label class="mb-1 block text-sm font-medium text-gray-700">
                                                New Password
                                            </label>
                                            <input v-model="form.password" type="password"
                                                placeholder="Enter new password"
                                                class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base" />
                                            <p v-if="form.errors.password" class="text-red-500 text-xs mt-1">
                                                {{ form.errors.password }}
                                            </p>
                                        </div>
                                        <div>
                                            <label class="mb-1 block text-sm font-medium text-gray-700">
                                                Confirm Password
                                            </label>
                                            <input v-model="form.password_confirmation" type="password"
                                                placeholder="Confirm new password"
                                                class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base" />
                                        </div>
                                    </div>
                                    <p class="text-xs text-gray-500">
                                        Password must be at least 8 characters long
                                    </p>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <div class="pt-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
                                <button type="button" @click="form.reset()"
                                    class="w-full sm:w-auto rounded-lg px-6 py-2.5 font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 shadow transition-all duration-150 text-sm sm:text-base order-2 sm:order-1">
                                    Reset
                                </button>
                                <button type="submit" :disabled="form.processing"
                                    class="w-full sm:w-auto bg-primaryDark rounded-lg px-6 py-2.5 font-semibold text-white shadow transition-all duration-150 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-sm sm:text-base order-1 sm:order-2">
                                    {{ form.processing ? 'Saving...' : 'Save Changes' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>