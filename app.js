/* ======================================================
   IoT ENVIRONMENTAL DASHBOARD
   JavaScript - app.js
====================================================== */


/* ================= PAGE NAVIGATION ================= */

const titles = {

    home: "AtmosSense — Sense the Air",

    dashboard: "AtmosSense Dashboard",

    devices: "Connected Devices",

    sensors: "Live Sensor Monitoring",

    aws: "AWS Cloud Services",

    architecture: "System Architecture",

    history: "Sensor History",

    alerts: "Alerts & Notifications",

    oled: "OLED Display",

    about: "About AtmosSense"

};


/* ================= SHOW PAGE ================= */

function showPage(pageId, element) {

    // Hide all pages
    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    // Show selected page
    document
        .getElementById(pageId)
        .classList.add("active");


    // Remove active class from navigation
    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

        });


    // Add active class to selected navigation item
    if (element) {

        element.classList.add("active");

    }


    // Change page title
    const pageTitle =
        document.getElementById("pageTitle");

    if (pageTitle && titles[pageId]) {

        pageTitle.textContent =
            titles[pageId];

    }


    // Scroll to top
    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* ================= GO TO PAGE ================= */

function goTo(pageId) {

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            const onclick =
                item.getAttribute("onclick");

            if (
                onclick &&
                onclick.includes("'" + pageId + "'")
            ) {

                item.click();

            }

        });

}


/* ================= SENSOR DATA ================= */

// Initial sensor values

let temperature = 28.5;

let humidity = 62;


/* ================= UPDATE SENSOR DATA ================= */

function updateSensorData() {

    /*
       Currently generating sample values.

       Later these values can be replaced
       with real AWS IoT Core values.
    */

    temperature =
        27 + Math.random() * 4;


    humidity =
        57 + Math.random() * 10;


    // Format values

    const temp =
        temperature.toFixed(1);


    const hum =
        humidity.toFixed(0);


    /* ================= HOME PAGE ================= */

    const homeTemp =
        document.getElementById("homeTemp");

    if (homeTemp) {

        homeTemp.textContent = temp;

    }


    const homeHumidity =
        document.getElementById("homeHumidity");

    if (homeHumidity) {

        homeHumidity.textContent = hum;

    }


    /* ================= DASHBOARD ================= */

    const dashTemp =
        document.getElementById("dashTemp");

    if (dashTemp) {

        dashTemp.textContent = temp;

    }


    const dashHumidity =
        document.getElementById("dashHumidity");

    if (dashHumidity) {

        dashHumidity.textContent = hum;

    }


    /* ================= SIDEBAR ================= */

    const sideTemp =
        document.getElementById("sideTemp");

    if (sideTemp) {

        sideTemp.textContent = temp;

    }


    const sideHumidity =
        document.getElementById("sideHumidity");

    if (sideHumidity) {

        sideHumidity.textContent = hum;

    }


    /* ================= DEVICES ================= */

    const deviceTemp =
        document.getElementById("deviceTemp");

    if (deviceTemp) {

        deviceTemp.textContent =
            temp + "°C";

    }


    const deviceHumidity =
        document.getElementById("deviceHumidity");

    if (deviceHumidity) {

        deviceHumidity.textContent =
            hum + "%";

    }


    /* ================= LIVE SENSOR ================= */

    const liveTemp =
        document.getElementById("liveTemp");

    if (liveTemp) {

        liveTemp.textContent = temp;

    }


    const liveHumidity =
        document.getElementById("liveHumidity");

    if (liveHumidity) {

        liveHumidity.textContent = hum;

    }


    /* ================= OLED ================= */

    const oledTemp =
        document.getElementById("oledTemp");

    if (oledTemp) {

        oledTemp.textContent = temp;

    }


    const oledHumidity =
        document.getElementById("oledHumidity");

    if (oledHumidity) {

        oledHumidity.textContent = hum;

    }


    /* ================= LAST UPDATE ================= */

    const lastUpdate =
        document.getElementById("lastUpdate");

    if (lastUpdate) {

        lastUpdate.textContent =
            new Date().toLocaleTimeString();

    }

}


/* ======================================================
   MAIN CHART
====================================================== */

let chartLabels = [];

let chartTemp = [];

let chartHumidity = [];


/* ================= INITIAL CHART DATA ================= */

for (let i = 0; i < 12; i++) {

    chartLabels.push(
        (i + 1) + " min"
    );


    chartTemp.push(
        27 + Math.random() * 4
    );


    chartHumidity.push(
        55 + Math.random() * 12
    );

}


/* ================= CREATE MAIN CHART ================= */

const mainCanvas =
    document.getElementById("mainChart");


let mainChart = null;


