<template>
    <footer class="border-t border-border bg-card bg-primaryDark py-12 text-xl">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class=" grid gap-8 text-xl md:grid-cols-4">
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
                    <ul class="space-y-2 text-xl font-extrabold text-primaryLight">
                        <li>
                            <a href="#features" class="transition-colors hover:text-primary">Features</a>
                        </li>
                        <li>
                            <a href="#pricing" class="transition-colors hover:text-primary">Pricing</a>
                        </li>
                        <li>
                            <a href="#security" class="transition-colors hover:text-primary">Security</a>
                        </li>
                        <li>
                            <a href="#integration" class="transition-colors hover:text-primary">Integration</a>
                        </li>
                    </ul>
                </div>

                <!-- Company  -->
                <div>
                    <h4 class="mb-4 font-extrabold text-primaryLight">
                        Company
                    </h4>
                    <ul class="space-y-2 text-xl font-extrabold text-primaryLight">
                        <li>
                            <a href="#about" class="transition-colors hover:text-primary">About Us</a>
                        </li>
                        <li>
                            <a href="#careers" class="transition-colors hover:text-primary">Careers</a>
                        </li>
                        <li>
                            <Link :href="route('blog')" class="transition-colors hover:text-primary">Blog
                            </Link>
                        </li>
                        <li>
                            <a href="#contact" class="transition-colors hover:text-primary">Contact</a>
                        </li>
                    </ul>
                </div>

                <!-- Support  -->
                <div>
                    <h4 class="mb-4 font-extrabold text-primaryLight">
                        Support
                    </h4>
                    <ul class="space-y-2 text-xl font-extrabold text-primaryLight">
                        <li>
                            <a href="#" class="transition-colors hover:text-primary">Help Center</a>
                        </li>
                        <li>
                            <a href="#documentation" class="transition-colors hover:text-primary">Documentation</a>
                        </li>
                        <li>
                            <a href="#" class="transition-colors hover:text-primary">Privacy Policy</a>
                        </li>
                        <li>
                            <Link :href="route('terms-and-conditions')" class="transition-colors hover:text-primary">
                            Terms of Service</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Contact Section -->
            <section id="contact" class="bg-primaryDark py-24 text-white">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="mx-auto max-w-4xl text-center">
                        <h1
                            class="mb-4 transition-all duration-900 text-4xl hover:-translate-y-2 animate-pulse font-extrabold sm:text-5xl 2xl:text-5xl inline-block rounded-md bg-primaryDark px-8 py-4 glass text-white  hover:opacity-90 ">
                            Get In Touch
                        </h1>
                        <div class="grid gap-8 md:grid-cols-3">
                            <div class="space-y-3">
                                <Mail class="mx-auto h-8 w-8" />
                                <h3 class="text-xl font-extrabold">Email</h3>
                                <p class="font-extrabold">support@oodomedlink.com</p>
                            </div>
                            <div class="space-y-3">
                                <Phone class="mx-auto h-8 w-8" />
                                <h3 class="text-xl font-extrabold">Phone</h3>
                                <p class="font-extrabold">+234 (0) XXX XXX XXXX</p>
                            </div>
                            <div class="space-y-3">
                                <MapPin class="mx-auto h-8 w-8" />
                                <h3 class="text-xl font-extrabold">Location</h3>
                                <p class="font-extrabold">Lagos, Nigeria</p>
                            </div>
                        </div>
                        <p class="mt-12 text-lg font-extrabold">We respond quickly.</p>
                    </div>
                </div>
            </section>

        </div>
        <div
            class="flex flex-col items-center px-20 justify-between gap-4 border-t border-border bg-primaryDark pt-8 md:flex-row">
            <p class="text-xl font-extrabold text-primaryLight">
                © 2025 OodoMedlink. All rights reserved.
            </p>
            <div class="flex items-center gap-2 text-xl font-extrabold text-primaryLight">
                <span>Made with</span>
                <HeartShine weight="Bold" class="h-8 w-auto fill-primaryDark text-primaryLight" />

                <span>for healthcare professionals</span>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { HeartShine } from '@solar-icons/vue';
import { Link } from '@inertiajs/vue3';
import ApplicationLogo from '../ApplicationLogo.vue';
</script>
