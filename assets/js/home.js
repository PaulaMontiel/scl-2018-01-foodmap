var map;
var infowindow;
const santiago = {lat: -33.418952, lng:  -70.641750};
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
        //infowindow.setContent(place.name);
        //infowindow.open(map, this);
        document.getElementById('popup').setAttribute(
            "style", "visibility:visible; opacity: 1;background-color: rgba(0,0,0,0.8); position: fixed; top:0; left:0; right:0; bottom:0; margin:0; z-index: 999; transition:all 1s;");

        document.getElementById('tituloModal').innerHTML = place.name;
        document.getElementById('textoModal').innerHTML = place.vicinity;
        //mostrando contenido en la consola
        //console.log(JSON.stringify(place));
        //document.getElementById().innerHTML = place.photo;
    });
} 
function imageClick(id){
	const imagen = id;
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
        name: imagen
    }, callback);
}

function cerrarModal(){
    document.getElementById('popup').setAttribute(
        "style", "visibility: hidden; margin-top: -300px;");
}