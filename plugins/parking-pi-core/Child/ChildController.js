(function () {
  'use strict';

  angular
    .module('device')
    .controller('childcontroller', childcontroller);

  /* @ngInject */
  function childcontroller(
    $scope,
    $routeParams,
    $interval,
    $filter,
    c8yDevices,
    c8yMeasurements,
    c8yAlert
  ) {
    //Initiate the Timer object.
     $scope.Timer = null;
     $scope.ReDist = [];

    function onFailure(message) {
      c8yAlert.danger(message);
    }

    function load() {
        c8yDevices.listChildren($routeParams.deviceId).then(function (children) {
            angular.forEach(children, function (child) {
                var filter = {
                    device: child.id,
                    fragment: 'c8y_DistanceMeasurement',
                    series: 'distance'
                };

                c8yMeasurements.latest(filter, true).then(function (latestMeasurement) {
                    var childStatusArray = $filter('filter')($scope.ReDist, {'name': child.name});
                    var x={};
                    if (childStatusArray.length == 0) {
                        x.name = child.name;
                        $scope.ReDist.push(x)
                    } else {
                        x = childStatusArray[0];
                    }
                    if(_.isEmpty(latestMeasurement)){
                        var message="Oops!! Child devices doesn't send any measurements";
                        onFailure(message);
                    } else {
                        var value=latestMeasurement.c8y_DistanceMeasurement.distance.value;
                        if(value<=80){
                            x.stausImage="parking_pi_parking-pi-core/Images/car.png";
                            x.status="Parking occupied";
                        }
                        else{
                            x.stausImage="parking_pi_parking-pi-core/Images/empty.png";
                            x.status="Parking available";
                        }
                    }
                });
            });
        });
    }
    load();
       function onLoadTimer(){
         $interval(function () {
            load();
         }, 1000);
       }
       onLoadTimer();
  }
}());
