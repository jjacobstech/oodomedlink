<template>
      <nav
            class="navbar bg-white fixed top-0 z-50 flex w-full bg-base-100 items-center shadow-md px-4 md:px-8 lg:px-12 py-3">
            <div class="flex justify-between items-center w-full">

                  <!-- Logo -->
                  <ApplicationLogo />

                  <!-- Desktop Navigation -->
                  <div class="hidden lg:flex justify-center text-xl items-center gap-6 xl:gap-16">
                        <!-- dropdown -->
                        <div class="flex-none ">

                              <div class="relative">
                                    <div tabindex="0" role="button" @click="drop = !drop"
                                          class="text-deepblue bg-white btn text-xl m-1 rounded">
                                          Clinics
                                          <span class="transition-all duration-150 ease-in-out"
                                                :class="{ 'rotate-180': drop }">
                                                <SquareAltArrowUp v-show="!drop" class="animate-in-out duration-150 "
                                                      weight="Broken" />
                                                <SquareAltArrowDown v-show="drop"
                                                      class="animate-in-out duration-150 rotate-180" weight="Broken" />
                                          </span>
                                    </div>
                                    <Transition v-if="drop" ref="dropDown"
                                          enter-active-class="transition-all duration-200"
                                          leave-active-class="transition-all duration-150"
                                          enter-from-class="opacity-0 translate-y-1"
                                          enter-to-class="opacity-100 translate-y-0"
                                          leave-from-class="opacity-100 translate-y-0"
                                          leave-to-class="opacity-0 translate-y-1">
                                          <ul
                                                class="dropdown-content menu bg-base-100 z-1 absolute w-52 text-xl p-1 shadow-sm menu-compact text-white bg-deepblue rounded-md">
                                                <li class="hover:bg-white hover:text-deepblue rounded-md"><a>Item 1</a>
                                                </li>
                                                <li class="hover:bg-white hover:text-deepblue rounded-md"><a>Item 2</a>
                                                </li>
                                          </ul>
                                    </Transition>
                              </div>
                        </div>

                        <!-- Searchbar -->
                        <div
                              class="flex justify-center relative items-center text-xl shadow-lg rounded-md group border-2 border-transparent focus-within:border-deepblue transition-colors duration-200 w-48 xl:w-80">
                              <div class="px-2">
                                    <Magnifer
                                          class="h-5 w-auto text-gray-400 group-focus-within:text-deepblue transition-colors duration-200" />
                              </div>
                              <input type="text" @click="loadResults"
                                    class="border-none outline-none text-xl focus:ring-0 bg-transparent py-2 px-2 w-full text-sm"
                                    placeholder="Search...">

                              <div v-if="searchDropDown" ref="resultDropDown">
                                    <div v-if="searchResults.length <= 0"
                                          class="absolute top-14  right-0 flex items-center justify-center w-full h-auto text-white bg-white shadow-lg rounded-md">
                                          <p class="text-black">No results found</p>
                                    </div>

                                    <div v-if="searchResults.length > 0"
                                          class="absolute top-11  right-0 grid px-3 py-3 items-center  w-full h-auto gap-2 text-white bg-blue-200 z-50 shadow-lg rounded-md">
                                          <div class="text-white rounded-md px-3 py-1 shadow-md bg-black w-full"
                                                v-for="result in searchResults" :key="result.id">
                                                <p>{{ result.title }}</p>
                                                <p>{{ result.description }}</p>
                                          </div>
                                    </div>
                              </div>

                        </div>

                        <!-- Links -->
                        <div class="flex justify-center items-center gap-6 xl:gap-10">
                              <p
                                    class="text-deepblue cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 hover:-translate-y-1 duration-200 after:w-0 after:h-0.5 after:bg-deepblue after:transition-all after:duration-300 hover:after:w-full">
                                    Blog
                              </p>
                              <p
                                    class="text-deepblue cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 hover:-translate-y-1 duration-200 after:w-0 after:h-0.5 after:bg-deepblue after:transition-all after:duration-300 hover:after:w-full">
                                    About Us
                              </p>
                        </div>
                  </div>

                  <!-- Desktop Authentication -->
                  <div class="hidden lg:flex justify-center items-center gap-4 text-xl xl:gap-10">
                        <Link href="/login"
                              class="flex text-white btn btn-sm text-xl xl:btn-md bg-deepblue rounded-lg justify-center items-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:shadow-deepblue/30">
                        Login
                        </Link>
                        <Link href="/signup"
                              class="flex btn btn-sm xl:btn-md text-xl text-white bg-deepgreen rounded-lg justify-center items-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:shadow-deepgreen/30 whitespace-nowrap">
                        Signup for free
                        </Link>
                  </div>

                  <!-- Mobile Menu Button -->
                  <button @click="mobileMenu = !mobileMenu" class="lg:hidden p-2 text-deepblue">
                        <svg v-if="!mobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                        </svg>
                  </button>
            </div>

            <!-- Mobile Menu -->
            <Transition enter-active-class="transition-all duration-300 ease-out"
                  leave-active-class="transition-all duration-200 ease-in" enter-from-class="opacity-0 -translate-y-4"
                  enter-to-class="opacity-100 translate-y-0" leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 -translate-y-4">
                  <div v-if="mobileMenu"
                        class="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50">
                        <div class="flex flex-col p-4 space-y-4">
                              <!-- Mobile Searchbar -->
                              <div
                                    class="flex items-center shadow-lg rounded-md group border-2 border-transparent focus-within:border-deepblue transition-colors duration-200">
                                    <div class="px-3">
                                          <Magnifer
                                                class="h-5 w-auto text-gray-400 group-focus-within:text-deepblue transition-colors duration-200" />
                                    </div>
                                    <input type="text"
                                          class="border-none outline-none focus:ring-0 bg-transparent py-2 px-2 w-full text-sm"
                                          placeholder="Search...">
                              </div>

                              <!-- Mobile Dropdown -->
                              <div>
                                    <button @click="dropMobile = !dropMobile"
                                          class="w-full text-left text-deepblue btn bg-gray-50 rounded justify-between">
                                          Clinics
                                          <span class="transition-transform duration-150 ease-in-out"
                                                :class="{ 'rotate-180': dropMobile }">
                                                <SquareAltArrowUp v-show="!dropMobile" weight="Broken" />
                                                <SquareAltArrowDown v-show="dropMobile" class="rotate-180"
                                                      weight="Broken" />
                                          </span>
                                    </button>
                                    <Transition enter-active-class="transition-all duration-200"
                                          leave-active-class="transition-all duration-150"
                                          enter-from-class="opacity-0 -translate-y-2"
                                          enter-to-class="opacity-100 translate-y-0"
                                          leave-from-class="opacity-100 translate-y-0"
                                          leave-to-class="opacity-0 -translate-y-2">
                                          <ul v-if="dropMobile" class="mt-2 bg-deepblue rounded-md p-1 space-y-1">
                                                <li
                                                      class="hover:bg-white hover:text-deepblue rounded-md transition-colors duration-150 text-white p-2">
                                                      <a>Item 1</a>
                                                </li>
                                                <li
                                                      class="hover:bg-white hover:text-deepblue rounded-md transition-colors duration-150 text-white p-2">
                                                      <a>Item 2</a>
                                                </li>
                                          </ul>
                                    </Transition>
                              </div>

                              <!-- Mobile Links -->
                              <div class="flex flex-col space-y-3 pt-2 border-t">
                                    <p
                                          class="text-deepblue cursor-pointer hover:translate-x-1 transition-transform duration-200">
                                          Blog
                                    </p>
                                    <p
                                          class="text-deepblue cursor-pointer hover:translate-x-1 transition-transform duration-200">
                                          About Us
                                    </p>
                              </div>

                              <!-- Mobile Auth Buttons -->
                              <div class="flex flex-col space-y-3 pt-2 border-t">
                                    <Link href="/login"
                                          class="flex text-white btn bg-deepblue rounded-lg justify-center items-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-deepblue/30">
                                    Login
                                    </Link>
                                    <Link href="/signup"
                                          class="flex btn text-white bg-deepgreen rounded-lg justify-center items-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-deepgreen/30">
                                    Signup for free
                                    </Link>
                              </div>
                        </div>
                  </div>
            </Transition>
      </nav>
