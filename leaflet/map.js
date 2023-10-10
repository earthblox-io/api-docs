// Create a map and set the center and zoom level
var map = L.map('map').setView([12, 104], 5);

// Add a base layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

L.tileLayer('https://earthengine.googleapis.com/v1alpha/projects/ebx-trial-dev/maps/ff32a3c815520054b01b18b884316d0a-89e9b9ebe44ac143bc2fa9ecc77e5a45/tiles/{z}/{x}/{y}').addTo(map);

