<template>

    <Head title="Login" />
    <AuthLayout>
        <div class="flex w-full justify-center overflow-hidden">
            <!-- Toast -->
            <Toaster />

            <!-- Main content -->
            <div
                class="container relative z-10 mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center py-12 lg:max-w-2xl">
                <div class="w-full space-y-4 px-5 lg:px-5">
                    <!-- Back Button -->
                    <div class="flex justify-start">
                        <Link href="/"
                            class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xl text-primaryDark transition-all duration-200 hover:-translate-y-0.5 hover:bg-primaryDark hover:text-white hover:shadow-lg hover:shadow-primaryDark/30">
                        <ArrowLeft class="h-4 w-4" />
                        <span>Back to Home</span>
                        </Link>
                    </div>

                    <!-- Login Card -->
                    <div class="rounded-lg bg-white shadow-xl">
                        <!-- Header -->
                        <div class="space-y-1 rounded-t-lg border-b border-primaryDark bg-primaryDark p-6">
                            <h2 class="text-center text-2xl font-bold text-white">
                                Login
                            </h2>
                            <p class="text-center text-lg text-white">
                                Enter your email address and password
                            </p>
                        </div>

                        <!-- Form -->
                        <div class="p-6">
                            <form @submit.prevent="handleLogin" class="space-y-5">
                                <!-- Email Field -->
                                <div class="space-y-2">
                                    <label for="login-email" class="block font-medium text-gray-600 lg:text-xl">
                                        Email
                                    </label>
                                    <input id="login-email" v-model="loginForm.email" type="email"
                                        placeholder="Enter your email"
                                        class="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primaryDark lg:text-xl"
                                        required />
                                </div>

                                <!-- Password Field -->
                                <div class="space-y-2">
                                    <div class="flex items-center justify-between">
                                        <label for="login-password" class="block font-medium text-gray-600 lg:text-xl">
                                            Password
                                        </label>
                                        <Link :href="route('password.request')"
                                            class="text-black transition-colors hover:text-primary/80 lg:text-xl">
                                        Forgot password?
                                        </Link>
                                    </div>
                                    <PasswordInput :placeholder="'Password'" v-model="loginForm.password" />
                                </div>

                                <!-- Submit Button -->
                                <button type="submit"
                                    class="group w-full rounded-lg bg-primaryDark px-4 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-primaryDark/30 disabled:cursor-not-allowed disabled:opacity-50"
                                    :disabled="isLoading">
                                    <p
                                        class="group-hover:bg-primaryDark group-hover:bg-clip-text group-hover:text-transparent lg:text-xl">
                                        {{
                                            isLoading
                                                ? 'Logging in...'
                                                : 'Log in'
                                        }}
                                    </p>
                                </button>
                            </form>

                            <!-- Sign Up Link -->
                            <div class="mt-6 text-center">
                                <p class="text-gray-600 lg:text-xl">
                                    New here?
                                    <Link :href="route('signup')"
                                        class="font-medium text-primaryDark transition-colors hover:text-primaryDark/80">
                                    Sign up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthLayout>
</template>
<script setup>
import PasswordInput from '@/Components/PasswordInput.vue';
import { useToast } from '@/components/ui/toast';
import Toaster from '@/components/ui/toast/Toaster.vue';
import AuthLayout from '@/Layouts/AuthLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft } from 'lucide-vue-next';
import { ref } from 'vue';
import { flattenError, z } from 'zod';

const isLoading = ref(false);
const { toast } = useToast();

const loginForm = useForm({
    email: '',
    password: '',
});

const loginSchema = z.object({
    email: z.email('Invalid email address').max(255),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const handleLogin = async () => {
    isLoading.value = true;

    const form = loginSchema.safeParse(loginForm);

    if (form.error) {
        for (const error in flattenError(form.error)?.fieldErrors) {
            const inputError = flattenError(form.error)?.fieldErrors[error][0];
            toast({
                title: 'Login failed',
                description: inputError,
                variant: 'destructive',
                open: true,
                class: 'text-primaryDark bg-white shadow-lg bottom-96',
            });
        }
        isLoading.value = false;
        return;
    }

    loginForm.post(route('login'), {
        onFinish: () => {
            isLoading.value = false;
        },
        onError: (error) => {
            for (const err in error) {
                const inputError = error[err];
                toast({
                    title: 'Login failed',
                    description: inputError,
                    variant: 'destructive',
                    open: true,
                    class: 'text-primaryDark bg-white shadow-lg bottom-96',
                });
            }
        },
        onSuccess: (page) => {
            toast({
                title: 'Login Successful',
                variant: 'destructive',
                open: true,
                class: 'text-primaryDark bg-white shadow-lg bottom-96',
            });
        },
    });
};
</script>
