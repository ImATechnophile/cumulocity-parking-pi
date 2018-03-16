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
    c8yDevices,
    c8yMeasurements,
    c8yAlert
  ) {
    //Initiate the Timer object.
     $scope.Timer = null;

    function onFailure(message) {
      c8yAlert.danger(message);
    }


    function load() {
        $scope.ReDist = [];
        c8yDevices.listChildren($routeParams.deviceId).then(function (children) {
          var childrenIDs = _.map(children, 'id');
          if(childrenIDs !=0){
           // console.log("if...")
            latestMeasure(childrenIDs,children);
           // console.log("out...")
          }
          else{
          var message="No child devices for this device.....";
          onFailure(message);
          }

        });
          function latestMeasure(childrenIDs,children){
            //console.log("input");
            //console.log(childrenIDs);
          var childrenNames=_.map(children, 'name');
         // console.log("name: "+childrenNames);
          
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
                //console.log(latestMeasurement);
                //console.log(typeof(latestMeasurement));
                //console.log("above type");
                //console.log(_.isEmpty(latestMeasurement));
                if(_.isEmpty(latestMeasurement)){
                  var message="Oops!! Child devices doesn't send any measurements";
                  onFailure(message);
                }
                else
                {
                var unit=latestMeasurement.c8y_DistanceMeasurement.distance.unit;
                var value=latestMeasurement.c8y_DistanceMeasurement.distance.value;
                var RequiredDist=value+unit;
                console.log("name: "+childrenNames);
                console.log("id: "+childrenIDs);
               //x.childTime=latestMeasurement.time;_.isEmpty({ 'a': 1 });
               
               if(RequiredDist<="200.45cm"){
                  x.childImage="parking_pi_parking-pi-core/Images/car.png";
                  x.childTime="Parked At :"+latestMeasurement.time;
                }
                else{
                  x.childImage="parking_pi_parking-pi-core/Images/empty2.png";
                  x.childTime=" Last Checkout:"+latestMeasurement.time;
                }
                if(entrycount<y.length){
                  x.childName=y[entrycount];
                  console.log("inside");
                  console.log(y[entrycount]);
                  console.log(childrenIDs[entrycount]);
                  console.log("outside");
                  entrycount+=1;
                }
                $scope.ReDist.push(x);
                console.log($scope.ReDist);
              }
              
            });
          }
        }
    }


    var entrycount=0;
    $scope.ReDist=[];

    function onloadTimer(){
      $interval(function () {
                    //Display the current time.
                    load();
                }, 5000);

    }
    onloadTimer();
    
    

  }
}());
