var truckLocation = [121.0162967, 14.548604];
var position;

mapboxgl.accessToken = 'pk.eyJ1IjoiamhvbmpwIiwiYSI6ImNqanA2aWZvMTAzMTMza3A0d2prcHM4Z2wifQ.CisG5CTxthlyrUgRIzeZEQ';

// This adds the map to your page
var map = new mapboxgl.Map({
     container: 'map', // container id
     style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
     center: truckLocation, // starting position
     zoom: 12 // starting zoom
});

// Add geolocate control to the map.
var geolocate = new mapboxgl.GeolocateControl({
     positionOptions: {
       enableHighAccuracy: true
     },
       trackUserLocation: true
});

map.addControl(geolocate);

geolocate.on('geolocate', function(e) {
     var lon = e.coords.longitude;
     var lat = e.coords.latitude;
     //position = [lon, lat];
     
     // Create a starting marker
     new mapboxgl.Marker(marker)
          .setLngLat([lon, lat])
          .addTo(map);
});

var warnings = {
     "type": "FeatureCollection",
     "features": [
       {
         "type": "Feature",
         "geometry": {
           "type": "Point",
           "coordinates": [
               121.0215032,
               14.5520482
           ]
         },
         "properties": {
               "id":"call1",
               "phone": "09103990001",
               "title": "Esperanza St",
               "city": "Makati City"
         }
       },
       {
         "type": "Feature",
         "geometry": {
           "type": "Point",
           "coordinates": [
               121.0196364,
               14.551799
           ]
         },
         "properties": {
               "id":"call2",
               "phone": "09103990002",
               "title": "Paseo de Roxas",
               "city": "Makati City"
         }
       },
       {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
               121.0179969,
               14.5539043
            ]
          },
          "properties": {
               "id":"call3",
               "phone": "09103990003",
               "title": "Legazpi Village",
               "city": "Makati City"
          }
        }
     ]
};

//map on load
map.on('load', function(e) {

     geolocate.trigger();
     
     // Add the data to your map as a layer
     map.addLayer({
       id: 'locations',
       type: 'symbol',
       // Add a GeoJSON source containing place coordinates and information.
       source: {
         type: 'geojson',
         data: warnings
       },
       layout: {
         'icon-allow-overlap': true,
       }
     });

     map.addSource('places', {
          type: 'geojson',
          data: warnings
     });

     buildLocationList(warnings);

     warnings.features.forEach(function(marker) {
          // Create a div element for the marker
          var el = document.createElement('div');
          // Add a class called 'marker' to each div
          el.className = 'warning_signal';
          // By default the image for your custom marker will be anchored
          // by its center. Adjust the position accordingly
          // Create the custom markers, set their position, and add to map
          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);

          el.addEventListener('click', function(e) {
               var activeItem = document.getElementsByClassName('active');
               // 1. Fly to the point
               flyToStore(marker);
               // 2. Close all other popups and display popup for clicked store
               createPopUp(marker);
               // 3. Highlight listing in sidebar (and remove highlight for all other listings)
               e.stopPropagation();
               if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
               }
          });
     });


     // Add an event listener for when a user clicks on the map
     map.on('click', function(e) {
          // Query all the rendered points in the view
          var features = map.queryRenderedFeatures(e.point, { layers: ['locations'] });
          if (features.length) {
               var clickedPoint = features[0];
               // 1. Fly to the point
               flyToStore(clickedPoint);
               // 2. Close all other popups and display popup for clicked store
               createPopUp(clickedPoint);
               // 3. Highlight listing in sidebar (and remove highlight for all other listings)
               e.stopPropagation();
               var activeItem = document.getElementsByClassName('active');
               if (activeItem[0]) {
               activeItem[0].classList.remove('active');
               }
               // Find the index of the store.features that corresponds to the clickedPoint that fired the event listener
               var selectedFeature = clickedPoint.properties.title;
          
               for (var i = 0; i < warnings.features.length; i++) {
               if (warnings.features[i].properties.title === selectedFeature) {
                    selectedFeatureIndex = i;
               }
               }
               // Select the correct list item using the found index and add the active class
               var listing = document.getElementById('item-' + selectedFeatureIndex);
               listing.classList.add('active');
          }else{

               var popUps = document.getElementsByClassName('mapboxgl-popup');
               popUps[0].remove();
          
          }
          
     });

});

function buildLocationList(data) {
     // Iterate through the list of warning
     for (i = 0; i < data.features.length; i++) {
       var currentFeature = data.features[i];
       // Shorten data.feature.properties to `prop` so we're not
       // writing this long form over and over again.
       var prop = currentFeature.properties;
       // Select the listing container in the HTML and append a div
       // with the class 'item' for each store
       var listings = document.getElementById('cd-main-nav');
       var listing = listings.appendChild(document.createElement('li'));
       listing.className = 'list-unstyled';
       listing.id = 'item-' + i;
   
       // Create a new link with the class 'title' for each store
       // and fill it with the store title
       var link = listing.appendChild(document.createElement('a'));
       link.href = '#';
       link.className = '';
       link.dataPosition = i;
       link.innerHTML = prop.title;

     // Add an event listener for the links in the sidebar listing
     link.addEventListener('click', function(e) {
          // Update the currentFeature to the store associated with the clicked link
          var clickedListing = data.features[this.dataPosition];
          // 1. Fly to the point associated with the clicked link
          flyToStore(clickedListing);
          // 2. Close all other popups and display popup for clicked store
          createPopUp(clickedListing);
          
          var activeItem = document.getElementsByClassName('cd-nav-trigger');
          var itemshide = document.getElementById('cd-main-nav');
          itemshide.classList.remove('is-visible');
          if (activeItem[0]) {
               activeItem[0].classList.remove('menu-is-open');
          }
          //this.parentNode.classList.add('active');
     });

     }
}

function flyToStore(currentFeature) {
     map.flyTo({
       center: currentFeature.geometry.coordinates,
       zoom: 15
     });
}
   
function createPopUp(currentFeature) {
     var popUps = document.getElementsByClassName('mapboxgl-popup');
     // Check if there is already a popup on the map and if so, remove it
     if (popUps[0]) popUps[0].remove();

     var popup = new mapboxgl.Popup()
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML('<a id="callthis" href=\"tel:'+currentFeature.properties.phone+'\">'+
          '<p>SOS Request</p>'+
          '<small>'+currentFeature.properties.title+'<br>'+currentFeature.properties.phone+'</small></a>')
          .addTo(map);
}

// This will let you use the .remove() function later on
if (!('remove' in Element.prototype)) {
     Element.prototype.remove = function() {
       if (this.parentNode) {
         this.parentNode.removeChild(this);
       }
     };
}

