<script setup lang="ts">
import { isVNode } from 'vue';
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from '.';
import { useToast } from './use-toast';

const { toasts } = useToast();
</script>

<template>
    <ToastProvider>
        <Toast v-for="toast in toasts" :key="toast.id" v-bind="toast">
            <div class="grid gap-1">
                <ToastTitle class="text-md lg:text-xl xl:text-2xl font-extrabold" v-if="toast.title">
                    <h1>
                        {{ toast.title }}
                    </h1>
                </ToastTitle>
                <template v-if="toast.description">
                    <ToastDescription v-if="isVNode(toast.description)">
                        <component :is="toast.description" />
                    </ToastDescription>
                    <ToastDescription v-else>
                        <h1>
                            {{ toast.description }}
                        </h1>
                    </ToastDescription>
                </template>
                <ToastClose />
            </div>
            <component :is="toast.action" />
        </Toast>
        <ToastViewport />
    </ToastProvider>
</template>
