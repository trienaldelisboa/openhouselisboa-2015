var url;

function createMarkers(callback) {
	var my_json_str = php_params.my_arr.replace(/&quot;/g, '"');
	var my_php_arr = jQuery.parseJSON(my_json_str);	
	url = php_params.link_plugin.replace(/&quot;/g, '"');

	callback(my_php_arr);

}

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}       

function initialize(markers) {

 var latlng = new google.maps.LatLng('38.7281', '-9.1607');

 var mapOptions = {
   zoom: 12,
   center: latlng,
   mapTypeId: google.maps.MapTypeId.ROADMAP,
   styles: [ { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#00a2e6" } ] },{ "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" } ] },{ "featureType": "road.local", "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" } ] },{ "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] },{ "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [ { "visibility": "off" } ] },{ "elementType": "labels.text.fill", "stylers": [ { "color": "#29211a" } ] },{ "featureType": "landscape", "elementType": "geometry.fill", "stylers": [ { "color": "#d4d4d4" } ] },{ "featureType": "landscape", "elementType": "geometry.fill", "stylers": [ { "color": "#d4d4d4" } ] },{ "featureType": "poi", "elementType": "geometry.fill", "stylers": [ { "color": "#d4d4d4" } ] },{ },{ "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" } ] },{ "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#ffffff" } ] },{ "featureType": "transit.station.airport", "elementType": "geometry.fill", "stylers": [ { "color": "#d4d4d4" } ] },{ },{ "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#ffffff" } ] },{ "featureType": "water", "elementType": "labels.text.stroke", "stylers": [ { "color": "#808080" }, { "visibility": "off" } ] },{ },{ "featureType": "transit.line", "elementType": "labels.text.fill", "stylers": [ { "color": "#ffffff" } ] },{ "featureType": "transit.line", "elementType": "labels.text.stroke", "stylers": [ { "color": "#808080" }, { "visibility": "off" } ] },{ } ]

 };

 var map = new google.maps.Map(document.getElementById('map'),
   mapOptions);

 var infowindowlayout = new google.maps.InfoWindow({
  content: ''
});

 $.each(markers, function(key, value) {
   var placelatlng = new google.maps.LatLng(value['lat'], value['lng']);


   var marker = new RichMarker({
     position: placelatlng,
     map: map,
     draggable: false,
     flat: true,
     content: '<div style="margin-top:3em; display:block;"><span class="place-number">'+value['number']+'</span></div>'
   });

   var infoWindowContent = '<div class="custom-info-window"><span class="place-number">'+value['number']+'</span><a class="info-window-url" href="'+value['url']+'"><h3 class="info-window-title">'+value['title']+'</h3></a></div>';
   

   google.maps.event.addListener(marker, 'click', function() {
    infowindowlayout.setContent(infoWindowContent);
    infowindowlayout.open(map, this);
  });

   if (value['number'] == getUrlParameter('q')) {
      infowindowlayout.setContent(infoWindowContent);
      infowindowlayout.open(map, marker);
      map.setZoom(15);
      map.setCenter(marker.position);
   };

 });

}
