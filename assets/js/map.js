document.addEventListener('DOMContentLoaded', () => {
  var L = window.L;
  var mymap = L.map('map', {
    doubleClickZoom: false,
  }).setView([0, 0], 3);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

  var markers = {}; // Object to store marker-specific data

  mymap.on('dblclick', (event) => {
    var lat = event.latlng.lat;
    var lng = event.latlng.lng;

    var currentMarker = L.marker([lat, lng]).addTo(mymap);

    markers[currentMarker._leaflet_id] = {
      wheelchairState: false,
      sightState: false,
      hearingState: false,
      speechState: false,
      starRating: 0,
    };

    currentMarker.bindPopup(`
      <div style="max-width: 200px;">

        <button style="float: right;" onclick="saveMarkerInfo(${currentMarker._leaflet_id})">Save</button>
        <button id="deleteButton" onclick="deleteMarker(${currentMarker._leaflet_id})">Delete</button>
        <div><p>
        <div id="starRating" style="text-align: center; margin-bottom: 10px;">
          ${getStarRatingHTML(currentMarker._leaflet_id, markers[currentMarker._leaflet_id].starRating)}
        </div>
          Marker Information: </p>
          <input type="text" id="markerTextbox" placeholder="Enter information">
        </div>
        <div style="text-align: left; margin-top: 10px;">
          <button id="wheelchairstate" onclick="toggleWheelchair(${currentMarker._leaflet_id})">
            <span class="play-icon"><i class="fa fa-wheelchair"></i></span>
          </button>

          <button id="sightState" onclick="toggleEye(${currentMarker._leaflet_id})">
            <span class="play-icon"><i class="fa fa-blind"></i></span>
          </button>

          <button id="hearingState" onclick="toggleEar(${currentMarker._leaflet_id})">
            <span class="play-icon"><i class="fa fa-deaf"></i></span>
          </button>

          <button id="speechState" onclick="speechButton(${currentMarker._leaflet_id})">
            <span class="play-icon"><i class="fa fa-commenting"></i></span>
          </button>
        </div>
      </div>
    `).openPopup();
  });

  window.toggleWheelchair = function (markerId) {
    var wheelchairstate = document.getElementById('wheelchairstate');
    markers[markerId].wheelchairState = !markers[markerId].wheelchairState;
    wheelchairstate.style.backgroundColor = markers[markerId].wheelchairState ? 'rgb(67, 183, 230)' : 'white';

    var icon = wheelchairstate.children[0].children[0];
    icon.style.color = markers[markerId].wheelchairState ? 'white' : 'rgb(67, 183, 230)';
  };

  window.toggleEye = function (markerId) {
    var sightButton = document.getElementById('sightState');
    markers[markerId].sightState = !markers[markerId].sightState;
    sightButton.style.backgroundColor = markers[markerId].sightState ? 'rgb(67, 183, 230)' : 'white';

    var icon = sightButton.children[0].children[0];
    icon.style.color = markers[markerId].sightState ? 'white' : 'rgb(67, 183, 230)';
  };

  window.toggleEar = function (markerId) {
    var hearingButton = document.getElementById('hearingState');
    markers[markerId].hearingState = !markers[markerId].hearingState;
    hearingButton.style.backgroundColor = markers[markerId].hearingState ? 'rgb(67, 183, 230)' : 'white';

    var icon = hearingButton.children[0].children[0];
    icon.style.color = markers[markerId].hearingState ? 'white' : 'rgb(67, 183, 230)';
  };

  window.speechButton = function (markerId) {
    var speechButton = document.getElementById('speechState');
    markers[markerId].speechState = !markers[markerId].speechState;
    speechButton.style.backgroundColor = markers[markerId].speechState ? 'rgb(67, 183, 230)' : 'white';

    var icon = speechButton.children[0].children[0];
    icon.style.color = markers[markerId].speechState ? 'white' : 'rgb(67, 183, 230)';
  };


  window.saveMarkerInfo = function (markerId) {
    var markerTextboxValue = document.getElementById('markerTextbox').value;
    alert('Marker Information: ' + markerTextboxValue + '\nStates in order: ' + markers[markerId].wheelchairState + ' ' + markers[markerId].sightState + ' ' + markers[markerId].hearingState + ' ' + markers[markerId].speechState + '\nStar Rating: ' + markers[markerId].starRating);
  };

  window.deleteMarker = function (markerId) {
    if (markers[markerId]) {
      mymap.removeLayer(mymap._layers[markerId]);
      delete markers[markerId];
    }
  };

  function getStarRatingHTML(markerId, rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
      starsHTML += `<span style="cursor: pointer;" onclick="setStarRating(${markerId}, ${i}, event)"><i class="fa ${i <= rating ? 'fa-star' : 'fa-star-o'}"></i></span>`;
    }
    return starsHTML;
  }

  window.setStarRating = function (markerId, rating, event) {
    markers[markerId].starRating = rating;
    document.getElementById('starRating').innerHTML = getStarRatingHTML(markerId, rating);
    event.stopPropagation();
  };
});