if (mainCanvas) {

    const ctx =
        mainCanvas.getContext("2d");


    mainChart =
        new Chart(ctx, {

            type: "line",


            data: {

                labels: chartLabels,


                datasets: [

                    {

                        label: "Temperature °C",

                        data: chartTemp,

                        borderWidth: 3,

                        tension: 0.4,

                        fill: false

                    },


                    {

                        label: "Humidity %",

                        data: chartHumidity,

                        borderWidth: 3,

                        tension: 0.4,

                        fill: false

                    }

                ]

            },


            options: {

                responsive: true,

                maintainAspectRatio: false,


                plugins: {

                    legend: {

                        labels: {

                            color: "#94a3b8"

                        }

                    }

                },


                scales: {

                    x: {

                        ticks: {

                            color: "#64748b"

                        },


                        grid: {

                            color:
                                "rgba(255,255,255,.04)"

                        }

                    },


                    y: {

                        ticks: {

                            color: "#64748b"

                        },


                        grid: {

                            color:
                                "rgba(255,255,255,.04)"

                        }

                    }

                }

            }

        });

}


/* ======================================================
   LIVE CHART
====================================================== */

const liveCanvas =
    document.getElementById("liveChart");


let liveChart = null;


if (liveCanvas) {

    const liveCtx =
        liveCanvas.getContext("2d");


    liveChart =
        new Chart(liveCtx, {

            type: "line",


            data: {

                labels: [],


                datasets: [

                    {

                        label: "Temperature",

                        data: [],

                        borderWidth: 3,

                        tension: 0.4

                    },


                    {

                        label: "Humidity",

                        data: [],

                        borderWidth: 3,

                        tension: 0.4

                    }

                ]

            },


            options: {

                responsive: true,

                maintainAspectRatio: false,


                plugins: {

                    legend: {

                        labels: {

                            color: "#94a3b8"

                        }

                    }

                },


                scales: {

                    x: {

                        ticks: {

                            color: "#64748b"

                        }

                    },


                    y: {

                        ticks: {

                            color: "#64748b"

                        }

                    }

                }

            }

        });

}


/* ======================================================
   REAL-TIME SENSOR UPDATE
====================================================== */

setInterval(function () {

    // Update sensor values

    updateSensorData();


    // Current time

    const time =
        new Date().toLocaleTimeString();


    /* ================= MAIN CHART ================= */

    chartLabels.push(time);

    chartTemp.push(temperature);

    chartHumidity.push(humidity);


    // Keep only last 12 values

    if (chartLabels.length > 12) {

        chartLabels.shift();

        chartTemp.shift();

        chartHumidity.shift();

    }


    // Update main chart

    if (mainChart) {

        mainChart.update();

    }


    /* ================= LIVE CHART ================= */

    if (liveChart) {

        liveChart.data.labels.push(time);


        liveChart.data.datasets[0]
            .data.push(temperature);


        liveChart.data.datasets[1]
            .data.push(humidity);


        // Keep only last 15 values

        if (
            liveChart.data.labels.length > 15
        ) {

            liveChart.data.labels.shift();


            liveChart.data.datasets
                .forEach(dataset => {

                    dataset.data.shift();

                });

        }


        // Refresh live chart

        liveChart.update();

    }

}, 3000);


/* ======================================================
   INITIAL SENSOR UPDATE
====================================================== */

updateSensorData();

/* ======================================================
   ATMOSSENSE WORLDWIDE WEATHER SEARCH
====================================================== */
const ATMOSSENSE_WEATHER_API =
    "https://epqniv2xz1.execute-api.us-east-1.amazonaws.com/sensor-data";

function setWeatherText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent =
        value === undefined || value === null || value === "" ? "--" : value;
}

async function searchWorldWeather() {
    const cityInput = document.getElementById("weatherCity");
    const status = document.getElementById("weatherStatus");
    if (!cityInput || !status) return;

    const city = cityInput.value.trim();
    if (!city) {
        status.textContent = "Please enter a city name.";
        return;
    }

    status.textContent = "Loading weather for " + city + "...";
    try {
        const response = await fetch(
            ATMOSSENSE_WEATHER_API + "?city=" + encodeURIComponent(city)
        );
        if (!response.ok) throw new Error("API returned HTTP " + response.status);

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        setWeatherText("weatherLocation", data.city || city);
        setWeatherText("weatherCountry", data.country || "--");
        setWeatherText("worldTemp", data.temperature);
        setWeatherText("worldHumidity", data.humidity);
        setWeatherText("worldFeelsLike", data.feels_like);
        setWeatherText("worldWind", data.wind_speed);

        status.textContent = "Weather loaded • Source: " + (data.source || "Open-Meteo");
    } catch (error) {
        console.error("AtmosSense weather lookup:", error);
        status.textContent =
            "Weather could not load. Check that the API and Lambda are working, then try again.";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const cityInput = document.getElementById("weatherCity");
    if (cityInput) {
        cityInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") searchWorldWeather();
        });
        // Load the default city when the weather page is opened.
        searchWorldWeather();
    }
});


