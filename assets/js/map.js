document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-undef
  var mymap = L.map('map', {
    doubleClickZoom: false,
  }).setView([0, 0], 3);

  // eslint-disable-next-line no-undef
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

  var currentMarker;
  var wheelchairState = false;
  var sightState = false;
  var hearingState = false;
  var speechState = false;
  var starRating = 0; // Initial star rating

  mymap.on('dblclick', (event) => {
    var lat = event.latlng.lat;
    var lng = event.latlng.lng;

    // eslint-disable-next-line no-undef
    currentMarker = L.marker([lat, lng]).addTo(mymap);

    currentMarker.bindPopup(`
      <div style="max-width: 200px;">

        <button style="float: right;" onclick="saveMarkerInfo()">Save</button>
        <button id="deleteButton" onclick="deleteMarker()">Delete</button>
        <div><p>
        <div id="starRating" style="text-align: center; margin-bottom: 10px;">
          ${getStarRatingHTML(starRating)}
        </div>
          Marker Information: </p>
          <input type="text" id="markerTextbox" placeholder="Enter information">
        </div>
        <div style="text-align: left; margin-top: 10px;">
          <button id="wheelchairstate" onclick="toggleWheelchair()">
            <span class="play-icon"><i class="fa fa-wheelchair"></i></span>
          </button>

          <button id="sightState" onclick="toggleEye()">
            <span class="play-icon"><i class="fa fa-blind"></i></span>
          </button>

          <button id="hearingState" onclick="toggleEar()">
            <span class="play-icon"><i class="fa fa-deaf"></i></span>
          </button>

          <button id="speechState" onclick="speechButton()">
            <span class="play-icon"><i class="fa fa-commenting"></i></span>
          </button>
        </div>
      </div>
    `).openPopup();
  });

  window.toggleWheelchair = function () {
    var wheelchairstate = document.getElementById('wheelchairstate');

    wheelchairState = !wheelchairState;
    wheelchairstate.style.backgroundColor = wheelchairState ? '#28a745' : '#f0f0f0';
  };

  window.toggleEye = function () {
    var sightButton = document.getElementById('sightState');

    sightState = !sightState;
    sightButton.style.backgroundColor = sightState ? '#28a745' : '#f0f0f0';
  };

  window.toggleEar = function () {
    var hearingButton = document.getElementById('hearingState');

    hearingState = !hearingState;
    hearingButton.style.backgroundColor = hearingState ? '#28a745' : '#f0f0f0';
  };

  window.speechButton = function () {
    var speechButton = document.getElementById('speechState');

    speechState = !speechState;
    speechButton.style.backgroundColor = speechState ? '#28a745' : '#f0f0f0';
  };

  window.saveMarkerInfo = function () {
    var markerTextboxValue = document.getElementById('markerTextbox').value;
    alert('Marker Information: ' + markerTextboxValue + '\nStates in order: ' + wheelchairState + ' ' + sightState + ' ' + hearingState + ' ' + speechState + '\nStar Rating: ' + starRating);
  };

  window.deleteMarker = function () {
    if (currentMarker) {
      mymap.removeLayer(currentMarker);
    }
  };

  // Function to generate HTML for star rating
  function getStarRatingHTML(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
      starsHTML += `<span style="cursor: pointer;" onclick="setStarRating(${i}, event)"><i class="fa ${i <= rating ? 'fa-star' : 'fa-star-o'}"></i></span>`;
    }
    return starsHTML;
  }

  // Function to set the star rating
  window.setStarRating = function (rating, event) {
    starRating = rating;
    document.getElementById('starRating').innerHTML = getStarRatingHTML(rating);
    event.stopPropagation(); // Prevents the event from reaching the map and closing the popup
  };
});
