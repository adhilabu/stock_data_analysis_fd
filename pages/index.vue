<template>
    <ULandingHero :title="pageData.hero.title" :description="pageData.hero.description" :links="pageData.hero.links" />
    <div class="container">
        <header>
            <UCarousel ref="carouselRef" v-slot="{ item }" :items="imageItems" :ui="{ item: 'basis-1/4' }"
                class="rounded-lg overflow-hidden" indicators>
                <img :src="item" class="w-full" draggable="false">
            </UCarousel>
        </header>
        <main>
        </main>
        <UDivider label="" class="pt-5" />

    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue'

const pageData = {
    hero: {
        title: 'Aksyon - Stocks Analysis',
        description: 'Aksyon - Stocks Analysis',
        links: [
            { label: 'Get Started', href: '/analyse' },
            { label: 'Learn More', href: '/about' },
        ],
    },
}

const imageItems = [
    '/stock1.jpeg',
    '/stock2.png',
    '/stock3.jpeg',
    '/stock4.jpeg',
    '/stock5.jpeg',
    '/stock6.jpeg',
]

const carouselRef = ref()

onMounted(() => {
    setInterval(() => {
        if (!carouselRef.value) return

        if (carouselRef.value.page === carouselRef.value.pages) {
            return carouselRef.value.select(0)
        }

        carouselRef.value.next()
    }, 3000)
})

const page = ref({
    title: 'Aksyon - Stocks Analysis',
    description: 'Aksyon - Stocks Analysis'
})

// useSeoMeta({
//     titleTemplate: '',
//     title: page.value.title,
//     ogTitle: page.value.title,
//     description: page.value.description,
//     ogDescription: page.value.description
// })
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

header {
    margin-bottom: 2rem;
}

main {
    display: flex;
    justify-content: center;
}
</style>
