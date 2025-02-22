<script lang="ts">
    import { onMount, tick } from 'svelte';
    import 'leaflet/dist/leaflet.css';
    import type L from 'leaflet';
    import SearchBar from '../components/SearchBar.svelte';
    import MapDisplay from '../components/MapDisplay.svelte';
    import AQIDisplay from '../components/AQIDisplay.svelte';
    import MeasurementsGrid from '../components/MeasurementsGrid.svelte';
    import { processCitySearch, type CityData } from '$lib/airQuality';
    import Footer from '../components/Footer.svelte';

    let map: L.Map | null = null;
    let searchCity = 'Bangladesh';
    let selectedCityData: CityData | null = null;

    async function handleSearch(event: CustomEvent<string>) {
        searchCity = event.detail;
        selectedCityData = await processCitySearch(searchCity, map);

        await tick();
        const infoElement = document.getElementById('info');
        if (infoElement) {
            infoElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    onMount(async () => {
        const L = await import('leaflet');
        map = L.map('map').setView([0, 0], 2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.9.4/dist/images/';
        selectedCityData = await processCitySearch(searchCity, map);
    });

    $: if (selectedCityData) {
        MapDisplay.updateMap(selectedCityData.coordinates);
    }
</script>

<div class="min-h-screen bg-neutral-50">
    <div class="container mx-auto px-6 py-16 max-w-7xl">
        <div class="flex justify-center mb-16">
            <SearchBar {searchCity} on:search={handleSearch}/>
        </div>

        <div class="mb-16 border border-neutral-200">
            <MapDisplay  bind:map />
        </div>

        {#if selectedCityData}
            <div id="info" class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <AQIDisplay {selectedCityData} />
                <MeasurementsGrid {selectedCityData} />
            </div>
        {/if}
    </div>
    <Footer />
</div>