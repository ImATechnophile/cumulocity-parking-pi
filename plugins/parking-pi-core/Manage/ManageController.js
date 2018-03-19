(function () {
  'use strict';

  angular
    .module('device')
    .controller('managecontroller', managecontroller);

  /* @ngInject */
  function managecontroller(
    $scope,
    $routeParams,
    c8yDevices
  ) {
      $scope.activateOperation = {};
      function init() {
          c8yDevices.detail($routeParams.deviceId).then(function (res) {
             var status = res.data.device.com_softwareag_parkingpi_ParkingPiStatus.status;
              $scope.activateOperation.style = 'fa-power-off text-danger';
             if (status == 'ACTIVE') {
                 $scope.activateOperation.style = 'fa-power-off text-danger';
             } else if (status == 'INACTIVE') {
                 $scope.activateOperation.style = 'fa-plug text-success';
             }
          });
      }

      function toggle() {

      }
    init();
  }
}());
