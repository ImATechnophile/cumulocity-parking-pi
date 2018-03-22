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
            c8yInventory.list(filters).then(function (devices) {
                angular.forEach(devices, function(device){
                    var pos = device.c8y_Position;
                    var deviceDetail={
                        serialNo: $scope.entire.length + 1,
                        name: device.name,
                        deviceId: device.id
                    };

                    deviceDetail.location = pos.lat + "," + pos.lng;
                    if (device.com_softwareag_parkingpi_ParkingPiStatus) {
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
        }
        init();
    }
}());
