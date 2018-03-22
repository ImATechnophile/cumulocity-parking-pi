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
    var counter1=0;
    var counter=0;
    var i=0;
    var globalstop;
    $scope.entire=[];
    var getDevicesFromInventory = {
      devices: getRequiredDevices()
    };
    $q.all(getDevicesFromInventory).then(IterateIt);

    function getRequiredDevices() {
      var filters = {type: 'c8y_Linux' };
      console.log("devices",c8yInventory.list(filters));
      return c8yInventory.list(filters);
    }


//testing function-it is not in use now    
    function reversegeo(latLng,geoCoder,details){
        console.log("feun latlng",latLng);
        console.log("details1234",details);
        details.location = counter+=1;
        geoCoder.geocode({'location': latLng}, function(results, status) {
        if (status === 'OK' && results[0]) {
                        console.log("results",results);
                        $scope.address=results[0].formatted_address;
                        $scope.onlylatlng.push(results[0].formatted_address);
                        details.location = results[0].formatted_address;
                        //details.location=results[0].formatted_address;
        }
        else{
          console.log("else",status);
          details.location = counter+=1;
        }
      });
    }




    function individualArraytimer(latarr){
      console.log("function calling counter",counter1+=1);
      var geoCoder = new google.maps.Geocoder;
     // var arr=[];
      angular.forEach(latarr,function(latjson){
        var latLng = {lat: parseFloat(latjson.lat), lng: parseFloat(latjson.lng)};
        //console.log("function latLng",latLng);
           console.log("interval counter",counter+=1);
           geoCoder.geocode({'location': latLng}, function(results, status) {
            console.log("function latLng",latLng);
        if (status === 'OK' && results[0]) {
                       // console.log("results",results);
                        //details.location = results[0].formatted_address;
                        console.log("counter",counter+=1);
                        var test=results[0].formatted_address;
                        //arr.push(test);
                        //console.log("array",arr);
                        console.log("timer address",test);
                        //console.log(counter+=1);
                        //details.location=results[0].formatted_address;
        }
        else{
          console.log("timer address",status);
          //details.location = counter+=1;
        }
      });
        

       
      });
    
        
  }


    
    function delay(sliptLocation,singleArray){
      setTimeout(function(){
        individualArraytimer(singleArray);
        i++;
        if(i<2){
          delay();
        }
      },2000);
    }



    function IterateIt(fullData) {
     // var i=0;
      //var geoCoder = new google.maps.Geocoder;
      console.log("fullData",fullData);
// only location
      var devicesLocation = _.map(fullData.devices, 'c8y_Position');
      console.log("chunk",_.chunk(devicesLocation,5));
      console.log("location array",devicesLocation);
// spliting into 5
      var sliptLocation=_.chunk(devicesLocation,5);
      angular.forEach(sliptLocation,function(singleArray){
      console.log("singleArray",singleArray);
//calling a function
      delay(sliptLocation,singleArray);


    
      //individualArraytimer(sliptLocation[0]);
      //setTimeout(individualArraytimer(singleArray),1000);
     //individualArraytimer(singleArray);

     });
      //var geoCoder = new google.maps.Geocoder;
      angular.forEach(fullData.devices, function(device){
      var pos = device.c8y_Position;
      
      var details={
        serialNo: $scope.entire.length+1,
        lat: pos.lat,
        lng: pos.lng,
        name: device.name,
        deviceId:device.id
      };
      var latLng = {lat: parseFloat(pos.lat), lng: parseFloat(pos.lng)};
     // reversegeo(latLng,geoCoder,details);
      
      console.log("details",details);

     if (device.com_softwareag_parkingpi_ParkingPiStatus) {
                        //console.log(typeof(device.c8y_Connection.status));
                        //console.log(device.c8y_Connection.status);
                        if(device.com_softwareag_parkingpi_ParkingPiStatus.status=="INACTIVE") {
                            details.status = "fa-power-off text-danger";
                        } else if(device.com_softwareag_parkingpi_ParkingPiStatus.status=="ACTIVE") {
                            details.status = "fa-plug text-success";
                        } else {
                            details.status = "fa-wrench text-warning";
                        }
                    } else {
                        details.status = "fa-wrench text-warning";
                    }
        console.log("detailsafter",details);
      $scope.entire.push(details);
     
    });
  }
}

}());
