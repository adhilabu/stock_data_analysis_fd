<template>
    <div class="container">
        <ULandingHero :title="pageData.hero.title" :description="pageData.hero.description" :links="pageData.hero.links" />
        <UContainer class="centered-container">
            <div class="info-section">
                <h2 class="info-title">{{ pageData.hero.title }}</h2>
                <p class="info-description">{{ pageData.hero.description }}</p>
                <div class="buttons-container">
                    <UButton 
                        v-for="(link, index) in pageData.hero.links" 
                        :key="index" 
                        :icon="link.icon"
                        :color="link.color"
                        :target="link.target"
                        :to="link.to"
                        :href="link.to"
                        class="link-button"
                    >
                        {{ link.label }}
                    </UButton>
                </div>
            </div>
            <header>
                <UCarousel ref="carouselRef" v-slot="{ item }" :items="imageItems" :ui="{ item: 'basis-1/4' }"
                    class="rounded-lg overflow-hidden" indicators>
                    <img :src="item" class="w-full" draggable="false">
                </UCarousel>
            </header>
            <main>
                <!-- Main content goes here -->
            </main>
            <UDivider label="" class="pt-5" />
        </UContainer>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const pageData = {
    hero: {
        title: 'Aksyon - Stocks Analysis',
        description: 'Aksyon - Stocks Analysis',
        links: [
            { label: 'Get Levels', icon: 'i-heroicons-rocket-launch', size: 'lg', to: '/levels' },
            { label: 'Learn More', to: '/about' },
            { label: 'Continue with GitHub', icon: 'i-simple-icons-github', color: 'gray', target: '_blank', to: 'https://github.com/adhilabu/' },
        ],
    },
};

const imageItems = [
    '/stock1.jpeg',
    '/stock2.png',
    '/stock3.jpeg',
    '/stock4.jpeg',
    '/stock5.jpeg',
    '/stock6.jpeg',
];

const carouselRef = ref();

onMounted(() => {
    setInterval(() => {
        if (!carouselRef.value) return;

        if (carouselRef.value.page === carouselRef.value.pages) {
            return carouselRef.value.select(0);
        }

        carouselRef.value.next();
    }, 3000);
});

const page = ref({
    title: 'Aksyon - Stocks Analysis',
    description: 'Aksyon - Stocks Analysis',
});
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.centered-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.info-section {
    text-align: center;
    margin-bottom: 2rem;
}

.info-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.info-description {
    font-size: 1rem;
    margin-bottom: 2rem;
}

.buttons-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.link-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

header {
    width: 100%;
    margin-bottom: 2rem;
}

main {
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>
