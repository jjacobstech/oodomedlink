<script setup lang="ts">
import NavBar from '@/Components/Home/NavBar.vue';
</script>

<template>
    <video src="/assets/background.mp4" class="fixed left-0 top-0 h-full w-full object-cover" autoplay muted loop
        playsinline preload="auto" disablePictureInPicture webkit-playsinline></video>
    <div class="relative z-50 flex h-screen w-screen">
        <NavBar />

        <div class="h-full w-full scrollbar-none">
            <slot />
        </div>
    </div>
</template>
