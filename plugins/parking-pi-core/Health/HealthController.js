(function () {
  'use strict';

  angular
    .module('device')
    .controller('healthcontroller', healthcontroller);

  /* @ngInject */
  function healthcontroller(
    $scope,
    $routeParams,
    c8yDevices,
    c8yMeasurements,
    c8yAlert
  ) {

    function onFailure(message) {
      c8yAlert.danger(message);
    }


    function load() {
        c8yDevices.listChildren($routeParams.deviceId).then(function (children) {
          var childrenIDs = _.map(children, 'id');
          if(childrenIDs !=0){
            console.log("if...")
            latestMeasure(childrenIDs,children);
            console.log("out...")
          }
          else{
          var message="No child devices for this device.....";
          onFailure(message);
          }

        });
          function latestMeasure(childrenIDs,children){
            console.log("input");
            console.log(childrenIDs);
          var childrenNames=_.map(children, 'name');
          console.log("name: "+childrenNames);
          
          for (var i = 0;i<=childrenIDs.length - 1;i++) {
            var filter = {
            device: childrenIDs[i],
            fragment: 'c8y_DistanceMeasurement',
            series: 'distance'
            };
            var realtime = true;
            c8yMeasurements.latest(filter, realtime)
              .then(function (latestMeasurement) {
                var x={};
                var latestMeasurement = latestMeasurement;
                var y=childrenNames;
                console.log(latestMeasurement);
                console.log(typeof(latestMeasurement));
                console.log("above type");
                console.log(_.isEmpty(latestMeasurement));
                if(_.isEmpty(latestMeasurement)){
                  var message="Oops!! All the child devices are dead";
                  onFailure(message);
                }
                else
                {
                var unit=latestMeasurement.c8y_DistanceMeasurement.distance.unit;
                var value=latestMeasurement.c8y_DistanceMeasurement.distance.value;
                var RequiredDist=value+unit;
               //x.childTime=latestMeasurement.time;_.isEmpty({ 'a': 1 });
               
               if(RequiredDist<="200.45cm"){
                  x.status="OK";
                }
                else{
                  x.status="OUT OF SERVICE";
                }
                if(entrycount<y.length){
                  x.childName=y[entrycount];
                  entrycount+=1;
                }
                $scope.ReDist.push(x);
              }
              
            });
          }
        }
    }

    var entrycount=0;
    $scope.ReDist=[];
    load();
    
    
  }
}());
