<template>

    <Head title="Home" />

    <GuestLayout>

        <!-- Hero Section -->
        <div
            class="flex h-screen flex-col-reverse lg:flex-row items-center justify-between gap-10 px-4 pt-20  sm:px-6 lg:px-12   2xl:px-20">

            <!-- Text Content -->
            <div class="w-full md:w-1/2 flex  items-center max-w-xl space-y-5 text-center lg:text-left lg:max-w-2xl">
                <div>
                    <h1
                        class="text-3xl sm:text-5xl md:text-6xl lg:text-6xl 2xl:text-8xl font-extrabold text-black leading-tight">
                        Fast,<br />
                        Secure and<br />
                        Convenient<br />
                        Test Results
                    </h1>

                    <p class="text-sm sm:text-lg lg:text-xl 2xl:text-2xl font-semibold text-gray-700 leading-relaxed">
                        Your health and peace of mind should not be a gamble. Oodo Medlink gives you fast, secure and
                        convenient access to your lab test results anytime, anywhere.
                    </p>

                    <!-- Email Input -->
                    <div class="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full">
                        <input type="email" id="email-input" v-model="email"
                            class="w-full rounded-md border border-gray-300 px-3 py-2.5 sm:px-4 sm:py-3 text-base sm:text-lg lg:text-xl font-semibold focus:ring-2 focus:ring-primaryDark focus:outline-none"
                            placeholder="Enter your email" />

                        <button @click="startNow"
                            class="w-full sm:w-auto whitespace-nowrap rounded-md bg-primaryDark px-5 py-2.5 sm:px-6 sm:py-3 text-base sm:text-lg lg:text-xl font-bold text-white hover:opacity-90 transition">
                            Start Now
                        </button>
                    </div>
                </div>
            </div>

            <!-- Image Carousel -->
            <div class="w-full md:w-1/2 max-w-2xl mx-auto lg:w-1/2">
                <Carousel :plugins="[Autoplay({ delay: 5000 })]" class="w-full rounded-xl shadow-lg overflow-hidden"
                    @init-api="(val) => (emblaMainApi = val)">
                    <CarouselContent>
                        <CarouselItem v-for="image in images" :key="image.id">
                            <img :src="image.src" :alt="image.alt"
                                class="w-full h-64 sm:h-80 md:h-[26rem] object-cover rounded-xl" />
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>

                <!-- Indicators -->
                <Carousel class="mt-4 w-full" @init-api="(val) => (emblaThumbnailApi = val)">
                    <CarouselContent class="flex justify-center gap-2">
                        <CarouselItem v-for="(_, index) in images.length" :key="index"
                            class="basis-auto cursor-pointer pl-0" @click="onThumbClick(index)">
                            <div :class="index === selectedIndex ? 'opacity-100' : 'opacity-40'" class="transition">
                                <div :class="index === selectedIndex
                                    ? 'w-12 sm:w-16 bg-primaryDark'
                                    : 'w-5 bg-gray-400'" class="h-2 rounded-full transition-all">
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
        </div>

        <!-- Features Section -->
        <section id="features" class="bg-white/70 py-20">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-3xl mx-auto mb-16">
                    <h1 class="text-3xl sm:text-5xl 2xl:text-7xl font-extrabold mb-4">Everything You Need</h1>
                    <p class="text-lg sm:text-xl 2xl:text-2xl text-muted-foreground font-semibold">
                        Powerful features designed specifically for modern clinics
                    </p>
                </div>

                <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <Card v-for="(feature, index) in features" :key="index"
                        class="group border-none p-8 bg-primaryDark text-white rounded-xl hover:-translate-y-1 hover:shadow-xl transition-all backdrop-blur-sm">

                        <div class="h-14 w-14 mb-6 flex items-center justify-center bg-white rounded-2xl shadow-sm">
                            <component :is="feature.icon" class="h-6 w-6 text-primaryDark" />
                        </div>

                        <h2 class="text-xl lg:text-2xl font-extrabold mb-3">{{ feature.title }}</h2>

                        <p class="font-semibold text-white/80 lg:text-xl">
                            {{ feature.description }}
                        </p>
                    </Card>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="bg-primaryDark py-24 text-white">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">

                <div class="max-w-3xl">
                    <h1 class="text-4xl sm:text-6xl font-extrabold text-center lg:text-left mb-8">
                        About Us
                    </h1>
                    <p class="text-lg sm:text-xl 2xl:text-2xl font-semibold mb-6">
                        Oodo Medlink is a digital platform that helps medical laboratories send
                        test results to patients instantly. Inspired by real challenges many Nigerians
                        face — long wait times, repeated visits to collect printed results, and outdated
                        systems that slow down treatment.
                    </p>
                    <p class="text-lg sm:text-xl 2xl:text-2xl font-semibold">
                        We make result delivery fast, secure and stress-free. With Oodo Medlink,
                        labs upload results in seconds and patients receive them instantly.
                    </p>
                </div>

                <div class="w-full lg:w-1/2">
                    <img src="/assets/med2.jpg" alt="about"
                        class="rounded-xl shadow-lg w-full object-cover max-h-[450px]" />
                </div>

            </div>
        </section>

        <!-- Security Section -->
        <section id="security" class="bg-primaryLight py-24">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="text-center text-3xl sm:text-5xl 2xl:text-7xl font-extrabold mb-12">
                    We protect every file and message with
                </h1>

                <div class="max-w-4xl mx-auto">
                    <div class="grid gap-6 md:grid-cols-2">
                        <div v-for="(item, index) in securityFeatures" :key="index" :class="[
                            'flex items-center bg-primaryDark text-white gap-3 rounded-lg p-4 shadow',
                            index === securityFeatures.length - 1 && securityFeatures.length % 2 !== 0 ? 'md:col-span-2 md:max-w-md md:mx-auto' : ''
                        ]">
                            <CheckCircle class="h-6 w-6" />
                            <span class="font-bold">{{ item }}</span>
                        </div>
                    </div>

                    <p class="mt-8 text-center text-lg sm:text-xl 2xl:text-2xl font-semibold text-gray-700">
                        Patient data stays private, safe and fully controlled by the lab.
                    </p>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <GuestFooter />

    </GuestLayout>
