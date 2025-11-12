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
      { href: route('admin.dashboard'), icon: Home, label: 'Dashboard', gradient: 'from-deepblue to-cyan-500' },
];

const isActive = (href: string) => activeRoute.value === href;

const logout = () => {
      userForm.post(route('admin.logout'));

}
</script>

<template>
      <Sidebar
            class="bg-gradient-to-b from-slate-50 to-slate-100 xl:dark:from-slate-900 dark:to-slate-950 border-r border-slate-200 dark:border-slate-800">
            <SidebarHeader
                  class="flex py-4  border-b border-slate-200 dark:border-slate-800 items-center justify-between backdrop-blur-sm bg-white/50 dark:bg-slate-900/50">
                  <div class="transform transition-transform duration-300 hover:scale-105">
                        <ApplicationLogo />
                  </div>
            </SidebarHeader>

            <SidebarContent class="py-4 ">
                  <SidebarGroup class="space-y-2">
                        <div v-for="item in menuItems" :key="item.href">
                              <SidebarMenuButton class="relative overflow-hidden group"
                                    :class="isActive(item.href) ? 'bg-white dark:bg-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50' : 'hover:bg-white/60 dark:hover:bg-slate-800/60'">
                                    <Link :href="item.href"
                                          class="flex items-center gap-3 w-full relative z-10 transition-all duration-300"
                                          :class="isActive(item.href) ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'">
                                    <!-- Animated gradient background on hover -->
                                    <div class="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10"
                                          :class="item.gradient"></div>

                                    <!-- Active indicator -->
                                    <div v-if="isActive(item.href)"
                                          class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b rounded-r-full animate-pulse"
                                          :class="item.gradient"></div>

                                    <!-- Icon with gradient on active -->
                                    <div class="relative p-2 rounded-lg transition-all duration-300 group-hover:scale-110"
                                          :class="isActive(item.href) ? 'bg-gradient-to-br ' + item.gradient + ' text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800'">
                                          <component :is="item.icon" class="w-5 h-5 transition-transform duration-300"
                                                :class="!isActive(item.href) ? 'text-slate-600 dark:text-slate-400' : ''" />
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

            <SidebarFooter
                  class="p-3 border-t border-slate-200 dark:border-slate-800 backdrop-blur-sm bg-white/30 dark:bg-slate-900/30">
                  <SidebarMenuButton class="group hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300">
                        <a @click="logout"
                              class="flex items-center gap-3 w-full text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300">
                              <div
                                    class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-red-100 dark:group-hover:bg-red-950/30 transition-all duration-300 group-hover:scale-110">
                                    <Logout class="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                              </div>
                              <span
                                    class="font-medium transition-all duration-300 group-hover:translate-x-1">Logout</span>
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