// assets/js/map.js

document.addEventListener('DOMContentLoaded', function () {
  var mymap = L.map('map', {
    doubleClickZoom: false,
  }).setView([0, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

  mymap.on('dblclick', function (event) {
    // Get the clicked coordinates
    var lat = event.latlng.lat;
    var lng = event.latlng.lng;

    // Create a marker and add it to the map
    var marker = L.marker([lat, lng]).addTo(mymap);

    var popupContent = `
      <div>
        <p>Marker Information:</p>
        <input type="text" id="markerTextbox" placeholder="Enter information">
        <button onclick="saveMarkerInfo()">Save</button>
        <div style="text-align: right; margin-top: 10px;">
          <label for="switchButton">Switch:</label>
          <label class="switch">
            <input type="checkbox" id="switchButton">
            <span class="slider"></span>
          </label>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent).openPopup();
  });

  window.saveMarkerInfo = function () {
    // Access the textbox value and do something with it
    var markerTextboxValue = document.getElementById('markerTextbox').value;
    var switchButtonValue = document.getElementById('switchButton').value;
    alert('Marker Information: ' + markerTextboxValue + '\n marker swtich: ' + switchButtonValue);

  };
});
