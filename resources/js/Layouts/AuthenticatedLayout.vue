<script setup lang="ts">
import AppSidebar from '@/Components/Dashboard/AppSidebar.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/vue3';
import Toaster from '@/components/ui/toast/Toaster.vue';
import Notifications from '@/Components/Dashboard/Notifications.vue';
import { XCircle, MessageCircleDashed, Bot, Send } from 'lucide-vue-next';
import { ref, nextTick } from 'vue';
import axios from 'axios';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/components/ui/toast';




const auth = usePage().props.auth;
const chat = ref(false);
const { toast } = useToast();

interface Messages {
    id: string | number
    text: string
    sender: string
}

// The array that holds all messages
const messages = ref<Messages[]>([]);

const newMessageText = ref('');
const messageContainer = ref<HTMLDivElement | null>(null);
const loading = ref(false);

const initMessage = async () => {

    chat.value = !chat.value

    if (messages.value.length > 0) return;
    const newId = Date.now();

    try {
        // Send the message to the server
        const response = await axios.post(route('user.chat'), {
            prompt: 'Hello'
        });

        if (!response.data) {

            console.log(response.data)
            toast({
                title: 'Connection Error',
                description: '',
                type: 'foreground',
                variant: 'default',
                class: 'text-primaryDark bg-white shadow-lg',
                open: true,
            });
            loading.value = false;

            return 0;
        }


        // Add the new message to the messages array
        messages.value.push({
            id: newId,
            text: response.data,
            sender: 'AI',
        });

        loading.value = false;


        // Optional: Auto-scroll to the bottom of the chat after the DOM updates
        await nextTick();
        if (messageContainer.value) {
            messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
        }
    }
    catch (error) {
        console.log(error);
        loading.value = false;
        return;
    }
};


const sendMessage = async () => {

    if (newMessageText.value.trim() === '') return;

    const newId = Date.now();

    messages.value.push({
        id: newId,
        text: newMessageText.value,
        sender: 'User',
    });

    const prompt = newMessageText.value;
    newMessageText.value = ''; // Clear the input field
    loading.value = true;

    console.log(prompt);

    try {
        // Send the message to the server
        const response = await axios.post(route('user.chat'), {
            prompt: prompt
        });

        if (!response.data) {

            console.log(response.data)
            toast({
                title: 'Connection Error',
                description: '',
                type: 'foreground',
                variant: 'default',
                class: 'text-primaryDark bg-white shadow-lg',
                open: true,
            });
            loading.value = false;

            return 0;
        }


        // Add the new message to the messages array
        messages.value.push({
            id: newId,
            text: response.data,
            sender: 'AI',
        });

        loading.value = false;


        // Optional: Auto-scroll to the bottom of the chat after the DOM updates
        await nextTick();
        if (messageContainer.value) {
            messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
        }
    }
    catch (error) {
        console.log(error);
        loading.value = false;
        return;
    }
};

</script>

<template class="fixed h-screen bg-primaryLight">
    <SidebarProvider>
        <Toaster />
        <AppSidebar />
        <main class="relative h-screen w-full bg-primaryLight">
            <div class="flex w-full items-center justify-between bg-primaryDark/50 p-5  md:px-10">
                <div class="flex justify-start">
                    <SidebarTrigger
                        class="text-white transition-all duration-150 hover:-translate-y-1 hover:bg-white hover:text-primaryDark" />
                </div>

                <div class="flex items-center w-[25%] md:w-1/2 justify-end gap-5 md:gap-12">
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

    <transition name="fade-slide">
        <div v-if="!chat" @click="initMessage"
            class="fixed bottom-10 right-5 cursor-pointer bg-primaryDark rounded-md text-center shadow-lg p-2">
            <div class="flex w-full justify-center md:px-4 items-center">
                <MessageCircleDashed :size="50" class="text-white md:block hidden shadow-lg" />
                <MessageCircleDashed :size="30" class="text-white shadow-lg block md:hidden" />
            </div>
            <p class="text-white text-md font-extrabold px-2 py-1">Chat</p>
        </div>
    </transition>

    <transition name="fade-slide">
        <div v-if="chat" class="fixed bottom-10 right-5 bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col">
            <!-- Header -->
            <div class="flex justify-between p-4 rounded-t-lg bg-primaryDark items-center">
                <div class="flex gap-2 items-center">
                    <div class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-primaryDark">
                        <Bot class="w-6 h-6" />
                    </div>
                    <div class="grid">
                        <h1 class="text-md font-bold text-white">The Med Bot</h1>
                        <h1 class="text-sm items-center font-bold text-green-500">Online</h1>
                    </div>
                </div>
                <button @click="chat = !chat"
                    class="text-white transition-all duration-150 hover:bg-white rounded-full hover:text-primaryDark">
                    <XCircle class="w-6 h-6" />
                </button>
            </div>

            <!-- Scrollable Messages Area -->
            <div ref="messageContainer" class="flex-1 overflow-y-auto px-4 py-2 bg-gray-50">
                <h1 v-for="message in messages" class="rounded-lg my-2 text-xs p-2 max-w-[80%]" :key="message.id"
                    :class="message.sender === 'User'
                        ? 'ml-auto bg-white text-primaryDark border border-primaryDark'
                        : 'mr-auto bg-primaryDark text-white'">
                    {{ message.text ?? 'hello' }}
                </h1>
                <div v-if="loading" class="flex justify-center items-center">
                    <Spinner class="w-6 h-6 text-primaryDark mr-auto " />
                </div>
                <div v-if="messages.length === 0" class="flex justify-center items-center">
                    <Spinner class="w-6 h-6 text-primaryDark mr-auto " />
                </div>
            </div>

            <!-- Fixed Input at Bottom -->
            <div class="p-4 border-t border-gray-200 bg-white rounded-b-lg">
                <div class="flex gap-2 items-center">
                    <input v-model="newMessageText" @keyup.enter="sendMessage"
                        class="flex-1 rounded-md border border-primaryDark px-3 py-2 placeholder:font-medium placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primaryDark"
                        placeholder="Type a message..." />
                    <button @click="sendMessage"
                        class=" btn text-primaryDark rounded-md py-4 px-3 flex justify-center items-center  hover:bg-primaryDark hover:text-white">
                        <Send class="w-6 h-auto " />
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>
