<template>
    <main>
        <UCard>
            <template #header>
                <div class="flex justify-center items-center font-bold text-5xl">
                    {{ 'Aksyo Stock Levels' }}
                </div>
            </template>

            <div v-if="enableSelect" class="space-y-6">
                <!-- Container for Dropdown, Intervals, and Periods -->
                <div class="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">

                    <!-- Stock Dropdown Component -->
                    <div class="w-full md:w-3/6 justify-end">
                        <USelect icon="i-heroicons-magnifying-glass-20-solid" placeholder="Select Stock"
                            v-model="selectedSymbol" :options="symbolsMap" option-attribute="name" class="w-full" />
                    </div>

                    <!-- Intervals and Periods Radio Buttons -->
                    <div
                        class="w-full md:w-1/6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 justify-end">
                        <URadioGroup v-model="selectedInterval" legend="Choose Interval" :options="intervalOptions" />
                    </div>
                    <div
                        class="w-full md:w-1/6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 justify-center">
                        <URadioGroup v-model="selectedPeriod" legend="Choose Period" :options="periodOptions" />
                    </div>
                    <div
                        class="w-full md:w-1/6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 justify-start">
                        <URadioGroup v-model="selectedAccuracy" legend="Choose Accuracy Level" :options="accuracyOptions" />
                    </div>
                </div>
                <div v-if="loading" class="loading-card">
                    <p>This might take a while. Please wait...</p>
                </div>
            </div>

            <template #footer>
                <div class="flex flex-col items-center font-bold text-6xl">
                    <UButton label="Get Levels" @click="getLevels" :loading="loading" />
                    <p class="text-center text-gray-500 dark:text-gray-400 text-xs pt-10">
                        {{ `Selected Symbol: ${selectedSymbol}` }}
                    </p>
                </div>
            </template>
        </UCard>
        <div v-if="!loading" class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
            <UInput v-model="q" placeholder="Filter Stocks..." />
        </div>

        <UTable v-if="!loading" :rows="rows" :columns="columns">
            <template #caption>
                <caption class="caption-style">Support and Resistance Levels</caption>
            </template>
        </UTable>
        <div v-if="!loading" class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
            <UPagination v-model="page" :page-count="pageCount" :total="stocksArray.length" />
        </div>
    </main>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useNuxtApp } from '#app'; // Import the correct useNuxtApp hook

interface StockSymbol {
    name: string;
    value: string;
}

const config = useRuntimeConfig();
const toast = useToast();
const analyseUrl = `${config.public.backendApiBaseUrl}analyse/v1/get/stock/levels/`;
const selectedSymbol = ref('');
const enableSelect = ref(true);
const allMap = { value: 'all', name: 'All' };

// Define symbolsMap with the correct type
const symbolsMap = ref<StockSymbol[]>([]);
const intervals = ref({});
const periods = ref({});

const selectedInterval = ref('');
const selectedPeriod = ref('');
const selectedAccuracy = ref(3);
const loading = ref(false);

const columns = [
  {
    key: 'Id',
    label: 'ID',
    sortable: true
  },
  {
    key: 'Name',
    label: 'Stock Name',
    sortable: true
  },
  {
    key: 'SupportCount',
    label: 'Support Count'
  },
  {
    key: 'ResistanceCount',
    label: 'Resistance Count'
  },
  {
    key: 'AtSupport',
    label: 'At Support'
  },
  {
    key: 'AtResistance',
    label: 'At Resistance'
  },
  {
    key: 'SupportHigh',
    label: 'Support High',
    sortable: true
  },
  {
    key: 'SupportLow',
    label: 'Support Low',
    sortable: true
  },
  {
    key: 'ResistanceHigh',
    label: 'Resistance High',
    sortable: true
  },
  {
    key: 'ResistanceLow',
    label: 'Resistance Low',
    sortable: true
  }
];

const accuracyOptions = [
    {
        label: 'One',
        value: 1
    },
    {
        label: 'Two',
        value: 2
    },
    {
        label: 'Three',
        value: 3
    },
    {
        label: 'Four',
        value: 4
    },
    {
        label: 'Five',
        value: 5
    },
    {
        label: 'Six',
        value: 6
    },
]


interface StockData {
    Id: number;
    Name: string;
    SupportCount: number;
    ResistanceCount: number;
    AtSupport: boolean;
    AtResistance: boolean;
    SupportHigh: number,
    SupportLow: number,
    ResistanceHigh: number,
    ResistanceLow: number,
}


