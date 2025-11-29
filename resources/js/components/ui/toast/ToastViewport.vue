<script setup lang="ts">
import { cn } from '@/lib/utils';
import { reactiveOmit } from '@vueuse/core';
import type { ToastViewportProps } from 'reka-ui';
import { ToastViewport } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<
    ToastViewportProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <ToastViewport v-bind="delegatedProps" :class="cn(
        // The updated class string:
        'fixed top-10 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:flex-col md:max-w-[420px]',
        props.class,
    )
    " />
</template>
