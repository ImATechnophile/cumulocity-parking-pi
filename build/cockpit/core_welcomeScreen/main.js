/* core_welcomeScreen 9.3.0 2018-03-26T16:26:46+00:00 796b68a031b1+ (release/9.3.0) tip */
!function(){"use strict";function e(e,t){e.when("/welcome",{template:['<div class="welcome-container">','<div class="clearfix welcome-dont-show"><label class="c8y-switch pull-right"><input type="checkbox" ng-model="dontShow"><span></span>{{"'+t("Don't use as start page")+'" | translate}}</label></div>','<c8y-dashboard-gridstack set-page-title="true" name="{{dashboardName}}" default-children="children" is-frozen="true" class="welcome"></c8y-dashboard-gridstack>',"</div>"].join(""),controller:"HomeCtrl"})}function t(e){e.init()}angular.module("c8y.welcome.home",[]).config(["$routeProvider","gettext",e]).run(["welcomeScreenSvc",t])}(),function(){"use strict";function e(e,t,n,o,i){function c(){e.children=[{name:"Quick links",title:i("Quick links"),translateTitle:!0,_x:0,_y:3,_height:2,_width:9,_isFrozen:!1},{name:"Applications",title:i("Applications"),translateTitle:!0,_x:0,_y:11,_height:2,_width:9,_isFrozen:!1},{name:"Help and support",title:i("Documentation / Support"),translateTitle:!0,_x:0,_y:14,_height:2,_width:9,_isFrozen:!1},{name:"Twitter news",title:i("Twitter"),translateTitle:!0,config:a({noheader:!0,nofooter:!0,transparent:!0}),_x:9,_y:0,_height:10,_width:3,_isFrozen:!1}],h||(e.children=_.reject(e.children,{name:"Help and support"})),m||(e.children=_.reject(e.children,{name:"Twitter news"}),_.forEach(e.children,function(e){e._width=12}))}function r(t){e.dontShow=t,e.$watch("dontShow",function(e){n.toggleShow(e)})}function a(e){var t="Cumulocity",n="430401883614633985";return _.assign(e,{usename:t,widgetId:n})}var l=_.merge({},window.C8Y_APP&&window.C8Y_APP.C8Y_INSTANCE_OPTIONS,window.C8Y_INSTANCE_OPTIONS).target,u=/^(https?:\/\/)?[\w,-]+\.cumulocity\.com(\/.*)?$/,s=/^(https?:\/\/)?((localhost)|(127\.0\.0\.1))(:\d{1,5})?(\/.*)?$/,d=o.absUrl(),h="dt"!==l,m=u.test(d)||s.test(d)&&(!l||"cumulocity"===l);c(),t.current().then(function(t){e.dashboardName="welcome-home2-"+(l?l+"-":"")+t.userName}),n.dontShow().then(_.partial(r,!0),_.partial(r,!1))}e.$inject=["$scope","c8yUser","welcomeScreenSvc","$location","gettext"],angular.module("c8y.welcome.home").controller("HomeCtrl",e)}(),function(){"use strict";function e(e,t,n,o){function i(e){n.get(_).then(function(t){e?(t||n.set(_,!0),s()):(t&&n.set(_,!1),u())})}function c(e){return{icon:"cloud",name:"Welcome",path:"welcome",priority:e,isWelcomeNode:!0}}function r(e){var t=o.findNode(d);t||o.addNavigation(e)}function a(){o.removeNavigation(d)}function l(e){var t=o.findNode(d);t&&t.priority!==e&&(a(),t=null),t||r(c(e))}function u(){l(w)}function s(){l(f)}function d(e){return e.isWelcomeNode}function h(){n.get(_).then(function(e){e?s():(u(),"/"===t.path()&&t.path("welcome"))})}function m(){return n.get(_).then(function(t){return t?e.when():e.reject()})}var w=Number.POSITIVE_INFINITY,f=Number.NEGATIVE_INFINITY,_="c8y_hideWelcomeScreen";return{toggleShow:i,dontShow:m,init:h}}angular.module("c8y.welcome.home").factory("welcomeScreenSvc",["$q","$location","c8yUserPreferences","c8yNavigator",e])}(),function(){"use strict";function e(e){}angular.module("c8y.welcome.home").run(["$templateCache",e])}();