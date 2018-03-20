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
          }
        });
    }

    $scope.ReDist=[];
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
