/* core_applicationLinks 9.3.0 2018-03-26T16:24:19+00:00 796b68a031b1+ (release/9.3.0) tip */
!function(){"use strict";function n(n,t,i){_.merge({},window.C8Y_APP&&window.C8Y_APP.C8Y_INSTANCE_OPTIONS,window.C8Y_INSTANCE_OPTIONS).default_icon||i;n.add({name:"Applications",nameDisplay:t("Applications"),description:t("Displays the list of links to available applications."),templateUrl:"core_applicationLinks/views/applications.html",options:{noDeviceTarget:!0,widgetDefaults:{_width:8,_height:5}}})}n.$inject=["c8yComponentsProvider","gettext","DEFAULT_APP_ICON"],angular.module("c8y.welcome.applications",[]).constant("DEFAULT_APP_ICON","core/img/default_icon.svg").config(n)}(),function(){"use strict";function n(n,t,i){function e(){return t.getCurrent().then(a)}function a(n){s=n.name}function o(n){return n.name!==s}function c(n){return!_.includes(m[d],n.contextPath)}function p(n){return n.iconSrc=r(n)||u,n}function l(){t.listByVisibleLinks().then(function(t){n.applications=_.map(_(t).filter(o).filter(c).value(),p)})}function r(n){return n.contextPath&&["/apps",n.contextPath,"icon.svg"].join("/")}var s,u=_.merge({},window.C8Y_APP&&window.C8Y_APP.C8Y_INSTANCE_OPTIONS,window.C8Y_INSTANCE_OPTIONS).default_icon||i,d=_.merge({},window.C8Y_APP&&window.C8Y_APP.C8Y_INSTANCE_OPTIONS,window.C8Y_INSTANCE_OPTIONS).target,m={dt:["HelpAndService"]};n.getHref=angular.bind(t,t.getHref),e().then(l)}angular.module("c8y.welcome.applications").controller("ApplicationsCtrl",["$scope","c8yApplication","DEFAULT_APP_ICON",n])}(),function(){"use strict";function n(n){var t;t='<div ng-controller="ApplicationsCtrl" class="card-group-block interact-grid" style="margin-bottom:0">\n  <a class="card" style="min-width:130px; flex: 1 0 130px" ng-href="{{::getHref(app)}}" title="{{::app | humanizeAppName}}" ng-repeat="app in applications">\n    <div class="card-block text-center">\n      <c8y-app-icon app="::app" style="font-size:2.6em"></c8y-app-icon>\n      <p class="text-truncate-wrap" title="{{::app | humanizeAppName}}" style="min-height: 1.2em; max-width: 100%">\n        {{::app | humanizeAppName}}\n      </p>\n    </div>\n  </a>\n</div>',n.put("core_applicationLinks/views/applications.html",t),n.put("/apps/core/applicationLinks/views/applications.html",t)}angular.module("c8y.welcome.applications").run(["$templateCache",n])}();