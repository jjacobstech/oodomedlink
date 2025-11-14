<template>

    <Head title="Home" />

    <GuestLayout>
        <!-- Hero Section -->
        <div
            class="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16 my-40 px-6 sm:px-6 lg:px-12 2xl:px-10 2xl:gap-32 2xl:my-44">
            <!-- Text Content -->
            <div class="w-full lg:w-[45%] flex flex-col space-y-6 max-w-2xl">
                <h1 class="text-4xl sm:text-4xl lg:text-6xl 2xl:text-8xl font-bold leading-tight text-black">
                    Fast,<br />
                    Secure and<br />
                    Convenient<br />
                    Test Results
                </h1>
                <p class="text-base font-bold sm:text-lg lg:text-xl 2xl:text-2xl text-gray-700 leading-relaxed">
                    Your health and peace of mind should not be a gamble. Oodo Medlink gives you fast, secure and
                    convenient access to your lab test results anytime, anywhere.
                </p>
                <div class="w-full">
                    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <label for="email-input" class="sr-only">Email address</label>
                        <input type="email" id="email-input" v-model="email"
                            class="flex-1 px-4 py-3 font-extrabold  rounded-md border text-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-primaaryDark focus:border-transparent"
                            placeholder="Enter your email" aria-label="Enter your email address">
                        <button @click="startNow"
                            class="px-6 py-3 font-extrabold  bg-primaryDark text-xl rounded-md text-white  hover:opacity-90 transition-opacity duration-300 focus:ring-2 focus:ring-primaaryDark focus:outline-none whitespace-nowrap"
                            aria-label="Start now">
                            Start Now
                        </button>
                    </div>
                </div>
            </div>

            <!-- Carousel Section -->
            <div class="w-full lg:w-[51%] ">
                <div class="w-full max-w-xl 2xl:max-w-none space-y-4">
                    <!-- Main Carousel -->
                    <Carousel :plugins="[Autoplay({ delay: 5000 })]"
                        class="relative w-full rounded-lg overflow-hidden shadow-lg 2xl:h-[600px] 2xl:w-[950px]"
                        @init-api="(val) => emblaMainApi = val" aria-label="Featured images carousel">
                        <CarouselContent>
                            <CarouselItem v-for="image in images" :key="image.id" class="rounded-lg">
                                <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover rounded-lg">
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>

                    <!-- Thumbnail Indicators -->
                    <Carousel class="relative w-full 2xl:w-[950px]" @init-api="(val) => emblaThumbnailApi = val"
                        aria-label="Carousel navigation">
                        <CarouselContent class="flex justify-center gap-2 ml-0">
                            <CarouselItem v-for="(_, index) in images.length" :key="index"
                                class="pl-0 basis-auto cursor-pointer" @click="onThumbClick(index)"
                                :aria-label="`Go to slide ${index + 1}`" role="button" tabindex="0"
                                @keydown.enter="onThumbClick(index)" @keydown.space.prevent="onThumbClick(index)">
                                <div class="transition-opacity duration-300"
                                    :class="index === selectedIndex ? 'opacity-100' : 'opacity-50'">
                                    <div class="h-2 rounded-full transition-all duration-300"
                                        :class="index === selectedIndex ? 'w-20 bg-primaryDark' : 'w-8 bg-gray-400'">
                                    </div>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </div>

        <!-- Feature Section -->
        <section class="py-24 bg-gradient-to-b from-background to-secondary/20">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-3xl mx-auto mb-16">
                    <h2 class="text-4xl sm:text-5xl font-extrabold mb-4 2xl:text-7xl">
                        Everything You Need
                    </h2>
                    <p class="text-xl 2xl:text-2xl font-extrabold text-muted-foreground">
                        Powerful features designed specifically for modern clinics
                    </p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card :key="index" v-for="(feature, index) in features"
                        class="p-8 hover:shadow-lg hover:bg-primaryDark group hover:text-white   transition-all duration-300 border-border hover:border-none bg-card/50 backdrop-blur-sm group hover:-translate-y-1">

                        <div
                            class="h-14 w-14 group-hover:bg-white rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                            <component :is="feature.icon" class="h-6 w-6 text-primary" />
                        </div>
                        <h3 class="text-2xl font-extrabold mb-3">{{ feature.title }}</h3>
                        <p class="text-muted-foreground group-hover:text-white text-xl font-extrabold leading-relaxed">
                            {{ feature.description }}
                        </p>
                    </Card>
                </div>
            </div>
        </section>

        <!-- Benefit Section -->
        <section class="py-24 bg-primaryLight ">
            <div class=" container mx-auto px-4 sm:px-6 lg:px-5  grid space-y-28">
                <div class="grid lg:grid-cols-1  gap-16 items-center">
                    <!-- Left: Text content -->
                    <div class="space-y-8 ">
                        <div>
                            <h2 class="text-4xl 2xl:text-6xl sm:text-5xl font-extrabold mb-4">
                                Why Clinics Choose Us
                            </h2>
                            <p class="text-xl 2xl:text-3xl font-extrabold ">
                                Join hundreds of healthcare providers who have transformed their workflow
                            </p>
                        </div>

                        <div class="space-y-6 font-extrabold ">
                            <div :key='benefit.title' v-for="benefit in benefits">
                                <div class="flex-shrink-0 mt-1">
                                    <CheckCircle
                                        class="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                                </div>
                                <div>
                                    <h3 class="text-3xl font-extrabold mb-2">{{ benefit.title }}</h3>
                                    <p class="text-muted-foreground text-2xl leading-relaxed">
                                        {{ benefit.description }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Stats cards  -->
                <div class="space-y-6">
                    <div v-for="stat in stats" :key="stat.title"
                        class="bg-primaryDark  p-8 text-white rounded-2xl border border-none shadow-lg">
                        <div class="text-5xl font-extrabold text-white mb-2 2xl:text-6xl">{{ stat.title }}</div>
                        <div class="text-lg font-extrabold mb-2 2xl:text-2xl">{{ stat.subject }}</div>
                        <p class="bg-primaryDark font-extrabold bg-clip-text 2xl:text-xl">
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
import { ref } from 'vue'
import { Head, router } from '@inertiajs/vue3'
import { CheckCircle, Upload, FileText, Mailbox, Shield, ClockCircle, PieChart2 } from '@solar-icons/vue'
import { watchOnce } from '@vueuse/core'
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Card from '@/components/ui/card/Card.vue'
import Autoplay from 'embla-carousel-autoplay'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import GuestFooter from '@/Components/Home/GuestFooter.vue';


const emblaMainApi = ref();
const emblaThumbnailApi = ref();
const selectedIndex = ref(0);

const email = ref('');


const images = ref([
    {
        id: 1,
        src: "/assets/med1.jpg",
        alt: "med1",
    },
    {
        id: 2,
        src: "/assets/med2.jpg",
        alt: "med2",
    },
    {
        id: 3,
        src: "/assets/med3.jpg",
        alt: "med3",
    },
]);

const benefits = ref([
    {
        title: "Reduce Administrative Burden",
        description: "Automate repetitive tasks and free up staff to focus on patient care.",
    },
    {
        title: "Improve Patient Experience",
        description: "Patients receive results faster with clear, professional communication.",
    },
    {
        title: "Enhance Security & Compliance",
        description: "Built-in encryption and audit trails ensure data protection and regulatory compliance.",
    },
    {
        title: "Scale Effortlessly",
        description: "Handle growing patient volumes without adding administrative overhead.",
    },
]);

const stats = ref([
    {
        title: "80%",
        subject: "Time Saved",
        description: "On average, clinics reduce administrative work by 80% using our platform",
    },
    {
        title: "4.9/5",
        subject: "Customer Rating",
        description: "Highly rated by healthcare professionals for ease of use and reliability",
    },
    {
        title: "<5min",
        subject: "Average Setup",
        description: "Get started in minutes with our intuitive onboarding process",
    }
]);

const features = ref([
    {
        icon: Upload,
        title: "Easy Upload",
        description: "Drag and drop test results in any format. Bulk upload support for multiple patients.",
    },
    {
        icon: FileText,
        title: "Smart Management",
        description: "Organize, categorize, and search through all test results with powerful filters.",
    },
    {
        icon: Mailbox,
        title: "Automated Delivery",
        description: "Send results directly to patients via secure email with customizable templates.",
    },
    {
        icon: Shield,
        title: "HIPAA Compliant",
        description: "End-to-end encryption and compliance with healthcare data protection standards.",
    },
    {
        icon: ClockCircle,
        title: "Save Time",
        description: "Reduce manual work by 80%. Automated workflows free up your staff's time.",
    },
    {
        icon: PieChart2,
        title: "Analytics",
        description: "Track delivery status, patient engagement, and workflow efficiency metrics.",
    },
]);



const onSelect = () => {
    if (!emblaMainApi.value || !emblaThumbnailApi.value)
        return
    selectedIndex.value = emblaMainApi.value.selectedScrollSnap()
    emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap())
}

const onThumbClick = (index) => {
    if (!emblaMainApi.value || !emblaThumbnailApi.value)
        return
    emblaMainApi.value.scrollTo(index)
}

watchOnce(emblaMainApi, (emblaMainApi) => {
    if (!emblaMainApi)
        return

    onSelect()
    emblaMainApi.on("select", onSelect)
    emblaMainApi.on("reInit", onSelect)
})


const startNow = () => {

    sessionStorage.setItem('email', email.value);
    return router.get('/signup');

}


</script>