<template>

      <Head title="Password Reset" />
      <AuthLayout>
            <Toaster />
            <div
                  class="relative z-10   container mx-auto w-3-1/2 py-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
                  <div class="max-w-xl px-5 ">
                        <div class="p-6 grid space-y-1 bg-primaryDark rounded-t-lg">
                              <h2 class="text-2xl font-bold text-center text-white">Reset Password</h2>

                        </div>

                        <div class="p-6 space-y-4 bg-white">
                              <!-- Step 1: Email Verification -->
                              <form v-if="currentStep === 1" @submit.prevent="handleEmailSubmit" class="space-y-6">
                                    <div class="space-y-2">
                                          <label for="email" class="text-lg lg:text-2xl font-medium">Email
                                                Address</label>
                                          <input id="email" type="email" placeholder="Enter your email"
                                                autocomplete="email" autofocus v-model="emailForm.email"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-xl focus:ring-primaryDark" />
                                    </div>
                                    <button type="submit"
                                          class="w-full px-4 py-2.5 bg-primaryDark text-white font-medium rounded-lg lg:text-xl hover:bg-white hover:text-primaryDark hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:shadow-primaryDark/30"
                                          :disabled="isLoading">
                                          {{ isLoading ? 'Sending OTP...' : 'Send Verification Code' }}
                                    </button>

                                    <div class="mt-6 text-center">
                                          <p class="lg:text-2xl text-gray-600">
                                                Already have an account?
                                                <Link :href="route('login')"
                                                      class="text-primaryDark font-medium hover:text-primaryDark/80 transition-colors">
                                                Login
                                                </Link>
                                          </p>
                                    </div>
                              </form>

                              <!-- Step 2: OTP Verification -->
                              <form v-if="currentStep === 2" @submit.prevent="handleOtpSubmit" class="space-y-4">
                                    <div class="space-y-2">
                                          <label for="otp" class="text-lg lg:text-2xl font-medium">Verification
                                                Code</label>
                                          <p class="text-sm text-gray-500 mb-2">
                                                Enter the 6-digit code sent to {{ emailForm.email }}
                                          </p>
                                          <input id="otp" type="text" placeholder="Enter 6-digit code" maxlength="6"
                                                v-model="otpForm.otp"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryDark text-center text-2xl tracking-widest" />
                                    </div>

                                    <button type="submit"
                                          class="w-full px-4 py-2.5 bg-primaryDark hover:-translate-y-1 text-white text-xl font-medium rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:shadow-primaryDark/30"
                                          :disabled="isLoading">
                                          {{ isLoading ? 'Verifying...' : 'Verify Code' }}
                                    </button>

                                    <div class="mt-4 text-center">
                                          <button type="button" @click="resendOtp"
                                                class="text-2xl text-primaryDark hover:text-primaryDark/80 hover:text-primaryDark transition-colors"
                                                :disabled="isLoading">
                                                Resend Code
                                          </button>
                                    </div>
                              </form>

                              <!-- Step 3: Biodata Form -->
                              <form v-if="currentStep === 3" @submit.prevent="handleReset" class="space-y-4 ">
                                    <div class="space-y-2" v-for="field in biodataFields" :key="field.id">
                                          <label :for="field.id" class="text-lg lg:text-2xl font-medium">{{ field.name
                                          }}</label>

                                          <PasswordInput :id="field.id" :placeholder="field.placeholder"
                                                v-model="resetForm[field.model]" />
                                    </div>

                                    <button type="submit"
                                          class="w-full px-4 py-2.5 bg-primaryDark hover:text-primaryDark hover:-translate-y-1 text-xl text-white font-medium rounded-lg hover:bg-white  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:shadow-primaryDark/30"
                                          :disabled="isLoading">
                                          {{ isLoading ? 'Resetting Password...' : 'Reset Password' }}
                                    </button>

                              </form>
                        </div>
                  </div>

            </div>
      </AuthLayout>
</template>

