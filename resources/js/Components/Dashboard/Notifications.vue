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
import { usePage, router } from '@inertiajs/vue3';
import { Notification } from '@/types/index';
import { computed, ref } from 'vue';
import axios from 'axios';

const page = usePage();
const notifications = computed(() => page.props.auth.notifications || []);
const isProcessing = ref<string | null>(null);
const isOpen = ref(false);

const unreadCount = computed(() =>
      notifications.value.filter((n: Notification) => !n.read_at).length
);

const markAsRead = async (notification: Notification) => {
      if (notification.read_at || isProcessing.value === notification.id) return;

      isProcessing.value = notification.id;

      try {
            const request = await axios.post(route('user.notification'), {
                  notification_id: notification.id,
            });

            console.log(request.data)



            // Reload page props to refresh notifications
            router.reload({ only: ['auth'] });
      } catch (error) {
            console.error('Error marking notification as read:', error);
      } finally {
            isProcessing.value = null;
      }
};

const markAllAsRead = async () => {
      if (unreadCount.value === 0 || isProcessing.value) return;

      isProcessing.value = 'all';

      try {
            await axios.post(route('user.notifications.mark-all-read'));
            router.reload({ only: ['auth'] });
      } catch (error) {
            console.error('Error marking all notifications as read:', error);
      } finally {
            isProcessing.value = null;
      }
};

const getNotificationTime = (notification: Notification) => {
      const date = new Date(notification.created_at);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffInSeconds < 60) return 'Just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
      return date.toLocaleDateString();
};

const handleNotificationClick = (notification: Notification) => {
      markAsRead(notification);

      // Handle navigation if notification has a link
      if (notification.data.link) {
            isOpen.value = false;
            router.visit(notification.data.link);
      }
};
</script>

<template>
      <DropdownMenu v-model:open="isOpen">
            <DropdownMenuTrigger class="relative focus:outline-none" aria-label="Notifications">
                  <div
                        class="relative flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Bell class="h-6 w-6 fill-primaryDark text-primaryLight transition-transform hover:scale-110 md:h-7 md:w-7"
                              aria-hidden="true" />
                        <Badge v-if="unreadCount > 0" variant="outline"
                              class="absolute -right-1 -top-1 h-5 min-w-[20px] animate-pulse border-red-500 bg-red-500 px-1.5 text-xs"
                              aria-label="`${unreadCount} unread notifications`">
                              <span class="font-bold text-white">
                                    {{ unreadCount > 99 ? '99+' : unreadCount }}
                              </span>
                        </Badge>
                  </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" class="w-80 mr-5 max-w-[calc(100vw-2rem)] p-0 md:w-96">

                  <!-- Header -->
                  <DropdownMenuLabel class="border-b px-4 py-3">
                        <div class="flex items-center justify-between">
                              <h3 class="text-base font-semibold">Notifications</h3>
                              <div class="flex items-center gap-2">
                                    <Badge variant="secondary" class="text-xs">
                                          {{ unreadCount }} new
                                    </Badge>
                                    <button v-if="unreadCount > 0" @click.stop="markAllAsRead"
                                          :disabled="isProcessing === 'all'"
                                          class="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                          type="button">
                                          {{ isProcessing === 'all' ? 'Marking...' : 'Mark all read' }}
                                    </button>
                              </div>
                        </div>
                  </DropdownMenuLabel>

                  <!-- Notifications List -->
                  <div class="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                        role="list">
                        <template v-if="notifications.length > 0">
                              <DropdownMenuItem v-for="notification in notifications" :key="notification.id"
                                    @click="handleNotificationClick(notification)"
                                    class="cursor-pointer border-b px-4 py-3 last:border-b-0 focus:bg-blue-50 dark:focus:bg-blue-900/20"
                                    :class="{
                                          'bg-blue-50/50 dark:bg-blue-900/10': !notification.read_at,
      'opacity-60': notification.read_at,
      'pointer-events-none': isProcessing === notification.id
}" role="listitem">
                                    <div class="flex w-full items-start gap-3">
                                          <!-- Unread Indicator -->
                                          <div v-if="!notification.read_at"
                                                class="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"
                                                aria-label="Unread">
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

                                          <!-- Processing Indicator -->
                                          <div v-if="isProcessing === notification.id" class="mt-1.5 flex-shrink-0">
                                                <div
                                                      class="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500">
                                                </div>
                                          </div>
                                    </div>
                              </DropdownMenuItem>
                        </template>

                        <!-- Empty State -->
                        <div v-else class="flex flex-col items-center justify-center py-12 px-4">
                              <Bell class="h-12 w-12 fill-gray-300 text-gray-200 dark:fill-gray-600 dark:text-gray-700"
                                    aria-hidden="true" />
                              <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                    No notifications yet
                              </p>
                        </div>
                  </div>

                  <!-- Footer -->
                  <DropdownMenuSeparator class="my-0" />

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