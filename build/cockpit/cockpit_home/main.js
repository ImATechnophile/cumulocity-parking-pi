/* cockpit_home 9.3.0 2018-03-26T16:24:33+00:00 796b68a031b1+ (release/9.3.0) tip */
!function(){"use strict";function e(e,a,i,o,c){function l(){this.dashboardName=n().dashboardName||s,this.children=n().dashboardChildren||h,this.isGlobal=m}function n(){return o[t]||{}}var r='<c8y-dashboard-gridstack set-page-title="true" name="{{vm.dashboardName}}" default-children="vm.children" set-global="vm.isGlobal"></c8y-dashboard-gridstack>',s="home-cockpit1",m=!0,h=[{name:"Cockpit Welcome",title:c("Welcome to Cockpit application"),translateTitle:!0,_x:0,_y:0,_height:2,_width:12},{name:"Asset Alarms",title:c("Active, critical alarms"),translateTitle:!0,_x:0,_y:2,_height:4,_width:6},{name:"Recent Alarms",title:c("Recent alarms"),translateTitle:!0,_x:0,_y:7,_height:4,_width:6},{name:"Map",title:c("Map"),translateTitle:!0,_x:6,_y:2,_height:8,_width:6}];a.addNavigation({priority:1e4,name:c("Home"),icon:"home",path:""}),i.add({name:c("Cockpit Welcome"),description:c("Displays a welcome message for Cockpit"),templateUrl:"cockpit_home/views/welcome.html",options:{noDeviceTarget:!0,hideFromUI:!0}}),e.when("/",{template:r,controller:l,controllerAs:"vm",resolve:{wait:function(){if(n().wait)return n().wait}}})}e.$inject=["$routeProvider","c8yNavigatorProvider","c8yComponentsProvider","c8yConfig","gettext"];var t="c8y.cockpit.home";angular.module(t,[]).config(e)}(),function(){"use strict";function e(e){var t;t='<p class="lead">\n  <span>{{\'Welcome to Cockpit application\' | translate}}.</span>\n  <span class="cockpit-welcome-manual" c8y-guide-docs translate>Browse the manual <a c8y-guide-href="users-guide/cockpit/">here</a>.</span>\n</p>\n',e.put("cockpit_home/views/welcome.html",t),e.put("/apps/cockpit/home/views/welcome.html",t)}angular.module("c8y.cockpit.home").run(["$templateCache",e])}();