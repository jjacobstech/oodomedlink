<script setup lang="ts">
import AppSidebar from '@/Components/Admin/AppSidebar.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Badge from '@/components/ui/badge/Badge.vue';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/vue3';
import { Bell } from '@solar-icons/vue';

const auth = usePage().props.auth;
</script>

<template class="fixed h-fill bg-primaryLight">
    <SidebarProvider>
        <AppSidebar />
        <main class="relative h-screen w-full bg-primaryLight">
            <div class="flex items-center justify-between bg-primaryDark/50 p-5 px-10">
                <SidebarTrigger
                    class="text-white transition-all duration-150 hover:-translate-y-1 hover:bg-white hover:text-primaryDark" />

                <div class="flex items-center justify-between gap-16">
                    <!-- <div class="relative flex items-center"> -->
                    <!-- <Bell class="h-8 w-8 fill-primaryDark text-primaryLight" /> -->
                    <!-- <Badge variant="outline" -->
                    <!-- class="absolute mb-3 ml-4 animate-bounce border-primaryDark bg-primaryDark"> -->
                    <!-- <span class="text-sm font-extrabold text-white"> -->
                    <!-- {{ 3 }} -->
                    <!-- </span> -->
                    <!-- </Badge> -->
                    <!-- </div> -->
                    <Avatar>
                        <AvatarImage src="/assets/doctor.jpeg" alt="@unovue" />
                        <AvatarFallback
                            class="flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-extrabold text-transparent">
                            <p class="bg-deepgradient bg-clip-text">
                                {{ auth.user.name.charAt(0).toUpperCase() }}
                            </p>
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <slot />
            <!-- Footer -->
            <footer class="bg-primaryLight">
                <p class="text-center text-xl text-black">
                    © 2025 Oodo Medlink. All Rights Reserved
                </p>
            </footer>
        </main>
    </SidebarProvider>
</template>
