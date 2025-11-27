<template>
      <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <!-- Header -->
            <header class="bg-white shadow-sm border-b border-slate-200">
                  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div class="flex items-center justify-between">
                              <div>
                                    <h1 class="text-3xl font-bold text-slate-900">Lab Insights Blog</h1>
                                    <p class="text-slate-600 mt-1">Stay informed. Stay ahead.</p>
                              </div>
                              <div class="flex justify-between items-center gap-5">
                                    <Link href="/"
                                          class="bg-primaryDark text-xl text-white px-6 py-2 rounded-lg hover:bg-primaryDark/80 transition">
                                    Back
                                    </Link>
                                    <a href="#subscribe"
                                          class="bg-primaryDark text-white px-6 py-2 rounded-lg text-xl hover:bg-primaryDark/80 transition">
                                          Subscribe
                                    </a>
                              </div>
                        </div>
                  </div>
            </header>

            <!-- Hero Section -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <div class="bg-primaryDark   rounded-2xl p-8 text-white">
                        <h2 class="text-4xl font-bold mb-4">Transforming Healthcare Through Innovation</h2>
                        <p class="text-lg text-blue-100 max-w-3xl">
                              Explore cutting-edge insights on digital transformation, AI diagnostics, and health-tech
                              trends shaping Nigeria's healthcare landscape.
                        </p>
                  </div>
            </section>

            <!-- Categories -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div class="flex flex-wrap gap-3">
                        <button v-for="category in categories" :key="category" @click="selectedCategory = category"
                              :class="[
                                    'px-4 py-2 rounded-full text-sm font-medium transition',
                                    selectedCategory === category
                                          ? 'bg-primaryDark text-white'
                                          : 'bg-white text-slate-700 hover:bg-slate-100'
                              ]">
                              {{ category }}
                        </button>
                  </div>
            </section>

            <!-- Blog Posts Grid -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
                  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <article v-for="post in filteredPosts" :key="post.id"
                              class="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group cursor-pointer">
                              <div class="h-48">
                                    <img src="/assets/med1.jpg" alt="">
                              </div>
                              <div class="p-6 mt-3">
                                    <div class="flex items-center gap-2 mb-3">
                                          <span
                                                class="text-xs font-semibold text-primaryDark bg-blue-50 px-3 py-1 rounded-full">
                                                {{ post.category }}
                                          </span>
                                          <span
                                                class="text-xs text-primaryDark font-bold bg-white rounded-full px-2 py-1">{{
                                                      post.date }}</span>
                                    </div>
                                    <h3
                                          class="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                                          {{ post.title }}
                                    </h3>
                                    <p class="text-slate-600 mb-4 line-clamp-3">
                                          {{ post.excerpt }}
                                    </p>
                                    <div class="flex items-center justify-between">
                                          <span class="text-sm text-slate-500">{{ post.readTime }} min read</span>
                                          <span
                                                class="text-blue-600 font-medium group-hover:translate-x-1 transition inline-block">
                                                Read More →
                                          </span>
                                    </div>
                              </div>
                        </article>
                  </div>
            </section>

            <!-- Newsletter Section -->
            <section id="subscribe" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <div class="bg-primaryDark rounded-2xl p-8 text-center">
                        <h3 class="text-2xl font-bold text-white mb-3">Stay Updated</h3>
                        <p class="text-slate-300 mb-6">Get the latest insights delivered to your inbox</p>
                        <div class="flex max-w-md mx-auto gap-3">
                              <input type="email" placeholder="Enter your email"
                                    class="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 text-md font-extrabold focus:ring-primaryLight" />
                              <button
                                    class="bg-primaryLight text-primaryDark font-extrabold px-6 py-3 rounded-lg hover:bg-primaryDark hover:text-white hover:ring hover:ring-white transition text-md">
                                    Subscribe
                              </button>
                        </div>
                  </div>
            </section>
      </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const categories = [
      'All Posts',
      'Digital Transformation',
      'Patient Experience',
      'Health-Tech Trends',
      'Result Management',
      'AI & Diagnostics'
];

const selectedCategory = ref('All Posts');

const posts = [
      {
            id: 1,
            title: 'Digital Transformation in Nigerian Laboratories',
            excerpt: 'How modern labs are leveraging technology to improve efficiency, accuracy, and patient outcomes across Nigeria.',
            category: 'Digital Transformation',
            date: 'Nov 25, 2025',
            readTime: 5,
            gradient: 'from-blue-400 to-indigo-500'
      },
      {
            id: 2,
            title: 'Enhancing Patient Experience Through Digital Solutions',
            excerpt: 'Exploring innovative approaches to streamline patient interactions and improve satisfaction in diagnostic services.',
            category: 'Patient Experience',
            date: 'Nov 22, 2025',
            readTime: 4,
            gradient: 'from-purple-400 to-pink-500'
      },
      {
            id: 3,
            title: 'Health-Tech Innovation Trends in Nigeria',
            excerpt: 'A deep dive into emerging technologies reshaping healthcare delivery and diagnostics in the Nigerian market.',
            category: 'Health-Tech Trends',
            date: 'Nov 20, 2025',
            readTime: 6,
            gradient: 'from-green-400 to-teal-500'
      },
      {
            id: 4,
            title: 'Best Practices for Laboratory Result Management',
            excerpt: 'Essential strategies for secure, efficient, and compliant handling of diagnostic results in modern laboratories.',
            category: 'Result Management',
            date: 'Nov 18, 2025',
            readTime: 5,
            gradient: 'from-orange-400 to-red-500'
      },
      {
            id: 5,
            title: 'AI-Powered Diagnostics: The Future is Now',
            excerpt: 'How artificial intelligence is revolutionizing diagnostic accuracy and speed in medical laboratories.',
            category: 'AI & Diagnostics',
            date: 'Nov 15, 2025',
            readTime: 7,
            gradient: 'from-cyan-400 to-blue-500'
      },
      {
            id: 6,
            title: 'Cloud-Based Lab Management Systems',
            excerpt: 'The advantages of moving laboratory operations to the cloud for better accessibility and scalability.',
            category: 'Digital Transformation',
            date: 'Nov 12, 2025',
            readTime: 4,
            gradient: 'from-indigo-400 to-purple-500'
      },
      {
            id: 7,
            title: 'Patient-Centric Care in Modern Diagnostics',
            excerpt: 'Putting patients first: strategies for creating seamless and compassionate diagnostic experiences.',
            category: 'Patient Experience',
            date: 'Nov 10, 2025',
            readTime: 5,
            gradient: 'from-pink-400 to-rose-500'
      },
      {
            id: 8,
            title: 'Regulatory Compliance in Nigerian Health-Tech',
            excerpt: 'Navigating the regulatory landscape for health technology solutions in Nigeria\'s evolving healthcare sector.',
            category: 'Health-Tech Trends',
            date: 'Nov 8, 2025',
            readTime: 6,
            gradient: 'from-teal-400 to-green-500'
      },
      {
            id: 9,
            title: 'Machine Learning in Laboratory Diagnostics',
            excerpt: 'Practical applications of machine learning algorithms in improving diagnostic precision and efficiency.',
            category: 'AI & Diagnostics',
            date: 'Nov 5, 2025',
            readTime: 8,
            gradient: 'from-blue-500 to-cyan-500'
      }
];

const filteredPosts = computed(() => {
      if (selectedCategory.value === 'All Posts') {
            return posts;
      }
      return posts.filter(post => post.category === selectedCategory.value);
});
</script>

<style scoped>
.line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
}
</style>