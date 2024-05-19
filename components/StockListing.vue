<template>
    <div class="flex justify-center items-center font-bold text-6xl">

        <div>
            <div class="flex items-center space-x-4" v-show="!isDataLoadedComputed">
                <div class="space-y-2">
                    <USkeleton class="h-4 w-[250px]" />
                    <USkeleton class="h-4 w-[200px]" />
                </div>
            </div>
            <div v-show="isDataLoadedComputed">
                <USelect loading v-model="selectedSymbol" :options="symbolsList" option-attribute="name" @click="$emit('symbolSelected', selectedSymbol)"/>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide, inject } from 'vue'

// Define the type for the SymbolMap
type SymbolMapDataType = { [key: string]: string } | undefined

// Create refs to store data and selected symbol
const selectedSymbol = ref<string | undefined>(undefined)
const symbolsList = ref<string[]>([])

// Cache key
const CACHE_KEY = 'stockSymbolsCache'

// Provide the cache (this could be in a parent component if used across multiple components)
provide(CACHE_KEY, ref<SymbolMapDataType>(undefined))

// Inject the cache
const symbolMapData = inject(CACHE_KEY, ref<SymbolMapDataType>(undefined)) as Ref<SymbolMapDataType>

// Fetch symbols on component mount
onMounted(async () => {
    try {
        // Check if the data is already cached
        if (!symbolMapData.value) {
            // If not, fetch the data from the API
            const { data: stockItems } = await useFetch('http://127.0.0.1:8000/analyse/get/symbols/list/')
            if (stockItems?.value) {
                // Validate data structure
                symbolMapData.value = stockItems?.value as SymbolMapDataType

                // console.log(JSON.stringify(symbolMapData?.value))
                if (Array.isArray(symbolMapData.value?.SymbolsMap)) {
                    symbolsList.value = symbolMapData.value?.SymbolsMap as string[]
                } else {
                    symbolsList.value = []
                }

            } else {
                console.error('Failed to fetch stock symbols:')
                // Handle fetch error (e.g., display error message)
            }
        } else {
            // Use the cached data
            console.error('injection "stockSymbolsCache" found:')
            if (Array.isArray(symbolMapData.value?.SymbolsMap)) {
                symbolsList.value = symbolMapData.value?.SymbolsMap as string[]
            } else {
                symbolsList.value = []
            }
        }
    } catch (error) {
        console.error('Error fetching stock symbols:', error)
        // Handle other errors (e.g., network issues)
    }
})

// change this to computed property
const isDataLoadedComputed = computed(() => {
    return symbolsList.value.length > 0
})

</script>
