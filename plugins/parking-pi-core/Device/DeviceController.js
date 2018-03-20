(function () {
  'use strict';

  angular
    .module('device')
    .controller('DevicesController',DevicesController);

  /* @ngInject */
  function DevicesController(
    $scope,
    c8yInventory
  ) {
    $scope.entire=[];

    function init() {
        var filters = {type: 'c8y_Linux' };
        console.log("Filter ", filters);
        c8yInventory.list(filters).then(function (devices) {
            console.log(devices);
            angular.forEach(devices, function(device){
                var pos = device.c8y_Position;
                var latLng = {lat: parseFloat(pos.lat), lng: parseFloat(pos.lng)};
                var geoCoder = new google.maps.Geocoder;
                geoCoder.geocode({'location': latLng}, function(results, status) {
                    var deviceDetail={
                        serialNo: $scope.entire.length+1,
                        name: device.name,
                        deviceId:device.id
                    };

                    if (status === 'OK' && results[0]) {
                        console.log(results[0]);
                        deviceDetail.location=results[0].formatted_address;
                    }

                    if (device.com_softwareag_parkingpi_ParkingPiStatus) {
                        console.log(typeof(device.c8y_Connection.status));
                        console.log(device.c8y_Connection.status);
                        if(device.com_softwareag_parkingpi_ParkingPiStatus.status=="INACTIVE") {
                            deviceDetail.status = "fa-power-off text-danger";
                        } else if(device.com_softwareag_parkingpi_ParkingPiStatus.status=="ACTIVE") {
                            deviceDetail.status = "fa-plug text-success";
                        } else {
                            deviceDetail.status = "fa-wrench text-warning";
                        }
                    } else {
                        deviceDetail.status = "fa-wrench text-warning";
                    }
                    $scope.entire.push(deviceDetail);
                });
            });
        });
    }
    init();
}
}());
