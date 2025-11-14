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
                                          class="text-primaryDark bg-white btn text-xl m-1 rounded">
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
                                                class="dropdown-content menu bg-base-100 z-1 absolute w-52 text-xl p-1 shadow-sm menu-compact text-white bg-primaryDark rounded-md">
                                                <li class="hover:bg-white hover:text-primaryDark rounded-md"><a>Item
                                                            1</a>
                                                </li>
                                                <li class="hover:bg-white hover:text-primaryDark rounded-md"><a>Item
                                                            2</a>
                                                </li>
                                          </ul>
                                    </Transition>
                              </div>
                        </div>

                        <!-- Searchbar -->
                        <div
                              class="flex justify-center relative items-center text-xl shadow-lg rounded-md group border-2 border-transparent focus-within:border-primaryDark transition-colors duration-200 w-48 xl:w-80">
                              <div class="px-2">
                                    <Magnifer
                                          class="h-5 w-auto text-gray-400 group-focus-within:text-primaryDark transition-colors duration-200" />
                              </div>
                              <input type="text" @click="loadResults"
                                    class="border-none outline-none text-xl focus:ring-0 bg-transparent py-2 px-2 w-full "
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
                        <div class="flex justify-center font-extrabold text-xl items-center gap-6 xl:gap-10">
                              <p
                                    class="text-primaryDark cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 hover:-translate-y-1 duration-200 after:w-0 after:h-0.5 after:bg-primaryDark after:transition-all after:duration-300 hover:after:w-full">
                                    Blog
                              </p>
                              <p
                                    class="text-primaryDark cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 hover:-translate-y-1 duration-200 after:w-0 after:h-0.5 after:bg-primaryDark after:transition-all after:duration-300 hover:after:w-full">
                                    About Us
                              </p>
                        </div>
                  </div>

                  <!-- Desktop Authentication -->
                  <div class="hidden lg:flex font-extrabold  justify-center items-center gap-4 text-xl xl:gap-10">
                        <Link :href="route('login')"
                              class="flex text-primaryDark btn btn-lg text-xl  bg-white border-2 border-primaryDark rounded-lg justify-center hover:bg-primaryDark hover:text-white items-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:shadow-primaryDark/30">
                        Login
                        </Link>
                        <div @click="signup"
                              class="flex btn btn-lg  text-xl text-white bg-primaryDark rounded-lg justify-center items-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:shadow-primaryDark/30 whitespace-nowrap">
                              Signup for free
                        </div>
                  </div>

                  <!-- Mobile Menu Button -->
                  <button @click="mobileMenu = !mobileMenu" class="lg:hidden p-2 text-primaryDark">
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
                                    class="flex items-center shadow-lg rounded-md group border-2 border-transparent focus-within:border-primaryDark transition-colors duration-200">
                                    <div class="px-3">
                                          <Magnifer
                                                class="h-5 w-auto text-gray-400 group-focus-within:text-primaryDark transition-colors duration-200" />
                                    </div>
                                    <input type="text"
                                          class="border-none outline-none focus:ring-0 bg-transparent py-2 px-2 w-full text-sm"
                                          placeholder="Search...">
                              </div>

                              <!-- Mobile Dropdown -->
                              <div>
                                    <button @click="dropMobile = !dropMobile"
                                          class="w-full text-left text-primaryDark btn bg-gray-50 rounded justify-between">
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
                                          <ul v-if="dropMobile" class="mt-2 bg-primaryDark rounded-md p-1 space-y-1">
                                                <li
                                                      class="hover:bg-white hover:text-primaryDark rounded-md transition-colors duration-150 text-white p-2">
                                                      <a>Item 1</a>
                                                </li>
                                                <li
                                                      class="hover:bg-white hover:text-primaryDark rounded-md transition-colors duration-150 text-white p-2">
                                                      <a>Item 2</a>
                                                </li>
                                          </ul>
                                    </Transition>
                              </div>

                              <!-- Mobile Links -->
                              <div class="flex flex-col space-y-3 pt-2 border-t">
                                    <p
                                          class="text-primaryDark cursor-pointer hover:translate-x-1 transition-transform duration-200">
                                          Blog
                                    </p>
                                    <p
                                          class="text-primaryDark cursor-pointer hover:translate-x-1 transition-transform duration-200">
                                          About Us
                                    </p>
                              </div>

                              <!-- Mobile Auth Buttons -->
                              <div class="flex flex-col space-y-3 pt-2 border-t">
                                    <Link :href="route('login')"
                                          class="flex text-white btn bg-primaryDark rounded-lg justify-center items-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-primaryDark/30">
                                    Login
                                    </Link>
                                    <div @click="signup"
                                          class="flex btn text-white bg-primaryDark rounded-lg justify-center items-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-primaryDark/30">
                                          Signup for free
                                    </div>
                              </div>
                        </div>
                  </div>
            </Transition>
      </nav>


      <!-- Modal Overlay -->
      <div id="modal" autofocus v-if="selectionModal"
            class="fixed inset-0 py-20 h-screen z-50 flex  items-center justify-center bg-black bg-opacity-50 p-4">

            <!-- Modal Container -->
            <div
                  class="bg-white h-full lg:h-max overflow-y-auto scrollbar-none rounded-2xl shadow-2xl pb-20  pt-14 max-w-4xl w-full p-6 md:p-10 relative">

                  <!-- Close Button -->
                  <button @click="closeModal"
                        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                  </button>

                  <!-- Title -->
                  <div class="text-center mb-8">
                        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Select Patient Management
                              Type</h2>
                        <p class="text-gray-600 text-sm md:text-base">Choose how you'd like to add patients to the
                              system</p>
                  </div>

                  <!-- Options Container -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                        <!-- Clinics Option -->
                        <div @click=""
                              class="group cursor-pointer bg-white border-2 border-gray-200 hover:border-primaryDark rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

                              <!-- Icon -->
                              <div
                                    class="w-16 h-16 bg-primaryLight rounded-full flex items-center justify-center mb-4 group-hover:bg-primaryDark transition-colors duration-300">
                                    <svg class="w-8 h-8 text-primaryDark group-hover:text-white transition-colors duration-300"
                                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                                          </path>
                                    </svg>
                              </div>

                              <!-- Content -->
                              <h3
                                    class="text-xl md:text-2xl font-bold text-gray-800 mb-3 group-hover:text-primaryDark transition-colors">
                                    Clinics</h3>
                              <p class="text-gray-600 text-sm md:text-base leading-relaxed">Manage multiple
                                    patients efficiently through clinic-based workflows and batch operations</p>

                              <!-- Action Button -->
                              <Link :href="route('signup')">
                              <button
                                    class="mt-6 w-full bg-primaryDark hover:bg-primaryDark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 group-hover:shadow-lg">
                                    Select Clinics
                              </button>
                              </Link>

                        </div>

                        <!-- Individual Option -->
                        <div @click=""
                              class="group cursor-pointer bg-white border-2 border-gray-200 hover:border-primaryDark rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

                              <!-- Icon -->
                              <div
                                    class="w-16 h-16 bg-primaryLight rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors duration-300">
                                    <svg class="w-8 h-8 text-primaryDark group-hover:text-white transition-colors duration-300"
                                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                          </path>
                                    </svg>
                              </div>

                              <!-- Content -->
                              <h3
                                    class="text-xl md:text-2xl font-bold text-gray-800 mb-3 group-hover:text-primaryDark transition-colors">
                                    Individual</h3>
                              <p class="text-gray-600 text-sm md:text-base leading-relaxed">Add patients one at a
                                    time with complete control over each entry and detailed information</p>

                              <!-- Action Button -->
                              <button
                                    class="mt-6 w-full btn-disabled bg-primaryDark hover:bg-primaryDark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 group-hover:shadow-lg">
                                    Coming Soon...
                              </button>
                        </div>

                  </div>
            </div>
      </div>
</template>

<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { onClickOutside } from '@vueuse/core';
import { ref, onMounted, onUnmounted } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue'
import { SquareAltArrowUp, SquareAltArrowDown, Magnifer } from '@solar-icons/vue'

interface result {
      title: string,
      id: number,
      description: string
}

const drop = ref(false);
const dropMobile = ref(false);
const dropDown = ref();
const resultDropDown = ref();
const searchResults = ref<result[]>([]);
const searchDropDown = ref(false)
const mobileMenu = ref(false);
const selectionModal = ref(false);
const selection = ref();


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

const closeModal = () => {
      selectionModal.value = false;
}

const signup = () => {
      selectionModal.value = true;
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