<template>

    <Head title="Login" />
    <Toaster />
    <AdminAuthLayout>
        <div class="w-full overflow-hidden">
            <!-- Toast -->

            <!-- Main content -->
            <div
                class="container relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-3xl items-center justify-center px-4 py-12">
                <div class="w-full space-y-5 px-40 py-10">

                    <div class="flex justify-start">
                        <Link href="/"
                            class="text-primaryDark hover:bg-primaryDark glass hover:shadow-primaryDark/30 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white hover:shadow-lg">
                        <ArrowLeft class="h-4 w-4" />
                        <span>Back to Home</span>
                        </Link>
                    </div>

                    <!-- Login Card -->
                    <div class="rounded-lg bg-white shadow-xl">
                        <!-- Header -->
                        <div class="border-primaryDark bg-primaryDark space-y-1 rounded-t-lg border-b p-6">
                            <h2 class="text-center text-2xl font-bold text-white">
                                Admin
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
                                    <label for="login-email" class="block text-lg font-extrabold text-gray-600">
                                        Email
                                    </label>
                                    <input id="login-email" v-model="loginForm.email" type="email"
                                        placeholder="Enter your email"
                                        class="focus:ring-primaryDark w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all focus:border-transparent focus:outline-none focus:ring-2"
                                        required />
                                </div>

                                <!-- Password Field -->
                                <div class="space-y-2">
                                    <div class="flex items-center justify-between">
                                        <label for="login-password" class="block text-lg font-extrabold text-gray-600">
                                            Password
                                        </label>
                                        <Link :href="route('admin.password.request')
                                            "
                                            class="text-lg font-extrabold text-black transition-colors hover:text-primary/80">
                                        Forgot password?
                                        </Link>
                                    </div>
                                    <PasswordInput v-model="loginForm.password" />
                                </div>

                                <!-- Submit Button -->
                                <button type="submit"
                                    class="bg-primaryDark hover:shadow-primaryDark/30 group w-full rounded-lg px-4 py-2.5 font-extrabold text-lg text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                                    :disabled="isLoading">
                                    <p
                                        class="group-hover:bg-primaryDark group-hover:bg-clip-text group-hover:text-transparent">
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
                                <p class="text-lg font-bold text-gray-600">
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
    email: z.email('Invalid email address').max(255),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const handleLogin = async () => {
    isLoading.value = true;

    const form = loginSchema.safeParse(loginForm);

    if (form.error) {
        for (const error in flattenError(form.error)?.fieldErrors) {
            // console.log(flattenError(form.error)?.fieldErrors[error][0])
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

    loginForm.post(route('admin.login'), {
        onFinish: () => {
            isLoading.value = false;
        },
        onError: (error) => {
            console.log(error[0]);
            for (const err in error) {
                console.log(error[err]);
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
            console.log('Login Success - Page:', page); // See what page is returned
            console.log('Current URL:', window.location.href);
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
