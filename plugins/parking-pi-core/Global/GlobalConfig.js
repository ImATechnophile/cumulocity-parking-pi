(function () {
  'use strict';

  angular
    .module('device')
    .config(configure);

  /* @ngInject */
  function configure(
    c8yNavigatorProvider,
    c8yViewsProvider,
    c8yTitleProvider
  ) {
    c8yNavigatorProvider.addNavigation({ // adds a menu item to the navigator with ...
      name: 'Parking Devices', // ... the name *"hello"*
      icon: 'car', // ... the cube icon (icons are provided by the great Font Awesome library and you can use any of their [icon names](http://fontawesome.io/icons/) without the *fa-* prefix here
      priority: 100600, // ... a priority of 100000, which means that all menu items with a priority lower than 100000 appear before this menu item and all with a priority higher than 100000 appear after this menu item
      path: '' // ... */hello* as path
    });


     c8yViewsProvider.when('/', { // when the path "/hello" is accessed ...
      templateUrl: ':::PLUGIN_PATH:::/Device/devices.html', //  ... display our html file "hello.html" inside the "views" folder of our plugin (the plugin's folder is represented using the magic string ```:::PLUGIN_PATH:::```, which is replaced by the actual path during the build process)
      controller: 'DevicesController' // ... use "HelloController" as controller
    });

      c8yViewsProvider.when('/DevicesInfo/:deviceId', {
      name: 'Parking slots',
      icon: 'code-fork',
      priority: 1009,
      templateUrl: ':::PLUGIN_PATH:::/Child/child.html',
      controller: 'childcontroller'
    });

      c8yViewsProvider.when('/DevicesInfo/:deviceId', {
      name: 'Parking location',
      icon: 'location-arrow',
      priority: 1008,
      templateUrl: ':::PLUGIN_PATH:::/Location/location.html',
      controller: 'locationcontroller'
    });

      /*c8yViewsProvider.when('/DevicesInfo/:deviceId', {
      name: 'Manage Parking',
      icon: 'c8y-device-control',
      priority: 1007,
      templateUrl: ':::PLUGIN_PATH:::/Manage/manage.html',
      controller: 'managecontroller'
    });*/

      c8yViewsProvider.when('/DevicesInfo/:deviceId', {
      name: 'Device Health',
      icon: 'heart',
      priority: 1006,
      templateUrl: ':::PLUGIN_PATH:::/Health/health.html',
      controller: 'healthcontroller'
    });

      c8yTitleProvider.addTitle('/DevicesInfo/:deviceId', {
      data: ['$routeParams', 'c8yDevices', function ($routeParams, c8yDevices) {
        var deviceId = $routeParams.deviceId;
        if (!deviceId) {
          return {};
        }
        return c8yDevices.detailCached(deviceId).then(function (res) {
          return {
            title: res.data.name,
            subtitle: ''
          };
        });
      }]
    });

      c8yTitleProvider.addTitle('/', {
      data: [function () {
        return {
            title: 'Parking Devices',
            subtitle: ''
          };
        
      }]
    });


  }
}());
