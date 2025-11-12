<template>

    <Head title="Login" />
    <Toaster />
    <AdminAuthLayout>

        <div class="w-full overflow-hidden">
            <!-- Toast -->

            <!-- Main content -->
            <div
                class="relative z-10 max-w-3xl container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
                <div class="w-full px-40 space-y-10">
                    <div class="w-full flex justify-center my-5">
                        <!-- <ApplicationLogo /> -->

                    </div>

                    Back Button
                    <div class="flex justify-start">
                        <Link href="/"
                            class="inline-flex items-center gap-2 px-4 py-2 text-sm text-deepgreen  rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:bg-deepgradient hover:text-white hover:shadow-deepgreen/30">
                        <ArrowLeft class="w-4 h-4" />
                        <span>Back to Home</span>
                        </Link>
                    </div>

                    <!-- Login Card -->
                    <div class="bg-white rounded-lg shadow-xl">
                        <!-- Header -->
                        <div class="p-6 space-y-1 border-b rounded-t-lg border-deepgradient bg-deepgradient">
                            <h2 class="text-2xl font-bold text-center text-white">Admin</h2>
                            <p class="text-center text-sm text-white">
                                Enter your email address and password
                            </p>
                        </div>

                        <!-- Form -->
                        <div class="p-6">
                            <form @submit.prevent="handleLogin" class="space-y-5">
                                <!-- Email Field -->
                                <div class="space-y-2">
                                    <label for="login-email" class="block text-sm font-medium text-gray-600">
                                        Email
                                    </label>
                                    <input id="login-email" v-model="loginForm.email" type="email"
                                        placeholder="Enter your email"
                                        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepgreen focus:border-transparent transition-all"
                                        required />
                                </div>

                                <!-- Password Field -->
                                <div class="space-y-2">
                                    <div class="flex items-center justify-between">
                                        <label for="login-password" class="block text-sm font-medium text-gray-600">
                                            Password
                                        </label>
                                        <Link :href="route('admin.password.request')"
                                            class="text-sm text-black hover:text-primary/80 transition-colors">
                                        Forgot password?
                                        </Link>
                                    </div>
                                    <PasswordInput v-model="loginForm.password" />
                                </div>

                                <!-- Submit Button -->
                                <button type="submit" class="w-full px-4 py-2.5 bg-deepgreen text-white font-medium rounded-lg group hover:bg-white
           disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
           hover:shadow-lg hover:-translate-y-1 hover:shadow-deepgreen/30" :disabled="isLoading">

                                    <p
                                        class="group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-deepgradient">
                                        {{ isLoading ? 'Logging in...' : 'Log in' }}
                                    </p>
                                </button>
                            </form>

                            <!-- Sign Up Link -->
                            <div class="mt-6 text-center">
                                <p class="text-sm text-gray-600">
                                    New here?
                                    <Link :href="route('admin.signup')"
                                        class="text-deepgreen font-medium hover:text-deepgreen/80 transition-colors">
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
import { ref } from 'vue';
import { useForm, Link } from '@inertiajs/vue3';
import { z, flattenError } from 'zod';
import { Head } from '@inertiajs/vue3';
import Toaster from '@/components/ui/toast/Toaster.vue';
import { useToast } from '@/components/ui/toast';
import AdminAuthLayout from '@/Layouts/AdminAuthLayout.vue';

import PasswordInput from '@/Components/PasswordInput.vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';

const isLoading = ref(false);
const { toast } = useToast();


const loginForm = useForm({
    email: '',
    password: ''
});


const loginSchema = z.object({
    email: z.email('Invalid email address').max(255),
    password: z.string().min(6, 'Password must be at least 6 characters')
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
                class: 'text-deepblue bg-white shadow-lg bottom-96',
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
            console.log(error[0])
            for (const err in error) {
                console.log(error[err])
                const inputError = error[err];
                toast({
                    title: 'Login failed',
                    description: inputError,
                    variant: 'destructive',
                    open: true,
                    class: 'text-deepblue bg-white shadow-lg bottom-96',
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
                class: 'text-deepblue bg-white shadow-lg bottom-96',
            });

        }
    });

};

</script>