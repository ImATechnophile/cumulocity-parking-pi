/* core_eventList 9.3.0 2018-03-26T16:25:16+00:00 796b68a031b1+ (release/9.3.0) tip */
!function(){"use strict";function t(t,e){t.add({name:"Event list",nameDisplay:e("Event list"),description:e("Displays the list of events for selected device."),templateUrl:"core_eventList/views/eventList.html",configTemplateUrl:"core_eventList/views/eventListConfig.html"})}angular.module("c8y.eventList",[]).config(["c8yComponentsProvider","gettext",t])}(),function(){"use strict";function t(t){function e(e){i.options=_.cloneDeep(e)||{},i.options.source=t.child.config.device&&t.child.config.device.id}var i=this;t.$watch("child.config.options",function(t,i){t&&!_.isEqual(t,i)&&e(t)}),t.$watch("child.config.device",function(i){i&&e(t.child.config.options)},!0),e(t.child.config.options)}angular.module("c8y.eventList").controller("EventListCtrl",["$scope",t])}(),function(){"use strict";function t(t){var e;e='<div ng-controller="EventListCtrl as eventList">\n  <c8y-event-list filters="eventList.options" initial-realtime-state="true"/>\n</div>\n',t.put("core_eventList/views/eventList.html",e),t.put("/apps/core/eventList/views/eventList.html",e),e='<div class="form-group">\n  <label>Type</label>\n  <input type="text" class="form-control" ng-model="config.options.type">\n</div>\n',t.put("core_eventList/views/eventListConfig.html",e),t.put("/apps/core/eventList/views/eventListConfig.html",e)}angular.module("c8y.eventList").run(["$templateCache",t])}();