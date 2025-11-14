<template>
      <div class="flex flex-col lg:flex-row bg-primaryLight h-screen overflow-hidden fixed">
            <!-- Image Section -->
            <div class="w-full lg:w-1/2 hidden md:block lg:h-screen " lazy="true">
                  <img src="/assets/med1.jpg" alt="med1" class="w-full h-full object-cover">
            </div>

            <!-- Content Section -->
            <div
                  class="w-full bg-primaryLight lg:w-1/2 flex justify-center items-center lg:py-20 lg:p-8 overflow-y-hidden lg:overflow-y-auto">
                  <slot />
            </div>
      </div>
</template>