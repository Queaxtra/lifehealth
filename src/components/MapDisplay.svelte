<script lang="ts">
    import { onMount } from 'svelte';
    import type L from 'leaflet';

    let map: L.Map | null = null;
    let mapContainer: HTMLDivElement;

    onMount(async () => {
        const L = await import('leaflet');
        map = L.map(mapContainer).setView([0, 0], 2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.9.4/dist/images/';
    });
    
    $: map,searchCity

    export async function updateMap(coords: {lat: number, lon: number}) {
      if(map) {
        const L =  await import('leaflet');

        map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        L.marker([coords.lat, coords.lon]).addTo(map);
        map.setView([coords.lat, coords.lon], 10);
      }
    }
    export let searchCity: string;

</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<div bind:this={mapContainer} class="w-full h-[70vh]" />