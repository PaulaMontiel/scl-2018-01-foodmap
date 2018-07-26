var map;
var infowindow;
const santiago = {lat: -33.447487, lng: -70.673676};
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: santiago,
        zoom: 13,
    });

    infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: santiago,
        radius: 700,
        types: ['restaurant', 'food'],
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function searchRestaurant(){
    const busqueda = document.getElementById('search').value;
    map = new google.maps.Map(document.getElementById('map'), {
        center: santiago,
        zoom: 13,
    });

    infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: santiago,
        radius: 700,
        types: ['restaurant', 'food'],
        name: busqueda
    }, callback);
}

function createMarker(place) {
    const placeLoc = place.geometry.location;
    const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
function searchJapanese(){
    const busqueda = document.getElementById('search').value;
    map = new google.maps.Map(document.getElementById('map'), {
        center: santiago,
        zoom: 13,
    });

    infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: santiago,
        radius: 700,
        types: ['restaurant', 'food'],
        name: Japanese
    }, callback);
}