const stocksArray = ref<StockData[]>([]);

interface DropdownOption {
    label: string;
    value: string;
}

interface FetchDataResponse {
    Symbols: StockSymbol[];
    Intervals: { [key: string]: string };
    Periods: { [key: string]: string };
}

const intervalOptions = ref<DropdownOption[]>([]);
const periodOptions = ref<DropdownOption[]>([]);

async function fetchData() {
    // const { $fetch } = useNuxtApp();

    try {
        // Ensure that $fetch is available
        if (!$fetch) {
            throw new Error('$fetch is not available');
        }

        const responseData = await $fetch<FetchDataResponse>(analyseUrl, {
            method: 'GET',
        });

        if (responseData) {
            console.log('Successfully fetched context data');

            symbolsMap.value = [allMap, ...responseData.Symbols] || [];
            intervals.value = responseData.Intervals || {};
            periods.value = responseData.Periods || {};

            intervalOptions.value = Object.entries(intervals.value).map(([label, value]) => ({
                label,
                value: String(value)
            }));

            periodOptions.value = Object.entries(periods.value).map(([label, value]) => ({
                label,
                value: String(value)
            }));

            selectedInterval.value = intervalOptions.value[0]?.value || '';
            selectedPeriod.value = periodOptions.value[0]?.value || '';
        } else {
            console.error('No data received');
        }
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

onMounted(() => {
    fetchData();
});

interface AnalysisResponse {
    Results: any;
}

async function getLevels() {
    console.log('Started Fetching Levels');
    if (!selectedSymbol.value) {
        console.error('No symbol selected');
        toast.add({ title: 'No symbol selected!' });
        return;
    }

    const data = {
        Symbols: [selectedSymbol.value],
        Accuracy: selectedAccuracy.value,
        Period: selectedPeriod.value,
        Interval: selectedInterval.value,
    };

    loading.value = true; // Show loading spinner on button

    try {
        const analysisData = await $fetch<AnalysisResponse>(analyseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Check if the `Response` property exists and if it's an empty object
        if (!analysisData.Results || Object.keys(analysisData.Results).length === 0) {
            console.warn('No support or resistance found for the stock');
            toast.add({ title: 'No support or resistance levels.' });
            return;
        }

        // Update `analysisData` with API response
        analysisData.Results = analysisData.Results || {};
        console.log('Successfully fetched analysis data for the selected stocks')

        stocksArray.value = Object.keys(analysisData.Results).map((stockName, index) => {
            const stockData = analysisData.Results[stockName];
            return {
                Id: index + 1,
                Name: stockName,
                SupportCount: stockData.SupportCount,
                ResistanceCount: stockData.ResistanceCount,
                AtSupport: stockData.IsSupport,
                AtResistance: stockData.IsResistance,
                SupportHigh: stockData.SupportHigh,
                SupportLow: stockData.SupportLow,
                ResistanceHigh: stockData.ResistanceHigh,
                ResistanceLow: stockData.ResistanceLow
            };
        });

        console.log('Length of the rows : ', Object.keys(analysisData.Results).length);

    } catch (err) {
        console.error('Error fetching analysis:', err);
    } finally {
        loading.value = false;
    }
}

const page = ref(1);
const pageCount = 50;
const q = ref('');

const rows = computed(() => {
    const data = stocksArray.value ?? [];

    // Filter data based on the search query
    const filteredData = q.value
        ? data.filter((d) => Object.values(d).some((value) =>
            String(value).toLowerCase().includes(q.value.toLowerCase())
        ))
        : data;

    if (filteredData.slice((page.value - 1) * pageCount, page.value * pageCount).length==0){
        page.value = 1;
    }
    // Paginate the filtered data
    return filteredData.slice((page.value - 1) * pageCount, page.value * pageCount);
});


</script>

<style scoped>
.loading-card {
    padding: 16px;
    border-radius: 10px;
    background-color: #000000;
    border: 1px solid #ffffff;
    text-align: center;
    margin-top: 100px;
    margin-bottom: 100px;
    color: #ffffff;
}

.caption-style {
    font-size: 1.5rem;
    /* Increase font size */
    padding: 0.5rem;
    /* Add padding */
    text-align: center;
    /* Center align text */
    font-weight: bold;
    /* Make text bold */
}
</style>
