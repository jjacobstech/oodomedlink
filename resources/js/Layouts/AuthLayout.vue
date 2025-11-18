<template>
    <div class="flex h-screen w-screen flex-col bg-primaryLight lg:flex-row">
        <!-- Image Section -->
        <div
            class="hidden h-48 w-full flex-shrink-0 sm:h-64 md:h-80 lg:block lg:h-screen lg:w-1/2"
        >
            <img
                src="/assets/med1.jpg"
                alt="Medical consultation"
                class="h-full w-full object-cover"
                loading="lazy"
            />
        </div>

        <!-- Content Section -->
        <div
            class="flex w-full items-center justify-center overflow-y-hidden p-6 sm:p-8 md:p-12 lg:w-1/2 lg:p-20"
        >
            <div class="w-full max-w-md lg:max-w-lg">
                <slot />
            </div>
        </div>
    </div>
</template>
