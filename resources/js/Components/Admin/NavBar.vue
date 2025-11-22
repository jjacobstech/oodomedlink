<template>
    <nav class="navbar fixed top-0 z-50 flex w-full items-center  bg-white px-4 py-3 shadow-md md:px-8 lg:px-12">
        <div class="flex w-full items-center justify-between">
            <!-- Logo -->
            <ApplicationLogo />
        </div>

        <!-- Mobile Menu -->
        <Transition enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-200 ease-in" enter-from-class="opacity-0 -translate-y-4"
            enter-to-class="opacity-100 translate-y-0" leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-4">
            <div v-if="mobileMenu"
                class="absolute left-0 right-0 top-full z-50 border-t bg-primaryDark shadow-lg lg:hidden">
                <div class="flex flex-col space-y-4 p-4">
                    <!-- Mobile Searchbar -->
                    <div
                        class="focus-within:border-primaryDark group flex items-center rounded-md border-2 border-transparent shadow-lg transition-colors duration-200">
                        <div class="px-3">
                            <Magnifer
                                class="group-focus-within:text-primaryDark h-5 w-auto text-gray-400 transition-colors duration-200" />
                        </div>
                        <input type="text"
                            class="w-full border-none bg-transparent px-2 py-2 text-sm outline-none focus:ring-0"
                            placeholder="Search..." />
                    </div>

                    <!-- Mobile Auth Buttons -->
                    <div class="flex flex-col space-y-3 border-t pt-2">
                        <Link href="/login"
                            class="bg-primaryDark hover:shadow-primaryDark/30 btn flex cursor-pointer items-center justify-center rounded-lg text-white transition-all duration-200 hover:shadow-lg">
                        Login
                        </Link>
                        <Link href="/signup"
                            class="bg-primaryDark hover:shadow-primaryDark/30 btn flex cursor-pointer items-center justify-center rounded-lg text-white transition-all duration-200 hover:shadow-lg">
                        Admin Signup
                        </Link>
                    </div>
                </div>
            </div>
        </Transition>
    </nav>
</template>

<script setup lang="jsx">
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';
import { Magnifer } from '@solar-icons/vue';
import { onClickOutside } from '@vueuse/core';
import { onMounted, onUnmounted, ref } from 'vue';

const drop = ref(false);
const dropMobile = ref(false);
const dropDown = ref();
const resultDropDown = ref();
const searchResults = ref([]);
const searchDropDown = ref(false);
const mobileMenu = ref(false);

const loadResults = async () => {
    const response = [
        {
            title: 'Test 1',
            id: 1,
            description: 'Test 1 description',
        },
        {
            title: 'Test 2',
            id: 2,
            description: 'Test 2 description',
        },
        {
            title: 'Test 3',
            id: 3,
            description: 'Test 3 description',
        },
    ];
    const data = response.map((result) => {
        return {
            id: result.id,
            title: result.title,
            description: result.description,
        };
    });
    searchDropDown.value = true;
    searchResults.value = data;
};

onClickOutside(dropDown, () => (drop.value = false));
onClickOutside(resultDropDown, () => (searchDropDown.value = false));

// Close mobile menu when resizing to desktop
const handleResize = () => {
    if (window.innerWidth >= 1024) {
        mobileMenu.value = false;
    }
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>
