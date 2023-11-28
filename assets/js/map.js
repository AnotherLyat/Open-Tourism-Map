// assets/js/map.js

document.addEventListener('DOMContentLoaded', function () {
  var mymap = L.map('map', {
    doubleClickZoom: false, // Disable zooming on double-click
  }).setView([0, 0], 3);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

  // Variable to store the current marker
  var currentMarker;

  // Add double click event listener to the map
  mymap.on('dblclick', function (event) {
    // Get the clicked coordinates
    var lat = event.latlng.lat;
    var lng = event.latlng.lng;

    // Create a marker and add it to the map
    currentMarker = L.marker([lat, lng]).addTo(mymap);

    // Create a custom popup with HTML content
    currentMarker.bindPopup(`
      <div style="max-width: 200px;">
        <button style="float: right;" onclick="saveMarkerInfo()">Save</button>
        <button id="deleteButton" onclick="deleteMarker()">Delete</button>
        <div>
          <p>Marker Information:</p>
          <input type="text" id="markerTextbox" placeholder="Enter information">
        </div>
        <div style="text-align: left; margin-top: 10px;">
          <button id="stateButton" onclick="toggleState()">
            <span id="stateIcon" class="play-icon">▶️</span>
          </button>
        </div>
      </div>
    `).openPopup();
  });

  window.toggleState = function () {
    var stateButton = document.getElementById('stateButton');
    var stateIcon = document.getElementById('stateIcon');

    if (stateButton.classList.contains('playing')) {
      stateButton.classList.remove('playing');
      stateIcon.textContent = '▶️'; // Play icon
      stateButton.style.backgroundColor = '#3498db'; // Default color
    } else {
      stateButton.classList.add('playing');
      stateIcon.textContent = '⏸️'; // Pause icon
      stateButton.style.backgroundColor = '#e74c3c'; // Active color
    }
  };

  window.saveMarkerInfo = function () {
    var markerTextboxValue = document.getElementById('markerTextbox').value;
    alert('Marker Information: ' + markerTextboxValue);
  };

  window.deleteMarker = function () {
    if (currentMarker) {
      mymap.removeLayer(currentMarker);
    }
  };
});
