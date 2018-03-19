(function () {
  'use strict';

  angular
    .module('device')
    .controller('DevicesController',DevicesController);

  /* @ngInject */
  function DevicesController(
    $scope,
    $q,
    c8yInventory
  ) {
    $scope.entire=[];
    var getDevicesFromInventory = {
      devices: getRequiredDevices()
    };
    $q.all(getDevicesFromInventory).then(IterateIt);

    function getRequiredDevices() {
      var filters = {type: 'c8y_Linux' };
      return c8yInventory.list(filters);
    }

    function IterateIt(fullData) {
      angular.forEach(fullData.devices, function(device){
      var pos = device.c8y_Position;
      var details={
        serialNo: $scope.entire.length+1,
       // lat: pos.lat,
        //lng: pos.lng,
        name: device.name,
        deviceId:device.id
      };







      var latlng = {lat: parseFloat(pos.lat), lng: parseFloat(pos.lng)};
      var geocoder = new google.maps.Geocoder;
      geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              console.log(results[0]);
              //infowindow.setContent(results[0].formatted_address);
              details.location=results[0].formatted_address;
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });









      
      if (device.c8y_Connection) {
        //details.status = device.c8y_Connection.status;
        console.log(typeof(device.c8y_Connection.status));
        console.log(device.c8y_Connection.status);
        if(device.c8y_Connection.status=="DISCONNECTED")
        {
          details.status = "fa-power-off text-danger";
        }
        else{
          details.status = "fa-plug text-success";
        }
      }
      else{
        details.status = "fa-wrench text-warning";
      }
      $scope.entire.push(details);
     
    });
  }
}

}());
