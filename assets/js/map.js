// assets/js/map.js

document.addEventListener('DOMContentLoaded', function () {
  var mymap = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

  // Add double click event listener to the map
  mymap.on('dblclick', function (event) {
    // Get the clicked coordinates
    var lat = event.latlng.lat;
    var lng = event.latlng.lng;

    // Create a marker and add it to the map
    var marker = L.marker([lat, lng]).addTo(mymap);
  });
});