</template>

<script setup lang="jsx">
import { Link } from '@inertiajs/vue3'
import { onClickOutside } from '@vueuse/core';
import { ref, onMounted, onUnmounted } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue'
import { SquareAltArrowUp, SquareAltArrowDown, Magnifer } from '@solar-icons/vue'

const drop = ref(false);
const dropMobile = ref(false);
const dropDown = ref();
const resultDropDown = ref();
const searchResults = ref([]);
const searchDropDown = ref(false)
const mobileMenu = ref(false);


const loadResults = async () => {
      const response = [
            {
                  title: "Test 1",
                  id: 1,
                  description: "Test 1 description"
            },
            {
                  title: "Test 2",
                  id: 2,
                  description: "Test 2 description"
            },
            {
                  title: "Test 3",
                  id: 3,
                  description: "Test 3 description"
            }
      ];
      const data = response.map((result) => {
            return {
                  id: result.id,
                  title: result.title,
                  description: result.description
            }
      })
      searchDropDown.value = true;
      searchResults.value = data
}

onClickOutside(dropDown, () => drop.value = false);
onClickOutside(resultDropDown, () => searchDropDown.value = false);

// Close mobile menu when resizing to desktop
const handleResize = () => {
      if (window.innerWidth >= 1024) {
            mobileMenu.value = false
      }
}

onMounted(() => {
      window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
})
</script>