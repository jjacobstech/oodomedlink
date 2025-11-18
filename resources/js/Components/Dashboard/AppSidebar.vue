<script setup lang="ts">
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Link, useForm, usePage } from '@inertiajs/vue3';
import { Home, Letter, Logout, UserBlock } from '@solar-icons/vue';
import { Cog } from 'lucide-vue-next';
import { ref } from 'vue';
import ApplicationLogo from '../ApplicationLogo.vue';

const page = usePage();

const userForm = useForm({
    ...page.props.auth.user,
});

const activeRoute = ref(page.props.ziggy.location);

const menuItems = [
    { href: route('user.dashboard'), icon: Home, label: 'Dashboard' },
    { href: route('user.emails'), icon: Letter, label: 'Emails' },
    { href: route('user.patients'), icon: UserBlock, label: 'Patients' },
    { href: route('user.settings'), icon: Cog, label: 'Settings' },
];

const isActive = (href: string) => {
    if (activeRoute.value === href) {
        return true;
    }
    return false;
};

const logout = () => {
    userForm.post(route('logout'));
};
</script>

<template>
    <Sidebar class="bg-primaryDark">
        <!-- Header -->
        <SidebarHeader
            class="flex items-center justify-between bg-primaryDark py-4 backdrop-blur-sm sm:py-5 lg:py-7"
        >
            <div
                class="transform rounded-lg bg-white p-1.5 transition-transform duration-300 hover:scale-105 sm:rounded-xl sm:p-2"
            >
                <ApplicationLogo />
            </div>
        </SidebarHeader>

        <!-- Content -->
        <SidebarContent class="bg-primaryDark py-3 sm:py-4">
            <SidebarGroup class="space-y-2 sm:space-y-3 lg:space-y-4">
                <div v-for="item in menuItems" :key="item.href">
                    <SidebarMenuButton
                        v-if="isActive(item.href)"
                        class="group relative overflow-hidden bg-primaryLight text-primaryDark"
                    >
                        <Link
                            :href="item.href"
                            class="relative z-10 flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                        >
                            <!-- Animated gradient background on hover -->
                            <div
                                class="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10"
                            ></div>

                            <!-- Active indicator (uncomment if needed) -->
                            <!-- <div v-if="isActive(item.href)" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 sm:h-8 bg-primaryLight rounded-r-full animate-pulse"></div> -->

                            <!-- Icon with gradient on active -->
                            <div
                                class="relative flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2"
                            >
                                <component
                                    :is="item.icon"
                                    class="h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                                />
                            </div>

                            <!-- Label -->
                            <span
                                class="text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:text-base lg:text-lg"
                            >
                                {{ item.label }}
                            </span>

                            <!-- Hover shimmer effect -->
                            <div
                                class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                            ></div>
                        </Link>
                    </SidebarMenuButton>
                    <SidebarMenuButton
                        v-else
                        class="group relative overflow-hidden text-white hover:bg-primaryLight hover:text-primaryDark"
                    >
                        <Link
                            :href="item.href"
                            class="relative z-10 flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                        >
                            <!-- Animated gradient background on hover -->
                            <div
                                class="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10"
                            ></div>

                            <!-- Active indicator (uncomment if needed) -->
                            <!-- <div v-if="isActive(item.href)" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 sm:h-8 bg-primaryLight rounded-r-full animate-pulse"></div> -->

                            <!-- Icon with gradient on active -->
                            <div
                                class="relative flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2"
                            >
                                <component
                                    :is="item.icon"
                                    class="h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                                />
                            </div>

                            <!-- Label -->
                            <span
                                class="text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:text-base lg:text-lg"
                            >
                                {{ item.label }}
                            </span>

                            <!-- Hover shimmer effect -->
                            <div
                                class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                            ></div>
                        </Link>
                    </SidebarMenuButton>
                </div>
            </SidebarGroup>
        </SidebarContent>

        <!-- Footer -->
        <SidebarFooter class="bg-primaryDark p-2 backdrop-blur-sm sm:p-3">
            <SidebarMenuButton
                class="group rounded-lg transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
                <a
                    @click="logout"
                    class="flex w-full cursor-pointer items-center gap-2 px-3 py-2 transition-colors duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                >
                    <!-- Logout Icon -->
                    <div
                        class="flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2"
                    >
                        <Logout
                            class="h-5 w-5 text-white transition-all duration-300 group-hover:rotate-12 group-hover:text-red-600 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                        />
                    </div>

                    <!-- Logout Label -->
                    <span
                        class="text-sm font-semibold text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-600 sm:text-base lg:text-lg"
                    >
                        Logout
                    </span>
                </a>
            </SidebarMenuButton>
        </SidebarFooter>
    </Sidebar>
</template>

<style scoped>
/* Smooth animations */
@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

/* Glassmorphism effect */
.backdrop-blur-sm {
    backdrop-filter: blur(8px);
}
</style>
