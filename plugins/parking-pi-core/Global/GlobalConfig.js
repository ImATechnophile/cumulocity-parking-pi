(function () {
  'use strict';

  angular
    .module('device')
    .config(configure);

  /* @ngInject */
  function configure(
    c8yNavigatorProvider,
    c8yViewsProvider
  ) {
    c8yNavigatorProvider.addNavigation({ // adds a menu item to the navigator with ...
      name: 'Parking Devices', // ... the name *"hello"*
      icon: 'car', // ... the cube icon (icons are provided by the great Font Awesome library and you can use any of their [icon names](http://fontawesome.io/icons/) without the *fa-* prefix here
      priority: 100600, // ... a priority of 100000, which means that all menu items with a priority lower than 100000 appear before this menu item and all with a priority higher than 100000 appear after this menu item
      path: 'DevicesInfo' // ... */hello* as path
    });


     c8yViewsProvider.when('/DevicesInfo', { // when the path "/hello" is accessed ...
      templateUrl: ':::PLUGIN_PATH:::/Device/devices.html', //  ... display our html file "hello.html" inside the "views" folder of our plugin (the plugin's folder is represented using the magic string ```:::PLUGIN_PATH:::```, which is replaced by the actual path during the build process)
      controller: 'DevicesController' // ... use "HelloController" as controller
    });

      c8yViewsProvider.when('/DevicesInfo/:deviceId', {
      name: 'Child devices',
      icon: 'code-fork',
      priority: 1009,
      templateUrl: ':::PLUGIN_PATH:::/Child/child.html',
      controller: 'childcontroller'
    });

      c8yViewsProvider.when('/DevicesInfo/:deviceId', {
      name: 'location',
      icon: 'location-arrow',
      priority: 1008,
      templateUrl: ':::PLUGIN_PATH:::/Location/location.html',
      controller: 'locationcontroller'
    });

      c8yViewsProvider.when('/DevicesInfo/:deviceId', {
      name: 'Managing',
      icon: 'c8y-device-control',
      priority: 1007,
      templateUrl: ':::PLUGIN_PATH:::/Manage/manage.html',
      controller: 'managecontroller'
    });

      c8yViewsProvider.when('/DevicesInfo/:deviceId', {
      name: 'Health-Check',
      icon: 'heart',
      priority: 1006,
      templateUrl: ':::PLUGIN_PATH:::/Health/health.html',
      controller: 'healthcontroller'
    });


  }
}());
