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

console.log(route('user.dashboard'), page.props.ziggy.location)


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

}
</script>

<template>
      <Sidebar class="bg-primaryDark">
            <!-- Header -->
            <SidebarHeader
                  class="flex py-4 sm:py-5 lg:py-7 bg-primaryDark items-center justify-between backdrop-blur-sm">
                  <div
                        class="transform rounded-lg sm:rounded-xl p-1.5 sm:p-2 transition-transform duration-300 hover:scale-105 bg-white">
                        <ApplicationLogo />
                  </div>
            </SidebarHeader>

            <!-- Content -->
            <SidebarContent class="py-3 sm:py-4 bg-primaryDark">
                  <SidebarGroup class="space-y-2 sm:space-y-3 lg:space-y-4">
                        <div v-for="item in menuItems" :key="item.href">
                              <SidebarMenuButton v-if="isActive(item.href)"
                                    class=" bg-primaryLight text-primaryDark relative overflow-hidden group">
                                    <Link :href="item.href"
                                          class="flex items-center gap-2 sm:gap-3 w-full relative z-10 transition-all duration-300 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg">

                                    <!-- Animated gradient background on hover -->
                                    <div
                                          class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10">
                                    </div>

                                    <!-- Active indicator (uncomment if needed) -->
                                    <!-- <div v-if="isActive(item.href)" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 sm:h-8 bg-primaryLight rounded-r-full animate-pulse"></div> -->

                                    <!-- Icon with gradient on active -->
                                    <div
                                          class="relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                                          <component :is="item.icon"
                                                class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7  transition-transform duration-300" />
                                    </div>

                                    <!-- Label -->
                                    <span
                                          class="text-sm sm:text-base lg:text-lg  font-semibold transition-all duration-300 group-hover:translate-x-1">
                                          {{ item.label }}
                                    </span>

                                    <!-- Hover shimmer effect -->
                                    <div
                                          class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent">
                                    </div>
                                    </Link>
                              </SidebarMenuButton>
                              <SidebarMenuButton v-else
                                    class="hover:bg-primaryLight text-white hover:text-primaryDark relative overflow-hidden group">
                                    <Link :href="item.href"
                                          class="flex items-center gap-2 sm:gap-3 w-full relative z-10 transition-all duration-300 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg">

                                    <!-- Animated gradient background on hover -->
                                    <div
                                          class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10">
                                    </div>

                                    <!-- Active indicator (uncomment if needed) -->
                                    <!-- <div v-if="isActive(item.href)" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 sm:h-8 bg-primaryLight rounded-r-full animate-pulse"></div> -->

                                    <!-- Icon with gradient on active -->
                                    <div
                                          class="relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                                          <component :is="item.icon"
                                                class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7  transition-transform duration-300" />
                                    </div>

                                    <!-- Label -->
                                    <span
                                          class="text-sm sm:text-base lg:text-lg  font-semibold transition-all duration-300 group-hover:translate-x-1">
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

            <!-- Footer -->
            <SidebarFooter class="p-2 sm:p-3 bg-primaryDark backdrop-blur-sm">
                  <SidebarMenuButton
                        class="group hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 rounded-lg">
                        <a @click="logout"
                              class="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 cursor-pointer transition-colors duration-300">

                              <!-- Logout Icon -->
                              <div
                                    class="p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                                    <Logout
                                          class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white group-hover:text-red-600 transition-all duration-300 group-hover:rotate-12" />
                              </div>

                              <!-- Logout Label -->
                              <span
                                    class="text-sm sm:text-base lg:text-lg text-white group-hover:text-red-600 font-semibold transition-all duration-300 group-hover:translate-x-1">
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