import type L from 'leaflet';

export interface CityData {
    cityName: string;
    coordinates: { lat: number; lon: number };
    measurements: {
        pm10: number;
        pm25: number;
        co: number;
        no2: number;
        so2: number;
        o3: number;
        aqi: number;
    };
}

export async function geocodeCity(city: string): Promise<{ lat: number; lon: number } | null> {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`);
    const data = await response.json();
    return data[0] ? { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) } : null;
}

export async function fetchAirQuality(lat: number, lng: number): Promise<any> {
    const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,european_aqi`);
    return await response.json();
}

export function getAQICategory(aqi: number): { text: string; color: string } {
    if (aqi <= 20) return { text: 'Very Good', color: 'bg-green-500' };
    if (aqi <= 40) return { text: 'Good', color: 'bg-green-400' };
    if (aqi <= 60) return { text: 'Moderate', color: 'bg-yellow-500' };
    if (aqi <= 80) return { text: 'Poor', color: 'bg-orange-500' };
    if (aqi <= 100) return { text: 'Very Poor', color: 'bg-red-500' };
    return { text: 'Extremely Poor', color: 'bg-red-700' };
}

export function getHealthImplications(aqi: number): string {
    if (aqi <= 20) return 'Air quality is excellent. Perfect for outdoor activities.';
    if (aqi <= 40) return 'Air quality is good. Suitable for outdoor activities.';
    if (aqi <= 60) return 'Air quality is acceptable. Sensitive individuals should limit prolonged outdoor exposure.';
    if (aqi <= 80) return 'Air quality is poor. Reduce outdoor activities.';
    if (aqi <= 100) return 'Air quality is very poor. Avoid outdoor activities.';
    return 'Air quality is extremely poor. Stay indoors if possible.';
}


export async function processCitySearch(searchCity: string, map: L.Map | null): Promise<CityData | null> {
    if (searchCity) {
        const coords = await geocodeCity(searchCity);
        if (coords) {
            const airQuality = await fetchAirQuality(coords.lat, coords.lon);

            const L = await import('leaflet');
            if (map) {
                map.eachLayer(layer => {
                    if (layer instanceof L.Marker) {
                        map.removeLayer(layer);
                    }
                });

                L.marker([coords.lat, coords.lon]).addTo(map);
                map.setView([coords.lat, coords.lon], 10);
            }

            return {
                cityName: searchCity,
                coordinates: coords,
                measurements: {
                    pm10: airQuality.hourly.pm10[0],
                    pm25: airQuality.hourly.pm2_5[0],
                    co: airQuality.hourly.carbon_monoxide[0],
                    no2: airQuality.hourly.nitrogen_dioxide[0],
                    so2: airQuality.hourly.sulphur_dioxide[0],
                    o3: airQuality.hourly.ozone[0],
                    aqi: airQuality.hourly.european_aqi[0],
                },
            };
        }
    }
    return null;
}