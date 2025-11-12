<template>
      <nav
            class="navbar bg-white fixed top-0 z-50 flex w-full bg-base-100 items-center shadow-md px-4 md:px-8 lg:px-12 py-3">
            <div class="flex justify-between items-center w-full">

                  <!-- Logo -->
                  <ApplicationLogo />





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





                              <!-- Mobile Auth Buttons -->
                              <div class="flex flex-col space-y-3 pt-2 border-t">
                                    <Link href="/login"
                                          class="flex text-white btn bg-deepblue rounded-lg justify-center items-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-deepblue/30">
                                    Login
                                    </Link>
                                    <Link href="/signup"
                                          class="flex btn text-white bg-deepgreen rounded-lg justify-center items-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-deepgreen/30">
                                    Admin Signup
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