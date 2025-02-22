<script lang="ts">
    import type { CityData } from '../lib/airQuality';

    export let selectedCityData: CityData | null = null;
</script>

{#if selectedCityData}
    <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white border border-neutral-200 p-8">
            <h3 class="text-sm font-medium uppercase tracking-wider text-neutral-400 mb-6">
                Particulate Matter
            </h3>
            <div class="space-y-8">
                <div>
                    <span class="block text-4xl font-light mb-1">
                        {selectedCityData.measurements.pm10}
                    </span>
                    <span class="text-sm text-neutral-500">PM10 μg/m³</span>
                </div>
                <div>
                    <span class="block text-4xl font-light mb-1">
                        {selectedCityData.measurements.pm25}
                    </span>
                    <span class="text-sm text-neutral-500">PM2.5 μg/m³</span>
                </div>
            </div>
        </div>

        <div class="bg-white border border-neutral-200 p-8">
            <h3 class="text-sm font-medium uppercase tracking-wider text-neutral-400 mb-6">
                Gases
            </h3>
            <div class="space-y-8">
                <div>
                    <span class="block text-4xl font-light mb-1">
                        {selectedCityData.measurements.co}
                    </span>
                    <span class="text-sm text-neutral-500">CO μg/m³</span>
                </div>
                <div>
                    <span class="block text-4xl font-light mb-1">
                        {selectedCityData.measurements.no2}
                    </span>
                    <span class="text-sm text-neutral-500">NO₂ μg/m³</span>
                </div>
            </div>
        </div>

        <div class="bg-white border border-neutral-200 p-8">
            <h3 class="text-sm font-medium uppercase tracking-wider text-neutral-400 mb-6">
                Other Pollutants
            </h3>
            <div class="space-y-8">
                <div>
                    <span class="block text-4xl font-light mb-1">
                        {selectedCityData.measurements.so2}
                    </span>
                    <span class="text-sm text-neutral-500">SO₂ μg/m³</span>
                </div>
                <div>
                    <span class="block text-4xl font-light mb-1">
                        {selectedCityData.measurements.o3}
                    </span>
                    <span class="text-sm text-neutral-500">O₃ μg/m³</span>
                </div>
            </div>
        </div>
    </div>
{/if}