<template>

      <Head title="Terms and Conditions" />
      <div class=" bg-primaryLight">
            <!-- Header -->
            <div class="bg-white shadow-sm border-b border-gray-200">
                  <div class="max-w-5xl mx-auto px-6 py-8">
                        <div class="flex items-center gap-4 mb-4">
                              <div class="bg-blue-600 p-3 rounded-lg">
                                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor"
                                          viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                              </div>
                              <div>
                                    <h1 class="text-3xl font-bold text-gray-900">Terms of Service</h1>
                                    <p class="text-gray-600 mt-1">Oodo Medlink Platform Agreement</p>
                              </div>
                        </div>
                        <p class="text-sm text-gray-500">Last Updated: November 26, 2024</p>
                  </div>
            </div>

            <!-- Content -->
            <div class="max-w-5xl mx-auto px-6 py-12">
                  <!-- Introduction -->
                  <div class="bg-white border-l-4 border-primaryDark p-6 rounded-r-lg mb-8">
                        <p class="text-gray-700 leading-relaxed">
                              Welcome to <span class="font-semibold">Oodo Medlink</span>. These Terms of
                              Service govern your use of our medical results delivery platform. By creating
                              an account or using our services, you acknowledge that you have read,
                              understood, and agree to be bound by these terms.
                        </p>
                  </div>

                  <!-- Main Sections -->
                  <div class="space-y-8">
                        <div v-for="(section, index) in sections" :key="index"
                              class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                              <div class="bg-primaryDark px-6 py-4">
                                    <div class="flex items-center gap-3">
                                          <component :is="section.icon" class="w-6 h-6 text-white" />
                                          <h2 class="text-xl font-semibold text-white">{{ section.title }}
                                          </h2>
                                    </div>
                              </div>
                        </div>
                  </div>

                  <!-- Acceptance Footer -->
                  <div class="mt-12 bg-primaryDark rounded-xl p-8 text-white">
                        <div class="flex items-start gap-4">
                              <svg class="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <div>
                                    <h3 class="text-xl font-semibold mb-2">Acceptance Confirmation</h3>
                                    <p class="text-blue-50 leading-relaxed">
                                          Your continued use of Oodo Medlink confirms your acceptance of
                                          these Terms of Service.
                                          If you have any questions or concerns about these terms, please
                                          contact our support team before using the Platform.
                                    </p>
                              </div>
                        </div>
                  </div>

                  <!-- Footer Links -->
                  <div class="mt-8 text-center">
                        <div class="flex justify-center gap-6 text-sm text-gray-600">
                              <a href="/privacy-policy" class="hover:text-blue-600 transition-colors">Privacy
                                    Policy</a>
                              <span>•</span>
                              <a href="/contact" class="hover:text-blue-600 transition-colors">Contact
                                    Support</a>
                              <span>•</span>
                              <a href="/" class="hover:text-blue-600 transition-colors">Back to Home</a>
                        </div>
                  </div>
            </div>
      </div>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';
import { CheckCircle } from '@solar-icons/vue';



const sections = [
      {
            icon: CheckCircle,
            title: "Upload accurate and authorized test results.",
      },
      {
            icon: CheckCircle,
            title: "Use the platform only for medical result delivery.",
      },
      {
            icon: CheckCircle,
            title: "Maintain secure staff access.",

      },
      {
            icon: CheckCircle,
            title: "Understand that AI explanations are general and not medical diagnoses.",

      },
      {
            icon: CheckCircle,
            title: "Avoid unauthorized sharing of patient data.",

      },
      {
            icon: CheckCircle,
            title: "Allow updates to features or terms aimed at improving service.",

      },

];

</script>