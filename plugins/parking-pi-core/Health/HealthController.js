(function () {
  'use strict';

  angular
    .module('device')
    .controller('healthcontroller', healthcontroller);

  /* @ngInject */
  function healthcontroller(
    $scope,
    $routeParams,
    $interval,
    c8yDevices,
    c8yMeasurements,
    c8yAlert,
    $filter
  ) {

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
                        var date = new Date(latestMeasurement.time);
                        var refDate = new Date();
                        refDate.setMinutes(refDate.getMinutes() - 5);
                        if(date < refDate){
                            x.status="OUT OF SERVICE";
                            x.style="text-danger";
                        }
                        else{
                            x.status="OK";
                            x.style="text-success";
                        }
                    }
                });
            });
        });
    }

    $scope.ReDist=[];
      load();
      function onLoadTimer(){
          $interval(function () {
              load();
          }, 1000);
      }
      onLoadTimer();
  }
}());
