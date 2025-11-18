<script setup lang="ts">
import AppSidebar from '@/Components/Admin/AppSidebar.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/vue3';

const auth = usePage().props.auth;
</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <main class="w-full bg-gray-200">
            <div
                class="bg-deepgradient flex items-center justify-between p-5 px-10"
            >
                <SidebarTrigger
                    class="hover:text-deepgreen text-white transition-all duration-150 hover:-translate-y-1 hover:bg-white"
                />

                <Avatar>
                    <AvatarImage src="/assets/doctor.jpeg" alt="@unovue" />
                    <AvatarFallback
                        class="flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-extrabold text-transparent"
                    >
                        <p class="bg-deepgradient bg-clip-text">
                            {{ auth.user.name.charAt(0).toUpperCase() }}
                        </p>
                    </AvatarFallback>
                </Avatar>
            </div>
            <slot />
            <!-- Footer -->
            <footer class="">
                <p class="text-center text-sm text-black">
                    © 2025 Oodo Medlink. All Rights Reserved
                </p>
            </footer>
        </main>
    </SidebarProvider>
</template>
