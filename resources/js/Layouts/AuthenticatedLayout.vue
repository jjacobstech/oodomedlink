<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/Components/Dashboard/AppSidebar.vue";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { usePage } from "@inertiajs/vue3";
import Badge from "@/components/ui/badge/Badge.vue";
import { Bell } from "@solar-icons/vue";

const auth = usePage().props.auth;

</script>

<template class="fixed">
    <SidebarProvider>


        <AppSidebar />
        <main class="bg-white h-screen w-full">
            <div class="p-5 bg-primaryDark/50 flex  justify-between items-center px-10">
                <SidebarTrigger
                    class=" hover:-translate-y-1  transition-all duration-150 text-white  hover:bg-white hover:text-primaryDark" />

                <div class="flex items-center justify-between gap-16 ">
                    <div class="flex relative items-center">
                        <Bell class="w-8 h-8 text-primaryLight fill-primaryDark " />
                        <Badge variant="outline"
                            class="ml-4 animate-bounce bg-primaryDark border-primaryDark mb-3 absolute">
                            <span class="text-sm font-extrabold text-white">
                                {{ 3 }}
                            </span>
                        </Badge>
                    </div>
                    <Avatar>
                        <AvatarImage src="/assets/doctor.jpeg" alt="@unovue" />
                        <AvatarFallback
                            class="bg-white text-transparent w-16 font-extrabold text-xl  justify-center flex items-center rounded-full h-16">
                            <p class="bg-deepgradient bg-clip-text">
                                {{
                                auth.user.name.charAt(0).toUpperCase() }}
                            </p>

                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <slot />
            <!-- Footer -->
            <footer class="">
                <p class="text-xl text-center text-black">© 2025 Oodo Medlink. All Rights Reserved</p>
            </footer>
        </main>

    </SidebarProvider>

</template>