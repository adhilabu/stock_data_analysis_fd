<template>
    <main>
        <UCard>
            <template #header>
                <div class="flex justify-center items-center font-bold text-5xl">
                    <!-- <Placeholder class="h-20" /> -->
                    {{ 'Stock Analysis' }}
                </div>
            </template>
            <div v-if="enableSelect">
                <div>
                    <p class="text-center text-gray-500 dark:text-gray-400 pb-4">
                        Select a stock symbol
                    </p>
                </div>

                <StockListing @symbolSelected="handleSymbolSelection" />
                <div>
                    <p class="text-center text-gray-500 dark:text-gray-400 pt-6">
                        Select date to analyse
                    </p>
                </div>
                <div class="flex justify-center items-center font-bold text-6xl">
                    <UPopover :popper="{ placement: 'bottom-start' }">
                        <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(analysisDate, 'd MMM, yyy')" />

                        <template #panel="{ close }">
                            <DatePicker v-model="analysisDate" is-required @close="close" />
                        </template>
                    </UPopover>
                </div>
                <div>
                    <p class="text-center text-gray-500 dark:text-gray-400 pt-6">
                        Select initial date to analyse
                    </p>
                </div>
                <div class="flex justify-center items-center font-bold text-6xl">
                    <UPopover :popper="{ placement: 'bottom-start' }">
                        <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(initialDate, 'd MMM, yyy')" />

                        <template #panel="{ close }">
                            <DatePicker v-model="initialDate" is-required @close="close" />
                        </template>
                    </UPopover>
                </div>
            </div>
            <div v-else>
                <div class="flex justify-center items-center font-bold text-6xl">
                    <UTextfield v-model="selectedSymbol" label="Selected Symbol" />
                </div>
            </div>


            <template #footer>
                <div class="flex justify-center items-center font-bold text-6xl">
                    <UButton label="Get Analysis" @click="getAnalysis" />
                </div>
                <p class="text-center text-gray-500 dark:text-gray-400 text-xs pt-10">
                    {{ `Selected Symbol: ${selectedSymbol}` }}
                </p>
            </template>
        </UCard>
    </main>
    <UContainer>
        <Placeholder class="h-32" />

    </UContainer>
</template>
<script setup lang="ts">
import { format } from 'date-fns'
import { ref } from 'vue';

const toast = useToast()
const analysisDate = ref(new Date())
const initialDate = ref(new Date('2010-01-01'))
const analyseUrl = 'http://127.0.0.1:8000/analyse/symbol/day/'
const selectedSymbol = ref('');
const StockAnalysisResponse = ref({});
const enableSelect = ref(true);

const handleSymbolSelection = (symbol: string) => {
    selectedSymbol.value = symbol;
}

async function getAnalysis() {
    console.log('Get Analysis');
    if (!selectedSymbol.value) {
        console.error('No symbol selected');
        toast.add({ title: 'No symbol selected!' });
        // Handle error appropriately (e.g., display error message to user)
        return;
    }

    const data = {
        Symbol: selectedSymbol.value,
        AnalysisDate: format(analysisDate.value, 'yyyy-MM-dd'),
        FilterData: {
            StartDate: format(initialDate.value, 'yyyy-MM-dd'),
            Offset: 100,
        },
    };

    const { data: analysisData, error } = await useFetch(analyseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (error) {
        console.error('Error fetching analysis:', error);
        // Handle error appropriately (e.g., display error message to user)
    } else {
        StockAnalysisResponse.value = (analysisData as any).value.StockAnalysis;

        console.log('Success:', analysisData);
        console.log('Succ', StockAnalysisResponse);
        // Use the analysisData for further processing or display
    }
}


</script>
