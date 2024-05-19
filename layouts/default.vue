
<template>
  <div>
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
    <slot />
  </div>

</template>


<script setup lang="ts">
// import { useRoute } from 'vue-router';
// const route = useRoute();
const links = [
  [{
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  }, {
    label: 'Analyse',
    icon: 'i-heroicons-light-bulb',
    to: '/analyse'
  }, {
    label: 'About',
    icon: 'i-heroicons-chart-bar',
    to: '/about'
  },{
    label: 'Help',
    icon: 'i-heroicons-question-mark-circle'
  }]
]
</script>
