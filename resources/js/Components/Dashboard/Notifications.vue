<script setup lang="ts">
import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Badge from '@/components/ui/badge/Badge.vue';
import { Bell } from '@solar-icons/vue';
import { usePage, useForm } from '@inertiajs/vue3';
import { Notification } from '@/types/index';
import { computed } from 'vue';
import axios from 'axios';

const page = usePage();
const notifications = page.props.auth.notifications;

const unreadCount = computed(() => notifications.filter((n: Notification) => !n.read_at).length);

const markAsRead = async (notification: Notification) => {
      if (notification.read_at) return;

      const notificationForm = useForm({
            id: notification.id
      });
      try {

            notificationForm.post(route('user.notification'), {
                  preserveScroll: true,
            });


            // Reload the page data to refresh notifications

      } catch (error) {
            console.error('Error marking notification as read:', error);
      }
      // Refresh notifications after marking as read
};

const getNotificationTime = (notification: Notification) => {
      const date = new Date(notification.created_at);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffInSeconds < 60) return 'Just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
};
</script>

<template>
      <DropdownMenu>
            <DropdownMenuTrigger class="relative focus:outline-none">
                  <div
                        class="relative flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Bell
                              class="h-6 w-6 fill-primaryDark text-primaryLight transition-transform hover:scale-110 md:h-7 md:w-7" />
                        <Badge v-if="unreadCount > 0" variant="outline"
                              class="absolute -right-1 -top-1 h-5 min-w-[20px] animate-pulse border-red-500 bg-red-500 px-1.5 text-xs">
                              <span class="font-bold text-white">
                                    {{ unreadCount > 99 ? '99+' : unreadCount }}
                              </span>
                        </Badge>
                  </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" class="w-80 max-w-[calc(100vw-2rem)] p-0 md:w-96">

                  <!-- Header -->
                  <DropdownMenuLabel class="border-b px-4 py-3">
                        <div class="flex items-center justify-between">
                              <h3 class="text-base font-semibold">Notifications</h3>
                              <Badge variant="secondary" class="text-xs">
                                    {{ unreadCount }} new
                              </Badge>
                        </div>
                  </DropdownMenuLabel>

                  <!-- Notifications List -->
                  <div
                        class="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        <template v-if="notifications.length > 0">
                              <DropdownMenuItem v-for="notification in notifications" :key="notification.id"
                                    @click="markAsRead(notification)"
                                    class="cursor-pointer border-b px-4 py-3 last:border-b-0 focus:bg-blue-50 dark:focus:bg-blue-900/20"
                                    :class="{
                                          'bg-blue-50/50 dark:bg-blue-900/10': !notification.read_at,
                                          'opacity-60': notification.read_at
                                    }">
                                    <div class="flex w-full items-start gap-3">
                                          <!-- Unread Indicator -->
                                          <div v-if="!notification.read_at"
                                                class="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500">
                                          </div>
                                          <div v-else class="mt-1.5 h-2 w-2 flex-shrink-0">
                                          </div>

                                          <!-- Content -->
                                          <div class="flex-1 space-y-1">
                                                <p class="text-sm leading-relaxed text-gray-900 dark:text-gray-100">
                                                      {{ notification.data.data }}
                                                </p>
                                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                                      {{ getNotificationTime(notification) }}
                                                </p>
                                          </div>
                                    </div>
                              </DropdownMenuItem>
                        </template>

                        <!-- Empty State -->
                        <div v-else class="flex flex-col items-center justify-center py-12 px-4">
                              <Bell
                                    class="h-12 w-12 fill-gray-300 text-gray-200 dark:fill-gray-600 dark:text-gray-700" />
                              <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                    No notifications yet
                              </p>
                        </div>
                  </div>

                  <!-- Footer -->
                  <DropdownMenuSeparator class="my-0" />
                  <div class="p-2">
                        <button
                              class="w-full rounded px-3 py-2 text-center text-sm font-medium text-primaryDark transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                              View all notifications
                        </button>
                  </div>
            </DropdownMenuContent>
      </DropdownMenu>
</template>

<style scoped>
/* Custom scrollbar for Tailwind scrollbar plugin */
.scrollbar-thin::-webkit-scrollbar {
      width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
      background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
      background: #cbd5e0;
      border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
      background: #a0aec0;
}
</style>