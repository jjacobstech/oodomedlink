<template>
    <footer class="border-t border-border bg-card bg-primaryDark py-12 text-xl">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mb-8 grid gap-8 text-xl md:grid-cols-4">
                <!-- Brand  -->
                <div class="space-y-4">
                    <button class="rounded-lg bg-white p-1">
                        <ApplicationLogo />
                    </button>

                    <p class="text-xl font-extrabold text-primaryLight">
                        Streamlining test results delivery for modern healthcare
                        providers
                    </p>
                </div>

                <!-- Product  -->
                <div>
                    <h4 class="mb-4 font-extrabold text-primaryLight">
                        Product
                    </h4>
                    <ul
                        class="space-y-2 text-xl font-extrabold text-primaryLight"
                    >
                        <li>
                            <a
                                href="#"
                                class="transition-colors hover:text-primary"
                                >Features</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="transition-colors hover:text-primary"
                                >Pricing</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="transition-colors hover:text-primary"
                                >Security</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="transition-colors hover:text-primary"
                                >Integration</a
                            >
                        </li>
                    </ul>
                </div>

                <!-- Company  -->
                <div>
                    <h4 class="mb-4 font-extrabold text-primaryLight">
                        Company
                    </h4>
                    <ul
                        class="space-y-2 text-xl font-extrabold text-primaryLight"
                    >
                        <li>
                            <a
                                href="#"
                                class="transition-colors hover:text-primary"
                                >About Us</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="transition-colors hover:text-primary"
                                >Careers</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="transition-colors hover:text-primary"
                                >Blog</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="transition-colors hover:text-primary"
                                >Contact</a
                            >
                        </li>
                    </ul>
                </div>

                <!-- Support  -->
                <div>
                    <h4 class="mb-4 font-extrabold text-primaryLight">
                        Support
                    </h4>
                    <ul
                        class="space-y-2 text-xl font-extrabold text-primaryLight"
                    >
                        <li>
                            <a
                                href="#"
                                class="transition-colors hover:text-primary"
                                >Help Center</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="transition-colors hover:text-primary"
                                >Documentation</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="transition-colors hover:text-primary"
                                >Privacy Policy</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="transition-colors hover:text-primary"
                                >Terms of Service</a
                            >
                        </li>
                    </ul>
                </div>
            </div>

            <div
                class="flex flex-col items-center justify-between gap-4 border-t border-border bg-primaryDark pt-8 md:flex-row"
            >
                <p class="text-xl font-extrabold text-primaryLight">
                    © 2025 OodoMedlink. All rights reserved.
                </p>
                <div
                    class="flex items-center gap-2 text-xl font-extrabold text-primaryLight"
                >
                    <span>Made with</span>
                    <HeartShine
                        weight="Bold"
                        class="h-8 w-auto fill-primaryDark text-primaryLight"
                    />

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
