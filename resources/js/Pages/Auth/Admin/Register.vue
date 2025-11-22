<template>

    <Head title="signup" />
    <div :class="currentStep !== 3 ? 'block' : 'hidden'">
        <AdminAuthLayout>
            <Toaster />
            <div class="flex h-screen items-center justify-center overflow-y-hidden">
                <!-- Main content -->

                <div class="max-w-lg items-center justify-center rounded-xl bg-white shadow-xl">
                    <div class="bg-primaryDark grid space-y-1 rounded-t-lg p-6">
                        <h2 class="text-center text-2xl font-bold text-white">
                            Complete Registration
                        </h2>
                        <p class="text-center text-white">
                            Create an account - Step {{ currentStep }} of 3
                        </p>
                    </div>

                    <!-- Progress Indicator -->
                    <div class="flex justify-center py-6">
                        <div class="px-auto flex items-center justify-between">
                            <div v-for="step in 3" :key="step" class="flex-1">
                                <div class="flex items-center">
                                    <div :class="[
                                        'flex h-8 w-8 items-center justify-center rounded-full text-lg font-extrabold transition-all',
                                        currentStep >= step
                                            ? 'bg-primaryDark text-white'
                                            : 'bg-gray-200 text-gray-500',
                                    ]">
                                        {{ step }}
                                    </div>
                                    <div v-if="step < 3" :class="[
                                        'mx-2 h-1 w-20 flex-1 transition-all',
                                        currentStep > step
                                            ? 'bg-primaryDark'
                                            : 'bg-gray-200',
                                    ]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4 p-6">
                        <!-- Step 1: Email Verification -->
                        <form v-if="currentStep === 1" @submit.prevent="handleEmailSubmit" class="space-y-4">
                            <div class="space-y-2">
                                <label for="email" class="text-lg font-extrabold">Email Address</label>
                                <input id="email" type="email" placeholder="Enter your email" autocomplete="email"
                                    autofocus v-model="emailForm.email"
                                    class="focus:ring-primaryDark w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2" />
                            </div>
                            <button type="submit"
                                class="bg-primaryDark hover:shadow-primaryDark/30 w-full rounded-lg px-4 py-2.5 font-extrabold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                                :disabled="isLoading">
                                {{
                                    isLoading
                                        ? 'Sending OTP...'
                                : 'Send Verification Code'
                                }}
                            </button>

                            <div class="mt-6 text-center">
                                <p class="text-lg text-gray-600">
                                    Already have an account?
                                    <Link :href="route('admin.login')"
                                        class="text-primaryDark hover:text-primaryDark/80 font-extrabold transition-colors">
                                    Login
                                    </Link>
                                </p>
                            </div>
                        </form>

                        <!-- Step 2: OTP Verification -->
                        <form v-if="currentStep === 2" @submit.prevent="handleOtpSubmit" class="space-y-4">
                            <div class="space-y-2">
                                <label for="otp" class="text-lg font-extrabold">Verification Code</label>
                                <p class="mb-2 text-xs text-gray-500">
                                    Enter the 6-digit code sent to
                                    {{ emailForm.email }}
                                </p>
                                <input id="otp" type="text" placeholder="Enter 6-digit code" maxlength="6"
                                    v-model="otpForm.otp"
                                    class="focus:ring-primaryDark w-full rounded-md border border-gray-300 px-3 py-2 text-center text-2xl tracking-widest focus:outline-none focus:ring-2" />
                            </div>

                            <button type="submit"
                                class="bg-primaryDark hover:shadow-primaryDark/30 w-full rounded-lg px-4 py-2.5 font-extrabold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                                :disabled="isLoading">
                                {{ isLoading ? 'Verifying...' : 'Verify Code' }}
                            </button>

                            <div class="mt-4 text-center">
                                <button type="button" @click="resendOtp"
                                    class="text-primaryDark hover:text-primaryDark/80 text-lg transition-colors"
                                    :disabled="isLoading">
                                    Resend Code
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </AdminAuthLayout>
    </div>
    <!-- Step 3: Biodata Form -->
    <div v-if="currentStep === 3"
        class="flex min-h-screen w-full justify-center overflow-y-auto bg-primaryLight pb-20 pt-6 sm:pt-10">
        <div
            class="mx-4 my-auto h-fit w-full max-w-sm rounded-xl bg-white shadow-lg sm:mx-6 sm:max-w-md md:max-w-lg lg:mx-8 lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl">
            <div class="grid space-y-1 rounded-t-xl bg-primaryDark px-4 py-4 sm:py-5">
                <h2 class="text-center text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                    Complete Registration
                </h2>
                <p class="text-center text-sm text-white sm:text-base lg:text-lg">
                    Create an account - Step {{ currentStep }} of 3
                </p>
            </div>

            <form @submit.prevent="handleSignup" class="space-y-3 p-4 sm:space-y-4 sm:p-6 lg:p-8">
                <div class="space-y-1.5 sm:space-y-2" v-for="field in biodataFields" :key="field.id">
                    <label :for="field.id" class="block text-sm font-medium text-gray-700 sm:text-base lg:text-lg">
                        {{ field.name }}
                    </label>
                    <input v-if="field.type !== 'password'" :id="field.id" :type="field.type"
                        :placeholder="field.placeholder" :autocomplete="field.autocomplete"
                        v-model="signupForm[field.model]"
                        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primaryDark sm:py-2.5 sm:text-base" />
                    <PasswordInput v-else :id="field.id" :placeholder="field.placeholder"
                        v-model="signupForm[field.model]" />
                </div>
                <button type="submit"
                    class="mt-6 w-full rounded-lg bg-primaryDark px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:text-primaryDark hover:shadow-lg hover:shadow-primaryDark/30 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3 sm:text-base lg:text-lg"
                    :disabled="isLoading">
                    {{ isLoading ? 'Signing up...' : 'Complete Registration' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import PasswordInput from '@/Components/PasswordInput.vue';
import AdminAuthLayout from '@/Layouts/AdminAuthLayout.vue';
import { useToast } from '@/components/ui/toast';
import Toaster from '@/components/ui/toast/Toaster.vue';
import { Head, Link, useForm, router as useRouter } from '@inertiajs/vue3';
import { ref } from 'vue';
import { flattenError, z } from 'zod';

const router = useRouter;
const isLoading = ref(false);
const currentStep = ref(1);
const { toast } = useToast();
const newEmail = sessionStorage.getItem('email');

// Email form for step 1
const emailForm = useForm({
    email: '',
});

// OTP form for step 2
const otpForm = useForm({
    otp: '',
    email: '',
});

// Biodata fields for step 3
const biodataFields = ref([
    {
        id: 'name',
        name: 'Name',
        placeholder: 'Enter your name',
        type: 'text',
        required: true,
        autocomplete: 'organization',
        model: 'name',
    },
    {
        id: 'phone_no',
        name: 'Phone Number',
        placeholder: 'Enter your phone number',
        type: 'tel',
        required: true,
        autocomplete: 'tel',
        model: 'phone_no',
    },
    {
        id: 'password',
        name: 'Password',
        placeholder: 'Create a password',
        type: 'password',
        required: true,
        autocomplete: 'new-password',
        model: 'password',
    },
    {
        id: 'password_confirmation',
        name: 'Confirm Password',
        placeholder: 'Confirm your password',
        type: 'password',
        required: true,
        autocomplete: 'new-password',
        model: 'password_confirmation',
    },
]);

// Main signup form
const signupForm = useForm({
    email: '',
    name: '',
    phone_no: '',
    password: '',
    password_confirmation: '',
});

// Validation schemas
const emailSchema = z.object({
    email: z.email('Invalid email address').min(1, 'Email is required'),
});

const otpSchema = z.object({
    otp: z.string().length(6, 'OTP must be 6 digits'),
    email: z.email('Invalid email address'),
});

const signupSchema = z
    .object({
        name: z.string().min(1, 'Clinic name is required'),
        email: z.email('Invalid email address'),
        phone_no: z.string().min(1, 'Phone number is required'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        password_confirmation: z
            .string()
            .min(6, 'Password confirmation is required'),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ['password_confirmation'],
    });

emailForm.email = newEmail;

// Step 1: Handle email submission
const handleEmailSubmit = async () => {
    isLoading.value = true;
    sessionStorage.clear();

    const validation = emailSchema.safeParse(emailForm);

    if (!validation.success) {
        const error = validation.error.errors[0];
        toast({
            title: 'Validation Error',
            description: error.message,
            variant: 'destructive',
            class: 'text-primaryDark bg-white shadow-lg',
        });
        isLoading.value = false;
        return;
    }

    try {
        // Send OTP request to backend
        emailForm.post(route('admin.send.otp'), {
            onSuccess: (response) => {
                toast({
                    title: 'Verification Code Sent',
                    description:
                        'Please check your email for the verification code',
                    class: 'text-primaryDark bg-white shadow-lg',
                });
                currentStep.value = 2;

                otpForm.email = emailForm.email;
            },
            onError: (error) => {
                toast({
                    title: 'Error',
                    description:
                        error.email || 'Failed to send verification code',
                    variant: 'destructive',
                    class: 'text-primaryDark bg-white shadow-lg',
                });
                isLoading.value = false;
            },
        });
    } catch (error) {
        console.error(error);
    }

    isLoading.value = false;
};

// Step 2: Handle OTP verification
const handleOtpSubmit = async () => {
    console.log(otpForm.email);
    isLoading.value = true;
    const validation = otpSchema.safeParse(otpForm);

    if (!validation.success) {
        for (const error in flattenError(validation.error)?.fieldErrors) {
            // console.log(flattenError(form.error)?.fieldErrors[error][0])
            const inputError = flattenError(validation.error)?.fieldErrors[
                error
            ][0];
            toast({
                title: 'Validation Error',
                description: inputError,
                variant: 'destructive',
                class: 'text-primaryDark bg-white shadow-lg',
            });
        }

        isLoading.value = false;
        return;
    }

    try {
        // Verify OTP with backend
        otpForm.post(route('admin.verify.otp'), {
            onSuccess: (response) => {
                toast({
                    title: 'Email Verified',
                    description: 'Please complete your registration',
                    class: 'text-primaryDark bg-white shadow-lg',
                });

                signupForm.email = otpForm.email;

                currentStep.value = 3;
            },
            onError: (error) => {
                toast({
                    title: 'Verification Failed',
                    description: error.otp || 'Invalid verification code',
                    variant: 'destructive',
                    class: 'text-primaryDark bg-white shadow-lg',
                });
                console.log(error);
            },
        });
    } catch (error) {
        console.error(error);
    }

    isLoading.value = false;
};

// Resend OTP
const resendOtp = async () => {
    isLoading.value = true;
    console.log(otpForm.email);
    try {
        emailForm.post(route('admin.send-otp'), {
            onSuccess: () => {
                toast({
                    title: 'Code Resent',
                    description:
                        'A new verification code has been sent to your email',
                    class: 'text-primaryDark bg-white shadow-lg',
                });
            },
            onError: () => {
                toast({
                    title: 'Error',
                    description: 'Failed to resend verification code',
                    variant: 'destructive',
                    class: 'text-primaryDark bg-white shadow-lg',
                });
            },
        });
    } catch (error) {
        console.error(error);
    }

    isLoading.value = false;
};

// Step 3: Handle final signup
const handleSignup = async () => {
    isLoading.value = true;
    console.log(signupForm.email);
    const validation = signupSchema.safeParse(signupForm);

    if (!validation.success) {
        const errors = validation.error.flatten().fieldErrors;
        for (const field in errors) {
            toast({
                title: 'Validation Error',
                description: errors[field][0],
                variant: 'destructive',
                class: 'text-primaryDark bg-white shadow-lg',
            });
            break;
        }
        isLoading.value = false;
        return;
    }

    try {
        signupForm.post(route('admin.signup'), {
            onError: (error) => {
                for (const err in error) {
                    toast({
                        title: 'Registration Failed',
                        description: error[err],
                        variant: 'destructive',
                        class: 'text-primaryDark bg-white shadow-lg',
                    });
                    break;
                }
            },
            onSuccess: () => {
                toast({
                    title: 'Registration Successful',
                    description: 'Welcome! Redirecting to dashboard...',
                    class: 'text-primaryDark bg-white shadow-lg',
                });
                setTimeout(() => {
                    router.push(route('admin.dashoard'));
                }, 500);
            },
        });
    } catch (error) {
        console.error(error);
    }

    isLoading.value = false;
};
</script>
