<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const user = {
    id: 1,
    name: 'Clinikos',
    email: 'jclinikos@oodomedlink.com',
    avatar: '/assets/doctor.jpeg',
    phone_no: '+2348012345678',
    address: '24B Victoria Street, Ikeja',
    state: 'Lagos',
    country: 'Nigeria',
};

const form = useForm({
    name: user.name,
    email: user.email,
    avatar: {},
    password: '',
    phone_no: user.phone_no,
    address: user.address,
    state: user.state,
    country: user.country,
});

const avatarPreview = ref(user.avatar);

const handleAvatarChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        form.avatar = input.files[0];
        avatarPreview.value = URL.createObjectURL(input.files[0]);
    }
};

const submitForm = () => {
    form.post(route('clinic.settings.update'), {
        preserveScroll: true,
        onSuccess: () => {
            alert('Settings updated successfully!');
        },
    });
};
</script>

<template>
    <Head title="Settings" />

    <AuthenticatedLayout>
        <div class="min-h-screen w-full bg-gray-100">
            <div class="mx-auto max-w-5xl p-6">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-800">
                        Account Settings
                    </h1>
                    <p class="text-gray-600">
                        Manage your personal and clinic account details
                    </p>
                </div>

                <div class="grid gap-8 md:grid-cols-3">
                    <!-- Profile Card -->
                    <div class="rounded-2xl bg-white p-6 shadow-md">
                        <div class="flex flex-col items-center text-center">
                            <div class="shadow-4xl shadow-black">
                                <img
                                    :src="avatarPreview"
                                    alt="Profile Avatar"
                                    class="mb-4 h-28 w-28 rounded-full object-cover"
                                />
                            </div>
                            <h2 class="text-xl font-semibold text-gray-800">
                                {{ form.name }}
                            </h2>
                            <p class="text-sm text-gray-500">
                                {{ form.email }}
                            </p>

                            <div class="mt-4">
                                <label
                                    class="bg-deepgradient btn cursor-pointer rounded-lg text-xl font-extrabold text-white transition-all duration-150 hover:-translate-y-1"
                                >
                                    Change Avatar
                                    <input
                                        type="file"
                                        class="hidden"
                                        accept="image/*"
                                        @change="handleAvatarChange"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Settings Form -->
                    <div
                        class="rounded-2xl bg-white p-6 shadow-md md:col-span-2"
                    >
                        <form @submit.prevent="submitForm" class="space-y-5">
                            <div class="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label
                                        class="mb-1 block text-sm font-medium text-gray-700"
                                        >Full Name</label
                                    >
                                    <input
                                        v-model="form.name"
                                        type="text"
                                        class="focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="mb-1 block text-sm font-medium text-gray-700"
                                        >Email Address</label
                                    >
                                    <input
                                        v-model="form.email"
                                        type="email"
                                        class="focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                                    />
                                </div>
                            </div>

                            <div class="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label
                                        class="mb-1 block text-sm font-medium text-gray-700"
                                        >Phone Number</label
                                    >
                                    <input
                                        v-model="form.phone_no"
                                        type="tel"
                                        class="focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="mb-1 block text-sm font-medium text-gray-700"
                                        >Password</label
                                    >
                                    <input
                                        v-model="form.password"
                                        type="password"
                                        placeholder="••••••••"
                                        class="focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    class="mb-1 block text-sm font-medium text-gray-700"
                                    >Address</label
                                >
                                <input
                                    v-model="form.address"
                                    type="text"
                                    class="focusffset-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                                />
                            </div>

                            <div class="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label
                                        class="mb-1 block text-sm font-medium text-gray-700"
                                        >State</label
                                    >
                                    <input
                                        v-model="form.state"
                                        type="text"
                                        class="focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="mb-1 block text-sm font-medium text-gray-700"
                                        >Country</label
                                    >
                                    <input
                                        v-model="form.country"
                                        type="text"
                                        class="focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                                    />
                                </div>
                            </div>

                            <div class="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    class="bg-deepgradient rounded-lg px-6 py-2.5 font-semibold text-white shadow transition-all duration-150 hover:-translate-y-1 focus:ring-0 focus:ring-blue-300"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
