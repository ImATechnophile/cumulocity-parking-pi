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
    $scope.hi="hello...";
    $scope.onlylatlng=[];
    $scope.entire=[];
    var getDevicesFromInventory = {
      devices: getRequiredDevices()
    };
    $q.all(getDevicesFromInventory).then(IterateIt);

    function getRequiredDevices() {
      var filters = {type: 'c8y_Linux' };
      console.log("devices",c8yInventory.list(filters));
      return c8yInventory.list(filters);
    }
    function reversegeo(latLng,geoCoder,details){
        console.log("feun latlng",latLng);
        geoCoder.geocode({'location': latLng}, function(results, status) {
        if (status === 'OK') {
                        console.log("results",results);
                        $scope.address=results[0].formatted_address;
                        $scope.onlylatlng.push(results[0].formatted_address);
                        //details.location=results[0].formatted_address;
                    }
      });
    }

    function IterateIt(fullData) {
      console.log("fullData",fullData);
      var geoCoder = new google.maps.Geocoder;
      angular.forEach(fullData.devices, function(device){
      var pos = device.c8y_Position;
      
      var details={
        serialNo: $scope.entire.length+1,
        lat: pos.lat,
        lng: pos.lng,
        name: device.name,
        deviceId:device.id
      };
      var latLng = {lat: parseFloat(pos.lat), lng: parseFloat(pos.lng)};
      reversegeo(latLng,geoCoder,details);
      
      console.log("details",details);

     if (device.com_softwareag_parkingpi_ParkingPiStatus) {
                        //console.log(typeof(device.c8y_Connection.status));
                        //console.log(device.c8y_Connection.status);
                        if(device.com_softwareag_parkingpi_ParkingPiStatus.status=="INACTIVE") {
                            details.status = "fa-power-off text-danger";
                        } else if(device.com_softwareag_parkingpi_ParkingPiStatus.status=="ACTIVE") {
                            details.status = "fa-plug text-success";
                        } else {
                            details.status = "fa-wrench text-warning";
                        }
                    } else {
                        details.status = "fa-wrench text-warning";
                    }
        console.log("detailsafter",details);
      $scope.entire.push(details);
     
    });
  }
}

}());
