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
      if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
          }
    }

    function load() {
        c8yDevices.listChildren($routeParams.deviceId).then(function (children) {
          if(children.length==0){
          var message="Oops!! This device doesn't have any child devices";
          onFailure(message);
          }
          else{
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
                        if(value<=20){
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
        }
        });
    }
    load();
    var stop;
    function onLoadTimer(){
      stop=$interval(function () {
        load();
      }, 1000);
     }
    onLoadTimer();
  }
}());
