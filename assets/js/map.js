// assets/js/map.js

document.addEventListener('DOMContentLoaded', function () {
  var mymap = L.map('map', {
    doubleClickZoom: false, // Disable zooming on double-click
  }).setView([0, 0], 3);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

  // Add double click event listener to the map
  mymap.on('dblclick', function (event) {
    // Get the clicked coordinates
    var lat = event.latlng.lat;
    var lng = event.latlng.lng;

    // Create a marker and add it to the map
    var marker = L.marker([lat, lng]).addTo(mymap);

    // Create a custom popup with HTML content
    marker.bindPopup(`
      <div style="max-width: 200px;">
        <button style="float: right;" onclick="saveMarkerInfo()">Save</button>
        <div>
          <p>Marker Information:</p>
          <input type="text" id="markerTextbox" placeholder="Enter information">
        </div>
        <div style="text-align: left; margin-top: 10px;">
          <label for="switchButton">Switch:</label>
          <label class="switch">
            <input type="checkbox" id="switchButton">
            <span class="slider"></span>
          </label>
        </div>
      </div>
    `).openPopup();
  });
});

window.saveMarkerInfo = function () {
  var markerTextboxValue = document.getElementById('markerTextbox').value;
  var switchState = document.getElementById('switchButton').checked;

  alert('Marker Information: ' + markerTextboxValue + '\nSwitch State: ' + switchState);

};
