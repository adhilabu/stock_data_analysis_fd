
<template>
  <div>
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
    <slot />
  </div>

</template>


<script setup lang="ts">
// import { useRoute } from 'vue-router';
// const route = useRoute();
const config = useRuntimeConfig()
console.log('taipyApiBaseUrl :', config.public.taipyApiBaseUrl)

const links = [
  [{
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  }, {
    label: 'Level',
    icon: 'i-heroicons-light-bulb',
    to: '/levels'
  }, {
    label: 'Forcast',
    icon: 'i-heroicons-chart-bar',
    to: config.public.taipyApiBaseUrl,
    target: '_blank'
  }, {
    label: 'About',
    icon: 'i-heroicons-question-mark-circle',
    to: '/about'
  }]
]
</script>
