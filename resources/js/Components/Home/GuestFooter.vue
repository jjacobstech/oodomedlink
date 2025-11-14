<template>
      <footer class="bg-card bg-primaryDark border-t text-xl border-border py-12">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div class="grid md:grid-cols-4 text-xl gap-8 mb-8">
                        <!-- Brand  -->
                        <div class="space-y-4">
                              <button class="bg-white rounded-lg p-1">
                                    <ApplicationLogo />
                              </button>

                              <p class="text-xl font-extrabold  text-primaryLight">
                                    Streamlining test results delivery for modern healthcare providers
                              </p>
                        </div>

                        <!-- Product  -->
                        <div>
                              <h4 class="font-extrabold mb-4 text-primaryLight">Product</h4>
                              <ul class="space-y-2 text-xl font-extrabold  text-primaryLight">
                                    <li><a href="#" class="hover:text-primary transition-colors">Features</a></li>
                                    <li><a href="#" class="hover:text-primary transition-colors">Pricing</a></li>
                                    <li><a href="#" class="hover:text-primary transition-colors">Security</a></li>
                                    <li><a href="#" class="hover:text-primary transition-colors">Integration</a>
                                    </li>
                              </ul>
                        </div>

                        <!-- Company  -->
                        <div>
                              <h4 class="font-extrabold mb-4 text-primaryLight">Company</h4>
                              <ul class="space-y-2 text-xl font-extrabold  text-primaryLight">
                                    <li><a href="#" class="hover:text-primary transition-colors">About Us</a></li>
                                    <li><a href="#" class="hover:text-primary transition-colors">Careers</a></li>
                                    <li><a href="#" class="hover:text-primary transition-colors">Blog</a></li>
                                    <li><a href="#" class="hover:text-primary transition-colors">Contact</a></li>
                              </ul>
                        </div>

                        <!-- Support  -->
                        <div>
                              <h4 class="font-extrabold mb-4 text-primaryLight">Support</h4>
                              <ul class="space-y-2 text-xl font-extrabold  text-primaryLight">
                                    <li><a href="#" class="hover:text-primary transition-colors">Help Center</a>
                                    </li>
                                    <li><a href="#" class="hover:text-primary transition-colors">Documentation</a>
                                    </li>
                                    <li><a href="#" class="hover:text-primary transition-colors">Privacy Policy</a>
                                    </li>
                                    <li><a href="#" class="hover:text-primary transition-colors">Terms of
                                                Service</a></li>
                              </ul>
                        </div>
                  </div>

                  <div
                        class="pt-8 border-t bg-primaryDark border-border flex flex-col md:flex-row justify-between items-center gap-4">
                        <p class="text-xl font-extrabold text-primaryLight">
                              © 2025 OodoMedlink. All rights reserved.
                        </p>
                        <div class="flex font-extrabold items-center gap-2 text-xl text-primaryLight">
                              <span>Made with</span>
                              <HeartShine weight="Bold" class=" fill-primaryDark text-primaryLight w-auto h-8" />

                              <span>for healthcare professionals</span>
                        </div>
                  </div>
            </div>
      </footer>
</template>

<script setup lang="ts">
import { HeartShine } from '@solar-icons/vue';
import ApplicationLogo from '../ApplicationLogo.vue';
</script>