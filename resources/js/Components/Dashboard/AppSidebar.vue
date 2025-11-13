<script setup lang="ts">
import {
      Sidebar,
      SidebarContent,
      SidebarFooter,
      SidebarGroup,
      SidebarHeader,
      SidebarMenuButton,
} from '@/components/ui/sidebar'
import ApplicationLogo from '../ApplicationLogo.vue';
import { Home, Logout, Letter, UserBlock } from '@solar-icons/vue';
import { Cog } from 'lucide-vue-next';
import { ref } from 'vue';
import { usePage, useForm, Link } from '@inertiajs/vue3';

const page = usePage();

const userForm = useForm({
      ...page.props.auth.user
});


const activeRoute = ref(window.location.pathname);

const menuItems = [
      { href: route('user.dashboard'), icon: Home, label: 'Dashboard', gradient: 'from-deepblue to-cyan-500' },
      { href: route('user.emails'), icon: Letter, label: 'Emails', gradient: 'from-purple-500 to-pink-500' },
      { href: route('user.patients'), icon: UserBlock, label: 'Patients', gradient: 'from-deepgreen to-teal-500' },
      { href: route('user.settings'), icon: Cog, label: 'Settings', gradient: 'from-deeppurple to-purple-500' },
];

const isActive = (href: string) => activeRoute.value === href;

const logout = () => {
      userForm.post('/logout');

}
</script>

<template>
      <Sidebar class="bg-deepblue">
            <SidebarHeader class="flex py-7  bg-deepblue items-center justify-between backdrop-blur-sm ">
                  <div class="transform rounded-xl p-2 transition-transform duration-300 hover:scale-105 bg-white">
                        <ApplicationLogo />
                  </div>
            </SidebarHeader>

            <SidebarContent class="py-4 bg-deepblue text-white">
                  <SidebarGroup class="space-y-5">
                        <div v-for="item in menuItems" :key="item.href">
                              <SidebarMenuButton
                                    class="relative overflow-hidden group  text-xl text-white font-extrabold">
                                    <Link :href="item.href"
                                          class="flex items-center gap-3 w-full relative z-10 transition-all duration-300">
                                    <!-- Animated gradient background on hover -->
                                    <div
                                          class="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10">
                                    </div>

                                    <!-- Active indicator -->
                                    <div v-if="isActive(item.href)"
                                          class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-black rounded-r-full animate-pulse">

                                    </div>

                                    <!-- Icon with gradient on active -->
                                    <div
                                          class="relative p-2 rounded-lg transition-all duration-300 group-hover:scale-110">
                                          <component :is="item.icon"
                                                class="w-7 h-7 transition-transform duration-300" />
                                    </div>

                                    <span class="font-medium transition-all duration-300 group-hover:translate-x-1">
                                          {{ item.label }}
                                    </span>

                                    <!-- Hover shimmer effect -->
                                    <div
                                          class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent">
                                    </div>
                                    </Link>
                              </SidebarMenuButton>
                        </div>
                  </SidebarGroup>
            </SidebarContent>

            <SidebarFooter class="p-3 bg-deepblue backdrop-blur-sm ">
                  <SidebarMenuButton
                        class="group hover:bg-red-50 dark:hover:bg-red-950/20 transition-all text-2xl font-extrabold duration-300">
                        <a @click="logout"
                              class="flex items-center gap-3 w-full hover:text-black text-white    transition-colors duration-300">
                              <div class="p-2 rounded-lg   transition-all duration-300 group-hover:scale-110">
                                    <Logout class="w-7 h-7 transition-transform duration-300 group-hover:rotate-12" />
                              </div>
                              <span
                                    class="font-medium transition-al l duration-300 group-hover:translate-x-1">Logout</span>
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

/* Custom scrollbar for sidebar content */
:deep(.sidebar-content) {
      scrollbar-width: thin;
      scrollbar-color: rgba(148, 163, 184, 0.3) transparent;
}

:deep(.sidebar-content)::-webkit-scrollbar {
      width: 6px;
}

:deep(.sidebar-content)::-webkit-scrollbar-track {
      background: transparent;
}

:deep(.sidebar-content)::-webkit-scrollbar-thumb {
      background-color: rgba(148, 163, 184, 0.3);
      border-radius: 3px;
}

:deep(.sidebar-content)::-webkit-scrollbar-thumb:hover {
      background-color: rgba(148, 163, 184, 0.5);
}

/* Glassmorphism effect */
.backdrop-blur-sm {
      backdrop-filter: blur(8px);
}
</style>