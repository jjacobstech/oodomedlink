<template>

    <Head title="signup" />
    <AdminAuthLayout>
        <Toaster />
        <div class=" h-screen overflow-y-hidden   flex justify-center items-center  ">
            <!-- Main content -->

            <div class="max-w-lg  justify-center   rounded-xl shadow-xl bg-white items-center">
                <div class="p-6 grid space-y-1 bg-deepgradient rounded-t-lg">
                    <h2 class="text-2xl font-bold text-center text-white">Complete Registration</h2>
                    <p class="text-center text-white">
                        Create an account - Step {{ currentStep }} of 3
                    </p>
                </div>

                <!-- Progress Indicator -->
                <div class=" py-6 flex  justify-center">
                    <div class="flex justify-between items-center  px-auto">
                        <div v-for="step in 3" :key="step" class="flex-1">
                            <div class="flex items-center">
                                <div :class="[
                                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                                    currentStep >= step ? 'bg-deepgradient text-white' : 'bg-gray-200 text-gray-500'
                                ]">
                                    {{ step }}
                                </div>
                                <div v-if="step < 3" :class="[
                                    'flex-1 h-1 mx-2 w-20 transition-all',
                                    currentStep > step ? 'bg-deepgradient' : 'bg-gray-200'
                                ]">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-6 space-y-4">
                    <!-- Step 1: Email Verification -->
                    <form v-if="currentStep === 1" @submit.prevent="handleEmailSubmit" class="space-y-4">
                        <div class="space-y-2">
                            <label for="email" class="text-sm font-medium">Email Address</label>
                            <input id="email" type="email" placeholder="Enter your email" autocomplete="email" autofocus
                                v-model="emailForm.email"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deepgreen" />
                        </div>
                        <button type="submit"
                            class="w-full px-4 py-2.5 bg-deepgradient text-white font-medium rounded-lg hover:bg-white hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:shadow-deepgreen/30"
                            :disabled="isLoading">
                            {{ isLoading ? 'Sending OTP...' : 'Send Verification Code' }}
                        </button>

                        <div class="mt-6 text-center">
                            <p class="text-sm text-gray-600">
                                Already have an account?
                                <Link :href="route('admin.login')"
                                    class="text-deepgreen font-medium hover:text-deepgreen/80 transition-colors">
                                Login
                                </Link>
                            </p>
                        </div>
                    </form>

                    <!-- Step 2: OTP Verification -->
                    <form v-if="currentStep === 2" @submit.prevent="handleOtpSubmit" class="space-y-4">
                        <div class="space-y-2">
                            <label for="otp" class="text-sm font-medium">Verification Code</label>
                            <p class="text-xs text-gray-500 mb-2">
                                Enter the 6-digit code sent to {{ emailForm.email }}
                            </p>
                            <input id="otp" type="text" placeholder="Enter 6-digit code" maxlength="6"
                                v-model="otpForm.otp"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deepgreen text-center text-2xl tracking-widest" />
                        </div>

                        <button type="submit"
                            class="w-full px-4 py-2.5 bg-deepgradient hover:-translate-y-1 text-white font-medium rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:shadow-deepgreen/30"
                            :disabled="isLoading">
                            {{ isLoading ? 'Verifying...' : 'Verify Code' }}
                        </button>

                        <div class="mt-4 text-center">
                            <button type="button" @click="resendOtp"
                                class="text-sm text-deepgreen hover:text-deepgreen/80 transition-colors"
                                :disabled="isLoading">
                                Resend Code
                            </button>
                        </div>
                    </form>

                    <!-- Step 3: Biodata Form -->
                    <form v-if="currentStep === 3" @submit.prevent="handleSignup" class="space-y-4 h-full">
                        <div class="space-y-2" v-for="field in biodataFields" :key="field.id">
                            <label :for="field.id" class="text-sm font-medium">{{ field.name }}</label>
                            <input v-if="field.type !== 'password'" :id="field.id" :type="field.type"
                                :placeholder="field.placeholder" :autocomplete="field.autocomplete"
                                v-model="signupForm[field.model]"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deepgreen" />
                            <PasswordInput v-else :id="field.id" :placeholder="field.placeholder"
                                v-model="signupForm[field.model]" />
                        </div>

                        <button type="submit"
                            class="w-full px-4 py-2.5 bg-deepgradient hover:-translate-y-1 text-white font-medium rounded-lg hover:bg-white  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:shadow-deepgreen/30"
                            :disabled="isLoading">
                            {{ isLoading ? 'Signing up...' : 'Complete Registration' }}
                        </button>

                    </form>
                </div>
            </div>

        </div>
    </AdminAuthLayout>
</template>

<script setup>
import { ref, } from 'vue';
import { router as useRouter, useForm, Link, } from '@inertiajs/vue3';
import { flattenError, z } from 'zod';
import { Head } from '@inertiajs/vue3';
import AdminAuthLayout from '@/Layouts/AdminAuthLayout.vue';
import Toaster from '@/components/ui/toast/Toaster.vue';
import { useToast } from '@/components/ui/toast';
import PasswordInput from '@/Components/PasswordInput.vue';



const router = useRouter;
const isLoading = ref(false);
const currentStep = ref(1);
const { toast } = useToast();
const newEmail = sessionStorage.getItem('email');



