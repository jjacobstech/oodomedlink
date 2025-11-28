<template>

    <Head title="Home" />

    <GuestLayout>
        <!-- Hero Section -->
        <div
            class="my-20 flex w-full flex-col items-center justify-center gap-8 px-4 sm:my-32 sm:px-6 lg:my-40 lg:flex-row lg:gap-16 lg:px-12 2xl:my-44 2xl:gap-32 2xl:px-10">
            <!-- Text Content -->
            <div class="flex w-full max-w-2xl flex-col space-y-4 sm:space-y-6 lg:w-1/2">
                <h1
                    class="text-3xl font-bold leading-tight text-black sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-8xl">
                    Fast,<br />
                    Secure and<br />
                    Convenient<br />
                    Test Results
                </h1>
                <p
                    class="text-sm font-bold leading-relaxed text-gray-700 sm:text-base md:text-lg lg:text-xl 2xl:text-2xl">
                    Your health and peace of mind should not be a gamble. Oodo
                    Medlink gives you fast, secure and convenient access to your
                    lab test results anytime, anywhere.
                </p>
                <div class="w-full pt-2">
                    <div class="flex flex-col gap-3 sm:flex-row sm:gap-4">
                        <label for="email-input" class="sr-only">Email address</label>
                        <input type="email" id="email-input" v-model="email" required
                            class="flex-1 rounded-md border border-gray-300 px-3 py-2.5 text-base font-extrabold focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primaryDark sm:px-4 sm:py-3 sm:text-lg lg:text-xl"
                            placeholder="Enter your email" aria-label="Enter your email address" />
                        <button @click="startNow"
                            class="whitespace-nowrap rounded-md bg-primaryDark px-5 py-2.5 text-base font-extrabold text-white transition-opacity duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primaryDark sm:px-6 sm:py-3 sm:text-lg lg:text-xl"
                            aria-label="Start now">
                            Start Now
                        </button>
                    </div>
                </div>
            </div>

            <!-- Carousel Section -->
            <div class="flex w-full justify-center lg:w-1/2">
                <div class="w-full max-w-2xl space-y-4">
                    <!-- Main Carousel -->
                    <Carousel :plugins="[Autoplay({ delay: 5000 })]" class="w-full overflow-hidden rounded-lg shadow-lg"
                        @init-api="(val) => (emblaMainApi = val)" aria-label="Featured images carousel">
                        <CarouselContent>
                            <CarouselItem v-for="image in images" :key="image.id" class="rounded-lg">
                                <img :src="image.src" :alt="image.alt" class="h-full w-full rounded-lg object-cover" />
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>

                    <!-- Thumbnail Indicators -->
                    <Carousel class="relative w-full" @init-api="(val) => (emblaThumbnailApi = val)"
                        aria-label="Carousel navigation">
                        <CarouselContent class="ml-0 flex justify-center gap-2">
                            <CarouselItem v-for="(_, index) in images.length" :key="index"
                                class="basis-auto cursor-pointer pl-0" @click="onThumbClick(index)"
                                :aria-label="`Go to slide ${index + 1}`" role="button" tabindex="0"
                                @keydown.enter="onThumbClick(index)" @keydown.space.prevent="onThumbClick(index)">
                                <div class="transition-opacity duration-300" :class="index === selectedIndex
                                    ? 'opacity-100'
                                    : 'opacity-50'
    ">
                                    <div class="h-2 rounded-full transition-all duration-300" :class="index === selectedIndex
                                        ? 'w-16 bg-primaryDark sm:w-20'
                                        : 'w-6 bg-gray-400 sm:w-8'
    " />
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </div>

        <!-- Feature Section -->
        <section id="features" class="bg-gradient-to-b from-background to-secondary/20 py-24">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mx-auto mb-16 max-w-3xl text-center">
                    <h1 class="mb-4 text-4xl font-extrabold sm:text-5xl 2xl:text-7xl">
                        Everything You Need
                    </h1>
                    <p class="text-xl font-extrabold text-muted-foreground 2xl:text-2xl">
                        Powerful features designed specifically for modern
                        clinics
                    </p>
                </div>

                <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <Card :key="index" v-for="(feature, index) in features"
                        class="group border-none  p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1  bg-primaryDark text-white hover:shadow-lg">
                        <div
                            class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors  bg-white">
                            <component :is="feature.icon" class="h-6 w-6 text-primary" />
                        </div>
                        <h1 class="mb-3 font-extrabold lg:text-2xl">
                            {{ feature.title }}
                        </h1>
                        <p class="font-extrabold leading-relaxed text-muted-foreground text-white lg:text-xl">
                            {{ feature.description }}
                        </p>
                    </Card>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="bg-primaryDark flex items-center justify-between gap-10 px-10 text-white py-24">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-4xl">
                    <h1 class="mb-8 text-center text-4xl font-extrabold sm:text-7xl 2xl:text-7xl">
                        About Us
                    </h1>
                    <p class="mb-6 text-lg font-extrabold leading-relaxed  2xl:text-2xl">
                        Oodo Medlink is a digital platform that helps medical laboratories send test results to patients
                        instantly. The idea was inspired by real challenges many Nigerians face—long wait times,
                        repeated visits to collect printed results, and outdated systems that slow down treatment.
                    </p>
                    <p class="text-lg font-extrabold leading-relaxed 2xl:text-2xl">
                        We make result delivery fast, secure, and stress-free. With Oodo Medlink, labs upload results in
                        seconds, patients receive them instantly, and healthcare becomes more efficient for everyone.
                    </p>
                </div>
            </div>
            <img src="/assets/med2.jpg" alt="about" class="w-full  rounded-xl" />
        </section>

        <!-- <section id="about" class="bg-primaryDark text-white py-24"> -->
        <!-- <div class="container mx-auto px-4 sm:px-6 lg:px-8"> -->
        <!-- <div class="mx-auto max-w-4xl"> -->
        <!-- <h2 class="mb-8 text-center text-4xl font-extrabold sm:text-5xl 2xl:text-6xl"> -->
        <!-- Careers -->
        <!-- </h2> -->
        <!-- <p class="mb-6 text-lg font-extrabold leading-relaxed  2xl:text-2xl"> -->
        <!-- Join a team building the future of digital healthcare in Africa. -->
        <!-- We hire for engineering, design, support, sales, and lab relations. -->
        <!-- Send your CV to: support@oodomedlink.com -->
        <!-- </p> -->
        <!-- </div> -->
        <!-- </div> -->
        <!-- </section> -->

        <!-- Security Section -->
        <section id="security" class="bg-primaryLight py-24">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="mb-8 text-center text-4xl font-extrabold sm:text-5xl 2xl:text-7xl">
                    We protect every file and message with
                </h1>
                <div class="mx-auto max-w-4xl">

                    <div class="grid gap-6 md:grid-cols-2">
                        <div v-for="(item, index) in securityFeatures" :key="index"
                            class="flex items-center bg-primaryDark gap-3 rounded-lg  p-4">
                            <CheckCircle class="h-5 w-5 flex-shrink-0 text-white" />
                            <span class="font-extrabold text-white">{{ item }}</span>
                        </div>
                    </div>
                    <p class="mt-8 text-center text-lg font-extrabold text-gray-700 2xl:text-2xl">
                        Patient data stays private, safe, and fully controlled by the lab.
                    </p>
                </div>
            </div>
        </section>




        <!-- <!~~ Pricing Section ~~> -->
        <!-- <section id="pricing" class="bg-primaryLight py-24"> -->
        <!-- <div class="container mx-auto px-4 sm:px-6 lg:px-8"> -->
        <!-- <div class="mx-auto max-w-2xl text-center"> -->
        <!-- <h2 class="mb-4 text-4xl font-extrabold sm:text-5xl 2xl:text-6xl"> -->
        <!-- Pricing -->
        <!-- </h2> -->
        <!-- <p class="mb-8 text-xl font-extrabold text-gray-700 2xl:text-2xl"> -->
        <!-- Contact us for a tailored quote that fits your clinic's needs. -->
        <!-- </p> -->
        <!-- <a href="#contact" -->
        <!-- class="inline-block rounded-md bg-primaryDark px-8 py-4 text-lg font-extrabold text-white transition-opacity hover:opacity-90 2xl:text-xl"> -->
        <!-- Get in Touch -->
        <!-- </a> -->
        <!-- </div> -->
        <!-- </div> -->
        <!-- </section> -->




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