/* ======================================================
   ATMOSSENSE WORLD MAP INTEGRATION
   Keeps the original dashboard and reuses its weather cards/API.
====================================================== */
(function initAtmosSenseWorldMap() {
    "use strict";
    const mapNode = document.getElementById("worldMap");
    if (!mapNode || typeof L === "undefined") return;

    const searchInput = document.getElementById("mapLocationSearch");
    const searchButton = document.getElementById("mapSearchButton");
    const resetButton = document.getElementById("mapResetButton");
    const statusNode = document.getElementById("mapStatus");
    const map = L.map("worldMap", { worldCopyJump: true }).setView([20, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let marker = null;
    let controller = null;
    let requestId = 0;
    const setStatus = message => { statusNode.textContent = message; };

    function addMarker(lat, lon, label) {
        if (marker) map.removeLayer(marker);
        marker = L.marker([lat, lon]).addTo(map);
        const popup = document.createElement("div");
        const title = document.createElement("strong");
        title.textContent = label || "Selected location";
        popup.appendChild(title);
        popup.appendChild(document.createElement("br"));
        popup.appendChild(document.createTextNode(`${lat.toFixed(4)}, ${lon.toFixed(4)}`));
        marker.bindPopup(popup).openPopup();
    }

    async function reverseGeocode(lat, lon, signal) {
        const url = new URL("https://nominatim.openstreetmap.org/reverse");
        url.searchParams.set("format", "jsonv2");
        url.searchParams.set("lat", String(lat));
        url.searchParams.set("lon", String(lon));
        const response = await fetch(url.toString(), { signal });
        if (!response.ok) throw new Error("Reverse geocoding request failed");
        const result = await response.json();
        const a = result.address || {};
        const place = a.city || a.town || a.village || a.municipality || a.county || a.state || a.country || "";
        return { place, label: result.display_name || place };
    }

    async function selectPoint(lat, lon, knownPlace, displayLabel) {
        const id = ++requestId;
        if (controller) controller.abort();
        controller = new AbortController();
        addMarker(lat, lon, displayLabel || knownPlace || "Selected location");
        setStatus("Identifying location and loading weather...");
        try {
            let place = knownPlace || "";
            let label = displayLabel || place;
            if (!place) {
                const resolved = await reverseGeocode(lat, lon, controller.signal);
                place = resolved.place;
                label = resolved.label;
            }
            if (id !== requestId) return;
            if (!place) {
                setStatus("Point selected, but no nearby city was found. Search for a city to load weather.");
                return;
            }
            document.getElementById("weatherCity").value = place;
            await searchWorldWeather();
            if (id === requestId) setStatus("Selected " + (label || place) + ". Weather cards updated below.");
        } catch (error) {
            if (error.name === "AbortError") return;
            console.error("AtmosSense map selection failed:", error);
            setStatus("Could not identify this location. Try searching for a city.");
        }
    }

    async function searchMap() {
        const query = searchInput.value.trim();
        if (!query) { setStatus("Enter a city, country, or location."); return; }
        if (controller) controller.abort();
        controller = new AbortController();
        const id = ++requestId;
        setStatus("Searching for " + query + "...");
        try {
            const url = new URL("https://nominatim.openstreetmap.org/search");
            url.searchParams.set("format", "jsonv2");
            url.searchParams.set("q", query);
            url.searchParams.set("limit", "1");
            const response = await fetch(url.toString(), { signal: controller.signal });
            if (!response.ok) throw new Error("Location search failed");
            const results = await response.json();
            if (id !== requestId) return;
            if (!results.length) { setStatus("Location not found. Try another search."); return; }
            const result = results[0];
            const lat = Number(result.lat), lon = Number(result.lon);
            if (!Number.isFinite(lat) || !Number.isFinite(lon)) throw new Error("Invalid coordinates");
            map.setView([lat, lon], 7);
            await selectPoint(lat, lon, query, result.display_name || query);
        } catch (error) {
            if (error.name === "AbortError") return;
            console.error("AtmosSense map search failed:", error);
            setStatus("Search failed. Please try again.");
        }
    }

    map.on("click", event => selectPoint(event.latlng.lat, event.latlng.lng, "", ""));
    searchButton.addEventListener("click", searchMap);
    searchInput.addEventListener("keydown", event => { if (event.key === "Enter") searchMap(); });
    resetButton.addEventListener("click", () => {
        requestId++;
        if (controller) controller.abort();
        map.setView([20, 0], 2);
        if (marker) { map.removeLayer(marker); marker = null; }
        setStatus("Click the map or search for a location.");
    });
    document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', () => setTimeout(() => map.invalidateSize(), 180)));
    window.addEventListener("resize", () => map.invalidateSize());
    map.setView([20, 0], 2);
})();
