(function () {
  'use strict';

  angular
    .module('device')
    .controller('DevicesController',DevicesController);

  /* @ngInject */
  function DevicesController(
    $scope,
    $q,
    c8yInventory,
    c8yBinary
  ) {
    $scope.all=[];
    var getDevicesAndBinaries = {
      devices: getDevicesWithLocation(),
      binaries: c8yBinary.list({})
    };
    $q.all(getDevicesAndBinaries).then(placeTypes);

    function getDevicesWithLocation() {
      var filters = {fragmentType: 'c8y_Position' };
      return c8yInventory.list(filters);
    }

    function placeTypes(devicesAndBinaries) {
      console.log("placeTypes");
      console.log(devicesAndBinaries.devices);
      angular.forEach(devicesAndBinaries.devices, function(device){
      console.log(device);
      angular.forEach(device, function(value,key){
      console.log(key + ': ' + value);
     
    });
     
    });
  }
}

}());
