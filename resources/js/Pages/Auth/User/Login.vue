<template>

    <Head title="Login" />
    <AuthLayout>
        <div class="w-full flex justify-center overflow-hidden">
            <!-- Toast -->
            <Toaster />

            <!-- Main content -->
            <div
                class="relative z-10  container mx-auto lg:max-w-xl py-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
                <div class="w-full px-5 lg:px-20 space-y-4">


                    <!-- Back Button -->
                    <div class="flex justify-start">
                        <Link href="/"
                            class="inline-flex items-center gap-2 text-xl  px-4 py-2 text-primaryDark  rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:bg-primaryDark hover:text-white hover:shadow-primaryDark/30">
                        <ArrowLeft class="w-4 h-4" />
                        <span>Back to Home</span>
                        </Link>
                    </div>

                    <!-- Login Card -->
                    <div class="bg-white rounded-lg shadow-xl">
                        <!-- Header -->
                        <div class="p-6 space-y-1 border-b rounded-t-lg border-primaryDark bg-primaryDark">
                            <h2 class="text-2xl font-bold text-center text-white">Login</h2>
                            <p class="text-center text-lg text-white">
                                Enter your email address and password
                            </p>
                        </div>

                        <!-- Form -->
                        <div class="p-6">
                            <form @submit.prevent="handleLogin" class="space-y-5">
                                <!-- Email Field -->
                                <div class="space-y-2">
                                    <label for="login-email" class="block text-xl font-medium text-gray-600">
                                        Email
                                    </label>
                                    <input id="login-email" v-model="loginForm.email" type="email"
                                        placeholder="Enter your email"
                                        class="w-full px-4 py-2.5 border border-gray-300 text-xl  rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryDark focus:border-transparent transition-all"
                                        required />
                                </div>

                                <!-- Password Field -->
                                <div class="space-y-2">
                                    <div class="flex items-center justify-between">
                                        <label for="login-password" class="block text-xl font-medium text-gray-600">
                                            Password
                                        </label>
                                        <Link :href="route('password.request')"
                                            class="text-xl text-black hover:text-primary/80 transition-colors">
                                        Forgot password?
                                        </Link>
                                    </div>
                                    <PasswordInput :placeholder="'Password'" v-model="loginForm.password" />
                                </div>

                                <!-- Submit Button -->
                                <button type="submit" class="w-full px-4 py-2.5 bg-primaryDark text-white font-medium rounded-lg group hover:bg-white
           disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
           hover:shadow-lg hover:-translate-y-1 hover:shadow-primaryDark/30" :disabled="isLoading">

                                    <p
                                        class="group-hover:bg-clip-text text-xl  group-hover:text-transparent group-hover:bg-primaryDark">
                                        {{ isLoading ? 'Logging in...' : 'Log in' }}
                                    </p>
                                </button>
                            </form>

                            <!-- Sign Up Link -->
                            <div class="mt-6 text-center">
                                <p class="text-xl text-gray-600">
                                    New here?
                                    <Link :href="route('signup')"
                                        class="text-primaryDark font-medium hover:text-primaryDark/80 transition-colors">
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
import { ref } from 'vue';
import { useForm, Link } from '@inertiajs/vue3';
import { z, flattenError } from 'zod';
import { Head } from '@inertiajs/vue3';
import Toaster from '@/components/ui/toast/Toaster.vue';
import { useToast } from '@/components/ui/toast';
import { ArrowLeft, EyeClosedIcon } from 'lucide-vue-next';
import AuthLayout from '@/Layouts/AuthLayout.vue';
import PasswordInput from '@/Components/PasswordInput.vue';

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
            console.log(error[0])
            for (const err in error) {
                console.log(error[err])
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

        }
    });

};

</script>