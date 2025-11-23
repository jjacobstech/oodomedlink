<script setup lang="ts">
import NavBar from '@/Components/Admin/NavBar.vue';
</script>

<template>
    <video src="/assets/background.mp4" class="fixed left-0 top-0 h-full w-screen object-cover" autoplay muted
        loop></video>
    <div class="relative z-50 w-screen">

        <div class="flex h-full w-full justify-center">
            <slot />
        </div>
    </div>
</template>
