<script setup lang="ts">
import AppSidebar from '@/Components/Dashboard/AppSidebar.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/vue3';
import Toaster from '@/components/ui/toast/Toaster.vue';
import Notifications from '@/Components/Dashboard/Notifications.vue';

const auth = usePage().props.auth;

console.log(auth.user)
</script>

<template class="fixed h-screen bg-primaryLight">
    <SidebarProvider>
        <Toaster />
        <AppSidebar />
        <main class="relative h-screen w-full bg-primaryLight">
            <div class="flex items-center justify-between bg-primaryDark/50 p-5 px-10">
                <SidebarTrigger
                    class="text-white transition-all duration-150 hover:-translate-y-1 hover:bg-white hover:text-primaryDark" />

                <div class="flex items-center justify-between gap-16">
                    <Notifications />
                    <Avatar>
                        <AvatarImage :src="auth.user.avatar" alt="@unovue" />
                        <AvatarFallback
                            class="flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-extrabold text-primaryDark">
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
