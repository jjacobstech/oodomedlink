<script setup lang="ts">
import NavBar from '@/Components/Admin/NavBar.vue';
</script>

<template>
      <video src="/assets/background.mp4" class="fixed top-0 left-0 object-cover  w-screen h-full" autoplay muted
            loop></video>
      <div class="z-50  relative w-screen ">
            <NavBar />

            <div class="h-full flex justify-center w-full  ">
                  <slot />
            </div>
      </div>

</template>