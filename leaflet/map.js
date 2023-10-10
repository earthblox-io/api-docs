// Create a map and set the center and zoom level
var map = L.map('map').setView([51.505, -0.09], 13);

// Add a base layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

