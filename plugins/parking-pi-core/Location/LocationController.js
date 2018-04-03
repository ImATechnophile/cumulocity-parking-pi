(function () {
  'use strict';

  angular
    .module('device')
    .controller('locationcontroller', locationcontroller);

  /* @ngInject */
  function locationcontroller(
    $scope,
    $q,
    $routeParams,
    $rootScope,
    c8yDevices,
    c8yAlert

  ) {
    $scope.$on("$destroy",function(){
    if (angular.isDefined(stop)) {
        $interval.cancel(stop);
        console.log("destroy");
      }
    });
    c8yDevices.detail($routeParams.deviceId).then(function (res) {
      var fulldata=res.data;
      console.log("new location :",fulldata.c8y_Position);
      var pos=fulldata.c8y_Position;
      var latlng = {lat: parseFloat(pos.lat), lng: parseFloat(pos.lng)};
      console.log(latlng);
      var geocoder = new google.maps.Geocoder;
      geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              console.log(results[0]);

              console.log(results[0].formatted_address);
              var mymap = L.map('mapid').setView([pos.lat, pos.lng], 13);
              L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=sk.eyJ1Ijoic2FyYXZhbmFwcmFrYXNoIiwiYSI6ImNqZWk0cHl3NjA0OHcycG9zY2drNTh6NzYifQ.9k4pUoma8BUHyjyo1smidg', {
              attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
              maxZoom: 18,
              id: 'mapbox.streets',
              accessToken: 'sk.eyJ1Ijoic2FyYXZhbmFwcmFrYXNoIiwiYSI6ImNqZWk0cHl3NjA0OHcycG9zY2drNTh6NzYifQ.9k4pUoma8BUHyjyo1smidg'
          }).addTo(mymap);
              var greenIcon = L.icon({
                iconUrl: 'parking_pi_parking-pi-core/Images/Location-markerred-red-ball.png',
                shadowUrl: '',

                iconSize:     [58, 68], // size of the icon
                shadowSize:   [18, 18], // size of the shadow
                iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

              var marker = L.marker([pos.lat, pos.lng],{icon: greenIcon}).addTo(mymap).bindPopup(results[0].formatted_address)
              .openPopup();
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
    });
    
  }
}());