</template>

<script setup>
import GuestFooter from '@/Components/Home/GuestFooter.vue';
import Card from '@/components/ui/card/Card.vue';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { Head, router } from '@inertiajs/vue3';
import {
    CheckCircle,
    FileText,
    PieChart2,
    DiplomaVerified,
    Upload,
    Bell,
    Buildings2,
    Phone,
} from '@solar-icons/vue';
import { ChevronRight, MapPin, Mail, Bot } from 'lucide-vue-next'
import { watchOnce } from '@vueuse/core';
import Autoplay from 'embla-carousel-autoplay';
import { ref } from 'vue';

const emblaMainApi = ref();
const emblaThumbnailApi = ref();
const selectedIndex = ref(0);

const email = ref('');

const images = ref([
    {
        id: 1,
        src: '/assets/med1.jpg',
        alt: 'med1',
    },
    {
        id: 2,
        src: '/assets/med2.jpg',
        alt: 'med2',
    },
    {
        id: 3,
        src: '/assets/med3.jpg',
        alt: 'med3',
    },
]);

const benefits = ref([
    {
        title: 'Reduce Administrative Burden',
        description:
            'Automate repetitive tasks and free up staff to focus on patient care.',
    },
    {
        title: 'Improve Patient Experience',
        description:
            'Patients receive results faster with clear, professional communication.',
    },
    {
        title: 'Enhance Security & Compliance',
        description:
            'Built-in encryption and audit trails ensure data protection and regulatory compliance.',
    },
    {
        title: 'Scale Effortlessly',
        description:
            'Handle growing patient volumes without adding administrative overhead.',
    },
]);

const stats = ref([
    {
        title: '80%',
        subject: 'Time Saved',
        description:
            'On average, clinics reduce administrative work by 80% using our platform',
    },
    {
        title: '4.9/5',
        subject: 'Customer Rating',
        description:
            'Highly rated by healthcare professionals for ease of use and reliability',
    },
    {
        title: '<5min',
        subject: 'Average Setup',
        description:
            'Get started in minutes with our intuitive onboarding process',
    },
]);

const features = ref([
    {
        icon: Upload,
        title: 'Instant Delivery',
        description: 'Upload and send results directly to patients via WhatsApp or email.',
    },
    {
        icon: FileText,
        title: 'Secure Storage',
        description: 'Safely store digital copies of all results in an organized, encrypted system.',
    },
    {
        icon: Bot,
        title: 'AI Result Explanation',
        description: 'Provide simple summaries to help patients understand their results.',
    },
    {
        icon: Bell,
        title: 'Automated Notifications',
        description:
            'Notify patients immediately when results are ready',
    },
    {
        icon: PieChart2,
        title: 'Performance Reports',
        description:
            'Monthly insights to help labs track efficiency.',
    },
    {
        icon: Buildings2,
        title: 'Multi-Branch Support',
        description:
            "Manage multiple lab locations from one dashboard.",
    },
]);

const securityFeatures = ref([
    'End-to-end encryption',
    'Secure cloud backup',
    'Strict access control for lab staff',
    'Encrypted download links for patients',
    'Regular security audits'
]);

const integrationFeatures = ref([
    'Simple drag-and-drop result upload',
    'Optional LIS integration',
    'Direct WhatsApp and email sending',
    'API for advanced automation'
]);

const documentationFeatures = ref([
    'Setup instructions',
    'Permissions and user roles',
    'File upload formats',
    'API documentation',
    'Security standards',
    'Frequently asked questions'
]);

const onSelect = () => {
    if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
    selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
    emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
};

const onThumbClick = (index) => {
    if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
    emblaMainApi.value.scrollTo(index);
};

watchOnce(emblaMainApi, (emblaMainApi) => {
    if (!emblaMainApi) return;

    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
});

const startNow = () => {
    sessionStorage.setItem('email', email.value);
    return router.get(route('signup'));
};
</script>