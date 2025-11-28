<template>
    <nav
        class="navbar fixed top-0 z-50 flex w-full items-center bg-base-100 bg-white px-4 py-3 shadow-md md:px-8 lg:px-12">
        <div class="flex w-full items-center gap-5 justify-between">
            <!-- Logo -->
            <ApplicationLogo />

            <!-- Desktop Navigation -->
            <div class="hidden items-center justify-center gap-6 text-xl lg:flex xl:gap-10">

                <!-- Links -->
                <div class="flex items-center justify-center gap-6 text-xl font-extrabold xl:gap-10">
                    <Link :href="route('faq')"
                        class="relative cursor-pointer text-primaryDark duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-primaryDark after:transition-all after:duration-300 after:content-[''] hover:-translate-y-1 hover:after:w-full">
                    Help Center
                    </Link>
                    <Link :href="route('blog')"
                        class="relative cursor-pointer text-primaryDark duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-primaryDark after:transition-all after:duration-300 after:content-[''] hover:-translate-y-1 hover:after:w-full">
                    Blog
                    </Link>
                    <a href="#pricing"
                        class="relative cursor-pointer text-primaryDark duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-primaryDark after:transition-all after:duration-300 after:content-[''] hover:-translate-y-1 hover:after:w-full">
                        Pricing
                    </a>
                    <a href="#about"
                        class="relative cursor-pointer text-primaryDark duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-primaryDark after:transition-all after:duration-300 after:content-[''] hover:-translate-y-1 hover:after:w-full">
                        About Us
                    </a>
                    <a href="#career"
                        class="relative cursor-pointer text-primaryDark duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-primaryDark after:transition-all after:duration-300 after:content-[''] hover:-translate-y-1 hover:after:w-full">
                        Career
                    </a>
                </div>
            </div>

            <!-- Desktop Authentication -->
            <div class="hidden items-center justify-center gap-4 text-xl font-extrabold lg:flex xl:gap-10">
                <Link :href="route('login')"
                    class="btn btn-lg flex cursor-pointer items-center justify-center rounded-lg border-2 border-primaryDark bg-white text-xl text-primaryDark transition-all duration-200 hover:-translate-y-1 hover:bg-primaryDark hover:text-white hover:shadow-lg hover:shadow-primaryDark/30">
                Login
                </Link>
                <div @click="signup"
                    class="btn btn-lg flex cursor-pointer items-center justify-center whitespace-nowrap rounded-lg bg-primaryDark text-xl text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primaryDark/30">
                    Signup for free
                </div>
            </div>

            <!-- Mobile Menu Button -->
            <button @click="mobileMenu = !mobileMenu" class="p-2 text-primaryDark lg:hidden">
                <svg v-if="!mobileMenu" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Mobile Menu -->
        <Transition enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-200 ease-in" enter-from-class="opacity-0 -translate-y-4"
            enter-to-class="opacity-100 translate-y-0" leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-4">
            <div v-if="mobileMenu" class="absolute left-0 right-0 top-full z-50 border-t bg-white shadow-lg lg:hidden">
                <div class="flex flex-col space-y-4 p-4">
                    <!-- Mobile Searchbar -->
                    <div
                        class="group flex items-center rounded-md border-2 border-transparent shadow-lg transition-colors duration-200 focus-within:border-primaryDark">
                        <div class="px-3">
                            <Magnifer
                                class="h-5 w-auto text-gray-400 transition-colors duration-200 group-focus-within:text-primaryDark" />
                        </div>
                        <input type="text"
                            class="w-full border-none bg-transparent px-2 py-2 text-sm outline-none focus:ring-0"
                            placeholder="Search..." />
                    </div>

                    <!-- Mobile Dropdown -->
                    <div>
                        <button @click="dropMobile = !dropMobile"
                            class="btn w-full justify-between rounded bg-gray-50 text-left text-primaryDark">
                            Clinics
                            <span class="transition-transform duration-150 ease-in-out"
                                :class="{ 'rotate-180': dropMobile }">
                                <SquareAltArrowUp v-show="!dropMobile" weight="Broken" />
                                <SquareAltArrowDown v-show="dropMobile" class="rotate-180" weight="Broken" />
                            </span>
                        </button>
                        <Transition enter-active-class="transition-all duration-200"
                            leave-active-class="transition-all duration-150" enter-from-class="opacity-0 -translate-y-2"
                            enter-to-class="opacity-100 translate-y-0" leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 -translate-y-2">
                            <ul v-if="dropMobile" class="mt-2 space-y-1 rounded-md bg-primaryDark p-1">
                                <li
                                    class="rounded-md p-2 text-white transition-colors duration-150 hover:bg-white hover:text-primaryDark">
                                    <a>Item 1</a>
                                </li>
                                <li
                                    class="rounded-md p-2 text-white transition-colors duration-150 hover:bg-white hover:text-primaryDark">
                                    <a>Item 2</a>
                                </li>
                            </ul>
                        </Transition>
                    </div>

                    <!-- Mobile Links -->
                    <div class="flex flex-col space-y-3 border-t pt-2">
                        <p
                            class="cursor-pointer text-primaryDark transition-transform duration-200 hover:translate-x-1">
                            Blog
                        </p>
                        <p
                            class="cursor-pointer text-primaryDark transition-transform duration-200 hover:translate-x-1">
                            About Us
                        </p>
                    </div>

                    <!-- Mobile Auth Buttons -->
                    <div class="flex flex-col space-y-3 border-t pt-2">
                        <Link :href="route('login')"
                            class="btn flex cursor-pointer items-center justify-center rounded-lg bg-primaryDark text-white transition-all duration-200 hover:shadow-lg hover:shadow-primaryDark/30">
                        Login
                        </Link>
                        <div @click="signup"
                            class="btn flex cursor-pointer items-center justify-center rounded-lg bg-primaryDark text-white transition-all duration-200 hover:shadow-lg hover:shadow-primaryDark/30">
                            Signup for free
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </nav>

    <!-- Modal Overlay -->
    <div id="modal" autofocus v-if="selectionModal"
        class="fixed inset-0 z-50 flex h-screen items-center justify-center bg-black bg-opacity-50 p-4 py-20">
        <!-- Modal Container -->
        <div
            class="relative h-full w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 pb-20 pt-14 shadow-2xl scrollbar-none md:p-10 lg:h-max">
            <!-- Close Button -->
            <button @click="closeModal"
                class="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </button>

            <!-- Title -->
            <div class="mb-8 text-center">
                <h2 class="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
                    Select Patient Management Type
                </h2>
                <p class="text-sm text-gray-600 md:text-base">
                    Choose how you'd like to add patients to the system
                </p>
            </div>

            <!-- Options Container -->
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                <!-- Clinics Option -->
                <div @click=""
                    class="group cursor-pointer rounded-xl border-2 border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primaryDark hover:shadow-xl md:p-8">
                    <!-- Icon -->
                    <div
                        class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primaryLight transition-colors duration-300 group-hover:bg-primaryDark">
                        <svg class="h-8 w-8 text-primaryDark transition-colors duration-300 group-hover:text-white"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                            </path>
                        </svg>
                    </div>

                    <!-- Content -->
                    <h3
                        class="mb-3 text-xl font-bold text-gray-800 transition-colors group-hover:text-primaryDark md:text-2xl">
                        Clinics
                    </h3>
                    <p class="text-sm leading-relaxed text-gray-600 md:text-base">
                        Manage multiple patients efficiently through
                        clinic-based workflows and batch operations
                    </p>

                    <!-- Action Button -->
                    <Link :href="route('signup')">
                    <button
                        class="mt-6 w-full rounded-lg bg-primaryDark px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-primaryDark group-hover:shadow-lg">
                        Select Clinics
                    </button>
                    </Link>
                </div>

                <!-- Individual Option -->
                <div @click=""
                    class="group cursor-pointer rounded-xl border-2 border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primaryDark hover:shadow-xl md:p-8">
                    <!-- Icon -->
                    <div
                        class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primaryLight transition-colors duration-300 group-hover:bg-blue-500">
                        <svg class="h-8 w-8 text-primaryDark transition-colors duration-300 group-hover:text-white"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </div>

                    <!-- Content -->
                    <h3
                        class="mb-3 text-xl font-bold text-gray-800 transition-colors group-hover:text-primaryDark md:text-2xl">
                        Individual
                    </h3>
                    <p class="text-sm leading-relaxed text-gray-600 md:text-base">
                        Add patients one at a time with complete control over
                        each entry and detailed information
                    </p>

                    <!-- Action Button -->
                    <button
                        class="btn-disabled mt-6 w-full rounded-lg bg-primaryDark px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-primaryDark group-hover:shadow-lg">
                        Coming Soon...
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { onClickOutside } from '@vueuse/core';
import { ref, onMounted, onUnmounted } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import {
    SquareAltArrowUp,
    SquareAltArrowDown,
    Magnifer,
} from '@solar-icons/vue';

interface result {
    title: string;
    id: number;
    description: string;
}

const drop = ref(false);
const dropMobile = ref(false);
const dropDown = ref();
const resultDropDown = ref();
const searchResults = ref<result[]>([]);
const searchDropDown = ref(false);
const mobileMenu = ref(false);
const selectionModal = ref(false);
const selection = ref();

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

const closeModal = () => {
    selectionModal.value = false;
};

const signup = () => {
    selectionModal.value = true;
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