// Email form for step 1
const emailForm = useForm({
    email: ''
});

// OTP form for step 2
const otpForm = useForm({
    otp: '',
    email: ''
});

// Biodata fields for step 3
const biodataFields = ref([
    {
        id: 'name',
        name: "Name",
        placeholder: "Enter your name",
        type: "text",
        required: true,
        autocomplete: "organization",
        model: 'name'
    },
    {
        id: 'phone_no',
        name: "Phone Number",
        placeholder: "Enter your phone number",
        type: "tel",
        required: true,
        autocomplete: "tel",
        model: 'phone_no'
    },
    {
        id: 'password',
        name: "Password",
        placeholder: "Create a password",
        type: "password",
        required: true,
        autocomplete: "new-password",
        model: 'password'
    },
    {
        id: 'password_confirmation',
        name: "Confirm Password",
        placeholder: "Confirm your password",
        type: "password",
        required: true,
        autocomplete: "new-password",
        model: 'password_confirmation'
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
    email: z.email('Invalid email address').min(1, 'Email is required')
});

const otpSchema = z.object({
    otp: z.string().length(6, 'OTP must be 6 digits'),
    email: z.email('Invalid email address'),
});

const signupSchema = z.object({
    name: z.string().min(1, 'Clinic name is required'),
    email: z.email('Invalid email address'),
    phone_no: z.string().min(1, 'Phone number is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    password_confirmation: z.string().min(6, 'Password confirmation is required')
}).refine(
    data => data.password === data.password_confirmation,
    {
        message: "Passwords don't match",
        path: ['password_confirmation']
    }
);

emailForm.email = newEmail;

// Step 1: Handle email submission
const handleEmailSubmit = async () => {
    isLoading.value = true;
    sessionStorage.clear()

    const validation = emailSchema.safeParse(emailForm);

    if (!validation.success) {
        const error = validation.error.errors[0];
        toast({
            title: 'Validation Error',
            description: error.message,
            variant: 'destructive',
            class: 'text-deepblue bg-white shadow-lg',
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
                    description: 'Please check your email for the verification code',
                    class: 'text-deepblue bg-white shadow-lg',
                });
                currentStep.value = 2;

                otpForm.email = emailForm.email;

            },
            onError: (error) => {
                toast({
                    title: 'Error',
                    description: error.email || 'Failed to send verification code',
                    variant: 'destructive',
                    class: 'text-deepblue bg-white shadow-lg',
                });
                isLoading.value = false;
            }
        });
    } catch (error) {
        console.error(error);
    }

    isLoading.value = false;
};

// Step 2: Handle OTP verification
const handleOtpSubmit = async () => {
    console.log(otpForm.email)
    isLoading.value = true;
    const validation = otpSchema.safeParse(otpForm);

    if (!validation.success) {
        for (const error in flattenError(validation.error)?.fieldErrors) {
            // console.log(flattenError(form.error)?.fieldErrors[error][0])
            const inputError = flattenError(validation.error)?.fieldErrors[error][0];
            toast({
                title: 'Validation Error',
                description: inputError,
                variant: 'destructive',
                class: 'text-deepblue bg-white shadow-lg',
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
                    class: 'text-deepblue bg-white shadow-lg',
                });

                signupForm.email = otpForm.email;

                currentStep.value = 3;

            },
            onError: (error) => {
                toast({
                    title: 'Verification Failed',
                    description: error.otp || 'Invalid verification code',
                    variant: 'destructive',
                    class: 'text-deepblue bg-white shadow-lg',
                });
                console.log(error)
            }
        });
    } catch (error) {
        console.error(error);
    }

    isLoading.value = false;
};

// Resend OTP
const resendOtp = async () => {
    isLoading.value = true;
    console.log(otpForm.email)
    try {
        emailForm.post(route('admin.send-otp'), {
            onSuccess: () => {
                toast({
                    title: 'Code Resent',
                    description: 'A new verification code has been sent to your email',
                    class: 'text-deepblue bg-white shadow-lg',
                });
            },
            onError: () => {
                toast({
                    title: 'Error',
                    description: 'Failed to resend verification code',
                    variant: 'destructive',
                    class: 'text-deepblue bg-white shadow-lg',
                });
            }
        });
    } catch (error) {
        console.error(error);
    }

    isLoading.value = false;
};

// Step 3: Handle final signup
const handleSignup = async () => {
    isLoading.value = true;
    console.log(signupForm.email)
    const validation = signupSchema.safeParse(signupForm);

    if (!validation.success) {
        const errors = validation.error.flatten().fieldErrors;
        for (const field in errors) {
            toast({
                title: 'Validation Error',
                description: errors[field][0],
                variant: 'destructive',
                class: 'text-deepblue bg-white shadow-lg',
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
                        class: 'text-deepblue bg-white shadow-lg',
                    });
                    break;
                }
            },
            onSuccess: () => {
                toast({
                    title: 'Registration Successful',
                    description: 'Welcome! Redirecting to dashboard...',
                    class: 'text-deepblue bg-white shadow-lg',
                });
                setTimeout(() => {
                    router.push(route('admin.dashoard'));
                }, 500);
            }
        });
    } catch (error) {
        console.error(error);
    }

    isLoading.value = false;
};
</script>