class Marker {
  constructor(id, lat, lng) {
    this.id = id;
    this.lat = lat;
    this.lng = lng;
    this.wheelchairState = false;
    this.sightState = false;
    this.hearingState = false;
    this.speechState = false;
    this.starRating = 0;
  }
}

class PopupManager {
  static createPopup(marker) {
    var L = window.L;
    const popupContent = `
      <div style="max-width: 200px;">
        <button style="float: right;" onclick="saveMarkerInfo(${marker.id})">Save</button>
        <button id="deleteButton" onclick="deleteMarker(${marker.id})">Delete</button>
        <div>
          <p>
            <div id="starRating" style="text-align: center; margin-bottom: 10px;">
              ${getStarRatingHTML(marker.id, marker.starRating)}
            </div>
            Marker Information:
          </p>
          <input type="text" id="markerTextbox" placeholder="Enter information">
        </div>
        <div style="text-align: left; margin-top: 10px;">
          <button id="wheelchairstate" onclick="toggleWheelchair(${marker.id})">
            <span class="play-icon"><i class="fa fa-wheelchair"></i></span>
          </button>
          <button id="sightState" onclick="toggleEye(${marker.id})">
            <span class="play-icon"><i class="fa fa-blind"></i></span>
          </button>
          <button id="hearingState" onclick="toggleEar(${marker.id})">
            <span class="play-icon"><i class="fa fa-deaf"></i></span>
          </button>
          <button id="speechState" onclick="speechButton(${marker.id})">
            <span class="play-icon"><i class="fa fa-commenting"></i></span>
          </button>
        </div>
      </div>
    `;
    return L.popup().setLatLng([marker.lat, marker.lng]).setContent(popupContent);
  }
}

class Map {
  constructor() {
    this.L = window.L;
    this.mymap = this.L.map('map', {
      doubleClickZoom: false,
    }).setView([0, 0], 3);

    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.mymap);
    this.markers = {};

    this.mymap.on('dblclick', this.handleMapDoubleClick.bind(this));
    this.mymap.on('popupopen', this.handlePopupOpen.bind(this));
  }

  handleMapDoubleClick(event) {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    const markerId = new Date().getTime(); // Use timestamp as a unique ID
    const newMarker = new Marker(markerId, lat, lng);
    const currentMarker = this.L.marker([lat, lng]).addTo(this.mymap);
    this.markers[currentMarker._leaflet_id] = newMarker;
    const popup = PopupManager.createPopup(newMarker).openPopup();
    currentMarker.bindPopup(popup);
  }

  handlePopupOpen(event) {
    const popup = event.popup;
    const markerId = popup._source._leaflet_id;
    const markerData = this.markers[markerId];
    this.toggleButtonColor('wheelchairstate', markerData.wheelchairState);
    this.toggleButtonColor('sightState', markerData.sightState);
    this.toggleButtonColor('hearingState', markerData.hearingState);
    this.toggleButtonColor('speechState', markerData.speechState);
    this.toggleStarRating(markerId, markerData.starRating);
  }

  toggleButtonColor(buttonId, state) {
    const button = document.getElementById(buttonId);
    button.style.backgroundColor = state ? 'rgb(67, 183, 230)' : 'white';
    const icon = button.children[0].children[0];
    icon.style.color = state ? 'white' : 'rgb(67, 183, 230)';
  }

  toggleStarRating(markerId, rating) {
    const starRatingContainer = document.getElementById('starRating');
    starRatingContainer.innerHTML = getStarRatingHTML(markerId, rating);
  }
}

const mapInstance = new Map();

function getStarRatingHTML(markerId, rating) {
  let starsHTML = '';
  for (let i = 1; i <= 5; i++) {
    starsHTML += `<span style="cursor: pointer;" onclick="setStarRating(${markerId}, ${i}, event)"><i class="fa ${i <= rating ? 'fa-star' : 'fa-star-o'}"></i></span>`;
  }
  return starsHTML;
}

window.setStarRating = function (markerId, rating, event) {
  mapInstance.markers[markerId].starRating = rating;
  document.getElementById('starRating').innerHTML = getStarRatingHTML(markerId, rating);
  event.stopPropagation();
};

window.toggleWheelchair = function (markerId) {
  const wheelchairstate = document.getElementById('wheelchairstate');
  mapInstance.markers[markerId].wheelchairState = !mapInstance.markers[markerId].wheelchairState;
  wheelchairstate.style.backgroundColor = mapInstance.markers[markerId].wheelchairState ? 'rgb(67, 183, 230)' : 'white';
  const icon = wheelchairstate.children[0].children[0];
  icon.style.color = mapInstance.markers[markerId].wheelchairState ? 'white' : 'rgb(67, 183, 230)';
};

window.toggleEye = function (markerId) {
  const sightButton = document.getElementById('sightState');
  mapInstance.markers[markerId].sightState = !mapInstance.markers[markerId].sightState;
  sightButton.style.backgroundColor = mapInstance.markers[markerId].sightState ? 'rgb(67, 183, 230)' : 'white';
  const icon = sightButton.children[0].children[0];
  icon.style.color = mapInstance.markers[markerId].sightState ? 'white' : 'rgb(67, 183, 230)';
};

window.toggleEar = function (markerId) {
  const hearingButton = document.getElementById('hearingState');
  mapInstance.markers[markerId].hearingState = !mapInstance.markers[markerId].hearingState;
  hearingButton.style.backgroundColor = mapInstance.markers[markerId].hearingState ? 'rgb(67, 183, 230)' : 'white';
  const icon = hearingButton.children[0].children[0];
  icon.style.color = mapInstance.markers[markerId].hearingState ? 'white' : 'rgb(67, 183, 230)';
};

window.speechButton = function (markerId) {
  const speechButton = document.getElementById('speechState');
  mapInstance.markers[markerId].speechState = !mapInstance.markers[markerId].speechState;
  speechButton.style.backgroundColor = mapInstance.markers[markerId].speechState ? 'rgb(67, 183, 230)' : 'white';
  const icon = speechButton.children[0].children[0];
  icon.style.color = mapInstance.markers[markerId].speechState ? 'white' : 'rgb(67, 183, 230)';
};

window.saveMarkerInfo = function (markerId) {
  const markerTextboxValue = document.getElementById('markerTextbox').value;
  alert('Marker Information: ' + markerTextboxValue + '\nStates in order: ' + mapInstance.markers[markerId].wheelchairState + ' ' + mapInstance.markers[markerId].sightState + ' ' + mapInstance.markers[markerId].hearingState + ' ' + mapInstance.markers[markerId].speechState + '\nStar Rating: ' + mapInstance.markers[markerId].starRating);
};

window.deleteMarker = function (markerId) {
  if (mapInstance.markers[markerId]) {
    mapInstance.mymap.removeLayer(mapInstance.mymap._layers[markerId]);
    delete mapInstance.markers[markerId];
  }
};
