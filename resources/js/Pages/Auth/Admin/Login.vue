<template>

    <Head title="Login" />
    <Toaster />
    <AdminAuthLayout>
        <div class="w-full overflow-hidden">
            <!-- Main content -->
            <div
                class="container relative z-10 mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8 sm:py-12">
                <div class="w-full max-w-md lg:max-w-lg space-y-4 sm:space-y-5">
                    <!-- Back Button -->
                    <div class="flex justify-start">
                        <Link href="/"
                            class="text-primaryDark hover:bg-primaryDark glass hover:shadow-primaryDark/30 inline-flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base lg:text-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white hover:shadow-lg">
                        <ArrowLeft class="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Back to Home</span>
                        </Link>
                    </div>

                    <!-- Login Card -->
                    <div class="rounded-lg bg-white shadow-xl">
                        <!-- Header -->
                        <div class="border-primaryDark bg-primaryDark space-y-1 rounded-t-lg border-b p-4 sm:p-6">
                            <h2 class="text-center text-xl sm:text-2xl font-bold text-white">
                                Admin
                            </h2>
                            <p class="text-center text-sm sm:text-base lg:text-lg text-white">
                                Enter your email address and password
                            </p>
                        </div>

                        <!-- Form -->
                        <div class="p-4 sm:p-6">
                            <form @submit.prevent="handleLogin" class="space-y-4 sm:space-y-5">
                                <!-- Email Field -->
                                <div class="space-y-2">
                                    <label for="login-email"
                                        class="block text-sm sm:text-base lg:text-lg font-extrabold text-gray-600">
                                        Email
                                    </label>
                                    <input id="login-email" v-model="loginForm.email" type="email"
                                        placeholder="Enter your email"
                                        class="focus:ring-primaryDark w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base transition-all focus:border-transparent focus:outline-none focus:ring-2"
                                        required />
                                    <p v-if="loginForm.errors.email" class="text-red-500 text-xs sm:text-sm mt-1">
                                        {{ loginForm.errors.email }}
                                    </p>
                                </div>

                                <!-- Password Field -->
                                <div class="space-y-2">
                                    <div
                                        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                                        <label for="login-password"
                                            class="block text-sm sm:text-base lg:text-lg font-extrabold text-gray-600">
                                            Password
                                        </label>
                                        <Link :href="route('admin.password.request')"
                                            class="text-xs sm:text-sm lg:text-base font-extrabold text-black transition-colors hover:text-primary/80">
                                        Forgot password?
                                        </Link>
                                    </div>
                                    <PasswordInput v-model="loginForm.password" />
                                    <p v-if="loginForm.errors.password" class="text-red-500 text-xs sm:text-sm mt-1">
                                        {{ loginForm.errors.password }}
                                    </p>
                                </div>

                                <!-- Submit Button -->
                                <button type="submit"
                                    class="bg-primaryDark hover:shadow-primaryDark/30 group w-full rounded-lg px-4 py-2.5 sm:py-3 font-extrabold text-sm sm:text-base lg:text-lg text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                                    :disabled="isLoading">
                                    <p
                                        class="group-hover:bg-primaryDark group-hover:bg-clip-text group-hover:text-transparent">
                                        {{
                                        isLoading ? 'Logging in...' : 'Log in'
                                        }}
                                    </p>
                                </button>
                            </form>

                            <!-- Sign Up Link -->
                            <div class="mt-4 sm:mt-6 text-center">
                                <p class="text-sm sm:text-base lg:text-lg font-bold text-gray-600">
                                    New here?
                                    <Link :href="route('admin.signup')"
                                        class="text-primaryDark hover:text-primaryDark/80 font-medium transition-colors">
                                    Sign up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminAuthLayout>
</template>

<script setup>
import { useToast } from '@/components/ui/toast';
import Toaster from '@/components/ui/toast/Toaster.vue';
import AdminAuthLayout from '@/Layouts/AdminAuthLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import { flattenError, z } from 'zod';
import PasswordInput from '@/Components/PasswordInput.vue';
import { ArrowLeft } from '@solar-icons/vue';

const isLoading = ref(false);
const { toast } = useToast();

const loginForm = useForm({
    email: '',
    password: '',
});

const loginSchema = z.object({
    email: z.string().email('Invalid email address').max(255),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const handleLogin = async () => {
    isLoading.value = true;

    const form = loginSchema.safeParse(loginForm.data());

    if (!form.success) {
        const errors = flattenError(form.error)?.fieldErrors;
        for (const field in errors) {
            const errorMessage = errors[field][0];
            toast({
                title: 'Validation Error',
                description: errorMessage,
                variant: 'destructive',
                duration: 5000,
            });
        }
        isLoading.value = false;
        return;
    }

    loginForm.post(route('admin.login'), {
        onFinish: () => {
            isLoading.value = false;
        },
        onError: (errors) => {
            // Display first error message
            const firstError = Object.values(errors)[0];
            if (firstError) {
                toast({
                    title: 'Login Failed',
                    description: firstError,
                    variant: 'destructive',
                    duration: 5000,
                });
            }
        },
        onSuccess: () => {
            toast({
                title: 'Login Successful',
                description: 'Welcome back!',
                variant: 'default',
                duration: 3000,
            });
        },
    });
};
</script>