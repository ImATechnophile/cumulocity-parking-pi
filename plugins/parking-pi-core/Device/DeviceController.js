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
        lat: pos.lat,
        lng: pos.lng,
        name: device.name,
        deviceId:device.id
      };
      if (device.c8y_Connection) {
        details.status = device.c8y_Connection.status;
      }
      else{
        details.status = "UNKNOWN";
      }
      $scope.entire.push(details);
     
    });
  }
}

}());
