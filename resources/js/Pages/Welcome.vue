<template>
    <Head title="Home" />

    <GuestLayout>
        <!-- Hero Section -->
        <div
            class="my-20 flex w-full flex-col items-center justify-center gap-8 px-4 sm:my-32 sm:px-6 lg:my-40 lg:flex-row lg:gap-16 lg:px-12 2xl:my-44 2xl:gap-32 2xl:px-10"
        >
            <!-- Text Content -->
            <div
                class="flex w-full max-w-2xl flex-col space-y-4 sm:space-y-6 lg:w-1/2"
            >
                <h1
                    class="text-3xl font-bold leading-tight text-black sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-8xl"
                >
                    Fast,<br />
                    Secure and<br />
                    Convenient<br />
                    Test Results
                </h1>
                <p
                    class="text-sm font-bold leading-relaxed text-gray-700 sm:text-base md:text-lg lg:text-xl 2xl:text-2xl"
                >
                    Your health and peace of mind should not be a gamble. Oodo
                    Medlink gives you fast, secure and convenient access to your
                    lab test results anytime, anywhere.
                </p>
                <div class="w-full pt-2">
                    <form
                        @submit.prevent="startNow"
                        class="flex flex-col gap-3 sm:flex-row sm:gap-4"
                    >
                        <label for="email-input" class="sr-only"
                            >Email address</label
                        >
                        <input
                            type="email"
                            id="email-input"
                            v-model="email"
                            required
                            class="flex-1 rounded-md border border-gray-300 px-3 py-2.5 text-base font-extrabold focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primaryDark sm:px-4 sm:py-3 sm:text-lg lg:text-xl"
                            placeholder="Enter your email"
                            aria-label="Enter your email address"
                        />
                        <button
                            type="submit"
                            class="whitespace-nowrap rounded-md bg-primaryDark px-5 py-2.5 text-base font-extrabold text-white transition-opacity duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primaryDark sm:px-6 sm:py-3 sm:text-lg lg:text-xl"
                            aria-label="Start now"
                        >
                            Start Now
                        </button>
                    </form>
                </div>
            </div>

            <!-- Carousel Section -->
            <div class="flex w-full justify-center lg:w-1/2">
                <div class="w-full max-w-2xl space-y-4">
                    <!-- Main Carousel -->
                    <Carousel
                        :plugins="[Autoplay({ delay: 5000 })]"
                        class="w-full overflow-hidden rounded-lg shadow-lg"
                        @init-api="(val) => (emblaMainApi = val)"
                        aria-label="Featured images carousel"
                    >
                        <CarouselContent>
                            <CarouselItem
                                v-for="image in images"
                                :key="image.id"
                                class="rounded-lg"
                            >
                                <img
                                    :src="image.src"
                                    :alt="image.alt"
                                    class="h-full w-full rounded-lg object-cover"
                                />
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>

                    <!-- Thumbnail Indicators -->
                    <Carousel
                        class="relative w-full"
                        @init-api="(val) => (emblaThumbnailApi = val)"
                        aria-label="Carousel navigation"
                    >
                        <CarouselContent class="ml-0 flex justify-center gap-2">
                            <CarouselItem
                                v-for="(_, index) in images.length"
                                :key="index"
                                class="basis-auto cursor-pointer pl-0"
                                @click="onThumbClick(index)"
                                :aria-label="`Go to slide ${index + 1}`"
                                role="button"
                                tabindex="0"
                                @keydown.enter="onThumbClick(index)"
                                @keydown.space.prevent="onThumbClick(index)"
                            >
                                <div
                                    class="transition-opacity duration-300"
                                    :class="
                                        index === selectedIndex
                                            ? 'opacity-100'
                                            : 'opacity-50'
                                    "
                                >
                                    <div
                                        class="h-2 rounded-full transition-all duration-300"
                                        :class="
                                            index === selectedIndex
                                                ? 'w-16 bg-primaryDark sm:w-20'
                                                : 'w-6 bg-gray-400 sm:w-8'
                                        "
                                    />
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </div>

        <!-- Feature Section -->
        <section class="bg-gradient-to-b from-background to-secondary/20 py-24">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mx-auto mb-16 max-w-3xl text-center">
                    <h2
                        class="mb-4 text-4xl font-extrabold sm:text-5xl 2xl:text-7xl"
                    >
                        Everything You Need
                    </h2>
                    <p
                        class="text-xl font-extrabold text-muted-foreground 2xl:text-2xl"
                    >
                        Powerful features designed specifically for modern
                        clinics
                    </p>
                </div>

                <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <Card
                        :key="index"
                        v-for="(feature, index) in features"
                        class="group border-border bg-card/50 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-none hover:bg-primaryDark hover:text-white hover:shadow-lg"
                    >
                        <div
                            class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20 group-hover:bg-white"
                        >
                            <component
                                :is="feature.icon"
                                class="h-6 w-6 text-primary"
                            />
                        </div>
                        <h3 class="mb-3 font-extrabold lg:text-2xl">
                            {{ feature.title }}
                        </h3>
                        <p
                            class="font-extrabold leading-relaxed text-muted-foreground group-hover:text-white lg:text-xl"
                        >
                            {{ feature.description }}
                        </p>
                    </Card>
                </div>
            </div>
        </section>

        <!-- Benefit Section -->
        <section class="bg-primaryLight py-24">
            <div class="container mx-auto grid space-y-28 px-4 sm:px-6 lg:px-5">
                <div class="grid items-center gap-16 lg:grid-cols-1">
                    <!-- Left: Text content -->
                    <div class="space-y-8">
                        <div>
                            <h2
                                class="mb-4 text-4xl font-extrabold sm:text-5xl 2xl:text-6xl"
                            >
                                Why Clinics Choose Us
                            </h2>
                            <p class="text-xl font-extrabold 2xl:text-3xl">
                                Join hundreds of healthcare providers who have
                                transformed their workflow
                            </p>
                        </div>

                        <div class="space-y-6 font-extrabold">
                            <div
                                :key="benefit.title"
                                v-for="benefit in benefits"
                            >
                                <div class="mt-1 flex-shrink-0">
                                    <CheckCircle
                                        class="h-6 w-6 text-primary transition-transform group-hover:scale-110"
                                    />
                                </div>
                                <div>
                                    <h3 class="mb-2 font-extrabold lg:text-3xl">
                                        {{ benefit.title }}
                                    </h3>
                                    <p
                                        class="leading-relaxed text-muted-foreground lg:text-2xl"
                                    >
                                        {{ benefit.description }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Stats cards  -->
                <div class="space-y-6">
                    <div
                        v-for="stat in stats"
                        :key="stat.title"
                        class="rounded-2xl border border-none bg-primaryDark p-8 text-white shadow-lg"
                    >
                        <div
                            class="mb-2 font-extrabold text-white md:text-5xl 2xl:text-6xl"
                        >
                            {{ stat.title }}
                        </div>
                        <div
                            class="mb-2 font-extrabold md:text-lg 2xl:text-2xl"
                        >
                            {{ stat.subject }}
                        </div>
                        <p
                            class="bg-primaryDark bg-clip-text font-extrabold 2xl:text-xl"
                        >
                            {{ stat.description }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- footer -->
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
    ClockCircle,
    FileText,
    Mailbox,
    PieChart2,
    Shield,
    Upload,
} from '@solar-icons/vue';
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
        title: 'Easy Upload',
        description:
            'Drag and drop test results in any format. Bulk upload support for multiple patients.',
    },
    {
        icon: FileText,
        title: 'Smart Management',
        description:
            'Organize, categorize, and search through all test results with powerful filters.',
    },
    {
        icon: Mailbox,
        title: 'Automated Delivery',
        description:
            'Send results directly to patients via secure email with customizable templates.',
    },
    {
        icon: Shield,
        title: 'HIPAA Compliant',
        description:
            'End-to-end encryption and compliance with healthcare data protection standards.',
    },
    {
        icon: ClockCircle,
        title: 'Save Time',
        description:
            "Reduce manual work by 80%. Automated workflows free up your staff's time.",
    },
    {
        icon: PieChart2,
        title: 'Analytics',
        description:
            'Track delivery status, patient engagement, and workflow efficiency metrics.',
    },
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
    return router.get('/signup');
};
</script>
