<template>

    <Head title="Password Reset" />
    <AdminAuthLayout>
        <Toaster />
        <div class="flex h-screen items-center justify-center overflow-y-hidden">
            <!-- Main content -->

            <div class="max-w-lg items-center justify-center rounded-xl bg-white shadow-xl">
                <div class="bg-primaryDark grid space-y-1 rounded-t-lg p-6">
                    <h2 class="text-center text-2xl font-bold text-white">
                        Reset Password
                    </h2>
                </div>

                <div class="space-y-4 p-6">
                    <!-- Step 1: Email Verification -->
                    <form v-if="currentStep === 1" @submit.prevent="handleEmailSubmit" class="space-y-4">
                        <div class="space-y-2">
                            <label for="email" class="text-lg font-extrabold">Email Address</label>
                            <input id="email" type="email" placeholder="Enter your email" autocomplete="email" autofocus
                                v-model="emailForm.email"
                                class="focus:ring-primaryDark  w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2" />
                        </div>
                        <button type="submit"
                            class="bg-primaryDark hover:shadow-primaryDark /30 w-full rounded-lg px-4 py-2.5 font-extrabold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
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
                                    class="text-primaryDark  hover:text-primaryDark /80 font-extrabold transition-colors">
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
                                class="focus:ring-primaryDark  w-full rounded-md border border-gray-300 px-3 py-2 text-center text-2xl tracking-widest focus:outline-none focus:ring-2" />
                        </div>

                        <button type="submit"
                            class="bg-primaryDark hover:shadow-primaryDark /30 w-full rounded-lg px-4 py-2.5 font-extrabold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                            :disabled="isLoading">
                            {{ isLoading ? 'Verifying...' : 'Verify Code' }}
                        </button>

                        <div class="mt-4 text-center">
                            <button type="button" @click="resendOtp"
                                class="text-primaryDark  hover:text-primaryDark /80 text-lg transition-colors"
                                :disabled="isLoading">
                                Resend Code
                            </button>
                        </div>
                    </form>

                    <!-- Step 3: Biodata Form -->
                    <form v-if="currentStep === 3" @submit.prevent="handleReset" class="h-full space-y-4">
                        <div class="space-y-2" v-for="field in biodataFields" :key="field.id">
                            <label :for="field.id" class="text-lg font-extrabold">{{ field.name }}</label>
                            <input v-if="field.type !== 'password'" :id="field.id" :type="field.type"
                                :placeholder="field.placeholder" :autocomplete="field.autocomplete"
                                v-model="resetForm[field.model]"
                                class="focus:ring-primaryDark  w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2" />
                            <PasswordInput v-else :id="field.id" :placeholder="field.placeholder"
                                v-model="resetForm[field.model]" />
                        </div>

                        <button type="submit"
                            class="bg-primaryDark hover:shadow-primaryDark /30 w-full rounded-lg px-4 py-2.5 font-extrabold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                            :disabled="isLoading">
                            {{
                                isLoading
                                    ? 'Resetting Password...'
                                    : 'Reset Password'
                            }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </AdminAuthLayout>
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
        id: 'new-password',
        name: 'New Password',
        placeholder: 'Create a new password',
        type: 'password',
        required: true,
        autocomplete: 'new-password',
        model: 'password',
    },
    {
        id: 'password_confirmation',
        name: 'Confirm New Password',
        placeholder: 'Confirm your new password',
        type: 'password',
        required: true,
        autocomplete: 'new-password',
        model: 'password_confirmation',
    },
]);

// Main signup form
const resetForm = useForm({
    email: '',
    password: '',
    password_confirmation: '',
    otp: '',
});

// Validation schemas
const emailSchema = z.object({
    email: z.email('Invalid email address').min(1, 'Email is required'),
});

const otpSchema = z.object({
    otp: z.string().length(6, 'OTP must be 6 digits'),
    email: z.email('Invalid email address'),
});

const resetSchema = z
    .object({
        email: z.email('Invalid email address').min(1, 'Email is required'),
        otp: z.string().length(6, 'OTP must be 6 digits'),
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
        emailForm.post(route('admin.password.request.otp'), {
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
        otpForm.post(route('admin.password.verify'), {
            onSuccess: (response) => {
                toast({
                    title: 'Email Verified',
                    description: 'Please complete your registration',
                    class: 'text-primaryDark bg-white shadow-lg',
                });

                resetForm.email = otpForm.email;
                resetForm.otp = otpForm.otp;

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
        emailForm.post(route('admin.password.request.opt'), {
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

// Step 3: Handle reset
const handleReset = async () => {
    isLoading.value = true;
    console.log(resetForm.email);
    const validation = resetSchema.safeParse(resetForm);

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
        resetForm.post(route('admin.password.reset'), {
            onError: (error) => {
                for (const err in error) {
                    toast({
                        title: 'Password Reset Failed',
                        description: error[err],
                        variant: 'destructive',
                        class: 'text-primaryDark bg-white shadow-lg',
                    });
                    break;
                }
            },
            onSuccess: (response) => {
                console.log(response);
                toast({
                    title: 'Password Reset Successful',
                    description: ' Redirecting to login...',
                    class: 'text-primaryDark bg-white shadow-lg',
                });
            },
        });
    } catch (error) {
        console.error(error);
    }

    isLoading.value = false;
};
</script>
