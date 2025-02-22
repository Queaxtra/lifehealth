<script lang="ts">
    import type { CityData } from '../lib/airQuality';
    import { getAQICategory, getHealthImplications } from '../lib/airQuality';

    export let selectedCityData: CityData | null = null;
</script>

{#if selectedCityData}
    <div class="lg:col-span-4 bg-white border border-neutral-200 p-8">
        <h2 class="text-4xl font-light mb-6">
            {selectedCityData.cityName}
            <span class="text-sm text-neutral-500 block mt-2">Air Quality Index</span>
        </h2>

        <div class="space-y-6 mb-8">
            <div class="flex items-center gap-2">
                <span class="text-7xl font-light">
                    {selectedCityData.measurements.aqi}
                </span>
                <span class="text-base text-neutral-400">AQI</span>
            </div>

            <div class="space-y-3">
                <span class="block text-2xl font-medium">
                    {getAQICategory(selectedCityData.measurements.aqi).text}
                </span>

                <div class="space-y-2">
                    <div class={`w-full h-2 rounded-full ${getAQICategory(selectedCityData.measurements.aqi).color} transition-all duration-300 ease-in-out shadow-sm`}></div>
                    <span class="text-sm text-neutral-500 font-light">
                        Air Quality Level Indicator
                    </span>
                </div>
            </div>
        </div>

        <div class="space-y-4">
            <p class="text-neutral-600 leading-relaxed">
                {getHealthImplications(selectedCityData.measurements.aqi)}
            </p>
            <div class="text-sm text-neutral-500">
                <span class="font-medium">Location:</span> {selectedCityData.coordinates.lat}°N, {selectedCityData.coordinates.lon}°E
            </div>
            <div class="text-sm text-neutral-500">
                <span class="font-medium">Last Updated:</span> {new Date().toLocaleTimeString()}
            </div>
            <div class="text-sm text-neutral-500">
                <span class="font-medium">Measurement Time:</span> {new Date().toLocaleDateString()}
            </div>
        </div>
    </div>
{/if}