<script setup>
import { ref, } from 'vue';
import { router as useRouter, useForm, Link, } from '@inertiajs/vue3';
import { flattenError, z } from 'zod';
import { Head } from '@inertiajs/vue3';
import AuthLayout from '@/Layouts/AuthLayout.vue';
import Toaster from '@/components/ui/toast/Toaster.vue';
import { useToast } from '@/components/ui/toast';
import PasswordInput from '@/Components/PasswordInput.vue';
import { ArrowLeft } from '@solar-icons/vue';



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
            id: 'new-password',
            name: "New Password",
            placeholder: "Create a new password",
            type: "password",
            required: true,
            autocomplete: "new-password",
            model: 'password'
      },
      {
            id: 'password_confirmation',
            name: "Confirm New Password",
            placeholder: "Confirm your new password",
            type: "password",
            required: true,
            autocomplete: "new-password",
            model: 'password_confirmation'
      },

]);

// Main signup form
const resetForm = useForm({
      email: '',
      password: '',
      password_confirmation: '',
      otp: ''
});

// Validation schemas
const emailSchema = z.object({
      email: z.email('Invalid email address').min(1, 'Email is required')
});

const otpSchema = z.object({
      otp: z.string().length(6, 'OTP must be 6 digits'),
      email: z.email('Invalid email address'),
});

const resetSchema = z.object({
      email: z.email('Invalid email address').min(1, 'Email is required'),
      otp: z.string().length(6, 'OTP must be 6 digits'),
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

      const validation = emailSchema.safeParse(emailForm);

      if (!validation.success) {
            const error = validation.error.flatten().fieldErrors;
            toast({
                  title: 'Validation Error',
                  description: error.email[0],
                  variant: 'destructive',
                  class: 'text-primaryDark bg-white shadow-lg',
            });
            isLoading.value = false;
            return;
      }

      try {
            // Send OTP request to backend
            emailForm.post(route('password.request.otp'), {
                  onSuccess: (response) => {
                        toast({
                              title: 'Verification Code Sent',
                              description: 'Please check your email for the verification code',
                              class: 'text-primaryDark bg-white shadow-lg',
                        });
                        currentStep.value = 2;

                        otpForm.email = emailForm.email;

                  },
                  onError: (error) => {
                        toast({
                              title: 'Error',
                              description: error.email || 'Failed to send verification code',
                              variant: 'destructive',
                              class: 'text-primaryDark bg-white shadow-lg',
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
                        class: 'text-primaryDark bg-white shadow-lg',
                  });
            }

            isLoading.value = false;
            return;
      }

      try {
            // Verify OTP with backend
            otpForm.post(route('password.verify'), {
                  onSuccess: (response) => {
                        toast({
                              title: 'Email Verified',
                              description: 'Please complete your registration',
                              class: 'text-primaryDark bg-white shadow-lg',
                        });

                        resetForm.email = otpForm.email;
                        resetForm.otp = otpForm.otp

                        currentStep.value = 3;

                  },
                  onError: (error) => {
                        toast({
                              title: 'Verification Failed',
                              description: error.otp || 'Invalid verification code',
                              variant: 'destructive',
                              class: 'text-primaryDark bg-white shadow-lg',
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
            emailForm.post(route('password.request.opt'), {
                  onSuccess: () => {
                        toast({
                              title: 'Code Resent',
                              description: 'A new verification code has been sent to your email',
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
                  }
            });
      } catch (error) {
            console.error(error);
      }

      isLoading.value = false;
};

// Step 3: Handle reset
const handleReset = async () => {
      isLoading.value = true;
      console.log(resetForm.email)
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
            resetForm.post(route('password.reset'), {
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
                        console.log(response)
                        toast({
                              title: 'Password Reset Successful',
                              description: ' Redirecting to login...',
                              class: 'text-primaryDark bg-white shadow-lg',
                        });
                  }
            });
      } catch (error) {
            console.error(error);
      }

      isLoading.value = false;
};
</script>