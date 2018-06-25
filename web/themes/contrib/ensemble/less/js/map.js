(function ($) {
  // Add basemap tiles and attribution.
  var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  });

  // Create map and set center and zoom.
  var map = L.map('map', {
    scrollWheelZoom: true,
    center: [43.587709, 3.919725],
    zoom: 12
  });

  // Add basemap to map.
  map.addLayer(baseLayer);
  // Path to map icons
  L.Icon.Default.imagePath = '/themes/contrib/ensemble/less/images/leaflet/';
  //var marker = L.marker([43.591735400166904, ]).addTo(map);

  // création d'une autre icone
  var greenIcon = L.icon({
    iconUrl: '/themes/contrib/ensemble/less/images/leaflet/leaf-green.png',
    shadowUrl: '/themes/contrib/ensemble/less/images/leaflet/leaf-shadow.png',
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  var blueIcon = L.icon({
    iconUrl: '/themes/contrib/ensemble/less/images/leaflet/marker-icon.png',
    iconSize:     [25, 41], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  //L.marker([43.591735400166904, 3.9187557569389355], {icon: greenIcon}).addTo(map);

  // points from drupal view
  $.getJSON('/events', function(data) {
    addDataToMap(data, map);
  });

  var lat , long, title, description;
  marker = [];

  // Pop up message
  function addDataToMap(data, map) {
    for (var i = 0; i < data.features.length; i ++) {
      lat = data.features[i].geometry.coordinates[1];
      long = data.features[i].geometry.coordinates[0];
      title = data.features[i].properties.name;
      description = data.features[i].properties.description;

      console.log(lat + " - " + long+ " - " + title+ " - " + description);
      marker[i] = L.marker([lat, long], {icon: blueIcon}).addTo(map);
      marker[i].bindPopup(title + "<br>" + description);
      /*new L.Marker([lat, long], {
        icon: new L.DivIcon({
          className: 'my-div-icon',
          html: '<img class="my-div-image" src="/themes/contrib/ensemble/less/images/leaflet/marker-icon.png"/>'+
          '<span class="my-div-span">' + title + '</span>'
        })
      }).addTo(map);*/

    }
  }

  // Gestion des événements
  $("#hide-markers").click(function(){
    for (var i = 0; i < marker.length; i++) {
      map.removeLayer(marker[i]);
    }
  });
  $("#show-markers").click(function(){
    for (var i = 0; i < marker.length; i++) {
      marker[i].addTo(map);
    }
  });

})(jQuery);

/*
(function ($) {

  // Add basemap tiles and attribution.
  var baseLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  });

  // Create map and set center and zoom.
  var map = L.map('map', {
    scrollWheelZoom: true,
    center: [43.587709, 3.919725],
    zoom: 12
  });

  // Add basemap to map.
  map.addLayer(baseLayer);

  // Path to map icons
  L.Icon.Default.imagePath = '/themes/contrib/ensemble/less/images/leaflet/';



  // second list of points
  // Path to map icons
  $.getJSON('/other-points', function(data) {
    //console.log(data);
    L.Icon.Default.imagePath = '/themes/contrib/ensemble/less/images/leaflet/';
    addDataToMap(data, map);
  });

 // Pop up message
 function addDataToMap(data, map) {
 var dataLayer = L.geoJson(data, {
 onEachFeature: function(feature, layer) {
 var popupText = feature.properties.name + feature.properties.description;
 layer.bindPopup(popupText);
 console.log(data);
 }
 });
 dataLayer.addTo(map);
 }



})(jQuery);
*/
