<script setup lang="ts">
import NavBar from '@/Components/Home/NavBar.vue';
</script>

<template>
    <video src="/assets/background.mp4" class="fixed top-0 left-0 object-cover  w-full h-full" autoplay muted
        loop></video>
    <div class="z-50 h-screen relative w-screen flex">
        <NavBar />

        <div class="h-full w-full scrollbar-none">
            <slot />
        </div>
    </div>

</template>