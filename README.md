# LifeHealth

A web application that displays air quality data for different cities around the world.

## Features

*   **Search for Cities:** Users can enter a city name in the search bar to find air quality information.
*   **Interactive Map:** Displays a map with a marker indicating the selected city's location.
*   **AQI Display:** Shows the Air Quality Index (AQI) for the selected city, along with a textual description (e.g., "Good," "Moderate," "Poor").
*   **AQI Level Indicator:**  A colored bar visually represents the AQI level.
*   **Health Implications:**  Provides a brief description of the health implications of the current AQI level.
*   **Detailed Measurements:** Displays detailed air quality measurements, including:
    *   Particulate Matter (PM10 and PM2.5)
    *   Gases (CO, NO₂)
    *   Other Pollutants (SO₂, O₃)
*   **Responsive Design:**  The application is designed to work well on different screen sizes.
*   **Minimalist Design:**  Follows Dieter Rams' principles of good design, focusing on usability and clarity.
* **Data Source Attribution:** Credits Open-Meteo, OpenStreetMap, and Leaflet.
* **Last Updated and Measurement Time:** Displays when the data was last updated and measured.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/queaxtra/lifehealth.git
    cd lifehealth
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn
    # or
    bun install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    pnpm dev
    # or
    yarn dev
    # or
    bun run dev
    ```

    This will start the development server, and you can access the application in your browser (usually at `http://localhost:5173`).

## API Endpoints

*   **Geocoding:** `https://nominatim.openstreetmap.org/search?format=json&q={city}`
*   **Air Quality:** `https://air-quality-api.open-meteo.com/v1/air-quality?latitude={lat}&longitude={lng}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,european_aqi`

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License.