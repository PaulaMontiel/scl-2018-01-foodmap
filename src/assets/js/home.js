// var map;
// var infowindow;
// const santiago = {lat: -33.418952, lng:  -70.641750};
// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: santiago,
//         zoom: 13,
//     });

//     infowindow = new google.maps.InfoWindow();
//     const service = new google.maps.places.PlacesService(map);
//     service.nearbySearch({
//         location: santiago,
//         radius: 700,
//         types: ['restaurant', 'food'],
//     }, callback);
// }

// function callback(results, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//         for (let i = 0; i < results.length; i++) {
//             createMarker(results[i]);
//         }
//     }
// }

// function searchRestaurant(){
//     const busqueda = document.getElementById('search').value;
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: santiago,
//         zoom: 13,
//     });

//     infowindow = new google.maps.InfoWindow();
//     const service = new google.maps.places.PlacesService(map);
//     service.nearbySearch({
//         location: santiago,
//         radius: 700,
//         types: ['restaurant', 'food'],
//         name: busqueda
//     }, callback);
// }

// function createMarker(place) {
//     const placeLoc = place.geometry.location;
//     const marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location
//     });
//     function createPhotoMarker(place) {
//         var photos = place.photos;
//         if (!photos) {
//           return;
//         }
      
//         var marker = new google.maps.Marker({
//           map: map,
//           position: place.geometry.location,
//           title: place.name,
//           icon: photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})
//         });
//     }
    
//     google.maps.event.addListener(marker, 'click', function() {
//         //infowindow.setContent(place.name);
//         //infowindow.open(map, this);
//         document.getElementById('popup').setAttribute(
//             "style", "visibility:visible; opacity: 1;background-color: rgba(0,0,0,0.8); position: fixed; top:0; left:0; right:0; bottom:0; margin:0; z-index: 999; transition:all 1s;");

//         document.getElementById('tituloModal').innerHTML = place.name;
//         document.getElementById('imagenModal').innerHTML = place.photo;
//         document.getElementById('textoModal').innerHTML = place.vicinity;
//         //mostrando contenido en la consola
//         console.log(JSON.stringify(place));
//         //document.getElementById('imagen').innerHTML = place.photos[0].html_attributions[0]);
//     console.log(JSON.stringify(place.photos[0].html_attributions[0]));
//     });
// } 
// function imageClick(id){
// 	const imagen = id;
// 	map = new google.maps.Map(document.getElementById('map'), {
//         center: santiago,
//         zoom: 13,
//     });

//     infowindow = new google.maps.InfoWindow();
//     const service = new google.maps.places.PlacesService(map);
//     service.nearbySearch({
//         location: santiago,
//         radius: 700,
//         types: ['restaurant', 'food'],
//         name: imagen
//     }, callback);
// }

// function cerrarModal(){
//     document.getElementById('popup').setAttribute(
//         "style", "visibility: hidden; margin-top: -300px;");
// }

var map;

function initMap() {
  // Create the map.
  const laboratoria = {lat: -33.418952, lng:  -70.641750};
  map = new google.maps.Map(document.getElementById('map'), {
    center: laboratoria,
    zoom: 17
  });

  // Create the places service.
  var service = new google.maps.places.PlacesService(map);
  var getNextPage = null;
  var moreButton = document.getElementById('more');
  moreButton.onclick = function() {
    moreButton.disabled = true;
    if (getNextPage) getNextPage();
  };

  // Perform a nearby search.
  service.nearbySearch(
      {location: laboratoria, radius: 500, type: ['restaurant','food']},
      function(results, status, pagination) {
        if (status !== 'OK') return;

        createMarkers(results);
        moreButton.disabled = !pagination.hasNextPage;
        getNextPage = pagination.hasNextPage && function() {
          pagination.nextPage();
        };
      });
}

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById('places');

  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    var li = document.createElement('li');
    li.textContent = place.name;
    placesList.appendChild(li);

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}
