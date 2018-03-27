/* core_infoGauge 9.3.0 2018-03-26T16:25:26+00:00 796b68a031b1+ (release/9.3.0) tip */
!function(){"use strict";function e(e){e.init()}e.$inject=["infoGaugeService"],angular.module("c8y.infoGauge",[]).run(e)}(),function(){"use strict";function e(e,t){function a(){n()}function n(){t.add({name:"infoGauge",nameDisplay:e("Info gauge"),description:e("Radial gauge and mutiple label and value pairs for data points"),templateUrl:o,configTemplateUrl:r,options:{noDeviceTarget:!0}})}var i="core_infoGauge/",o=i+"infoGaugeWidget.html",r=i+"infoGaugeWidget.config.html",l="#D90000",s="#50E3C2",g="#FDC000";return{init:a,COLORS:{RED:l,GREEN:s,YELLOW:g}}}e.$inject=["gettext","c8yComponents"],angular.module("c8y.infoGauge").factory("infoGaugeService",e)}(),function(){"use strict";function e(e,t,a,n){function i(){r(),x.length&&$(window).on("resize",k)}function o(){f(),$(window).off("resize",k)}function r(){var e=h.position().left===b.position().left,t=x.innerHeight(),a=t;e&&(a=t-b.height()),h.height(a)}function l(e,t){var a=D[t];if(a){var n=a[e.fragment],i=n&&n[e.series];return i&&i.value}return a}function s(e,t){var a=D[t];return _.get(a,"time",a)}function g(){var t=e.child.config,a="__active";v.gaugeDatapoint=_.find(t.datapointsGauge,a),v.labelDatapoints=_.filter(t.datapointsLabels,a),u()}function u(){f();var e=v.gaugeDatapoint,t=v.labelDatapoints;if(e){var n=a.latest(d(e),!0);n.then(c),y.push(n)}D=[],_.forEach(t,function(e,t){var n=a.latest(d(e),!0);n.then(function(e){D[t]=e}),y.push(n)})}function c(e){G=e,m()}function d(e){return{series:e.series,fragment:e.fragment,device:e.__target.id}}function f(){_.invoke(y,"stop"),y=[]}function m(){var e=v.gaugeDatapoint;if(G){var t=G[e.fragment],a=t&&t[e.series];v.gaugeValue=a&&a.value,v.gaugeDateTime=G.time,p()}}function p(){var e=v.gaugeValue,a=Number(v.gaugeDatapoint.min||0),n=Number(v.gaugeDatapoint.max||0),i=Number(v.gaugeDatapoint.yellowRangeMin),o=Number(v.gaugeDatapoint.yellowRangeMax),r=Number(v.gaugeDatapoint.redRangeMin),l=Number(v.gaugeDatapoint.redRangeMax),s=d3.scale.linear().domain([a,n]).range([0,100]),g=125.75+(377.25-s(e)/100*377.25),u=w.GREEN;_.isFinite(i)&&_.isFinite(o)&&e>=i&&e<=o&&(u=w.YELLOW),_.isFinite(r)&&_.isFinite(l)&&e>=r&&e<=l&&(u=w.RED),t.find(".gauge-svg svg path.track-value").css({"stroke-dashoffset":-g,stroke:u})}var v=this,h=t.find(".gauge-svg"),b=t.find(".gauge-legend"),x=t.parents(".card-inner-scroll"),y=[],D=[],G=void 0,w=n.COLORS,k=_.debounce(r,100);_.assign(v,{getLabelValue:l,getLabelDateTime:s}),e.$watch("child.config",g,!0),e.$watch(function(){return G},m,!0),e.$on("$destroy",o),e.$on("dashboardResize",k),i()}e.$inject=["$scope","$element","c8yMeasurements","infoGaugeService"],angular.module("c8y.infoGauge").controller("infoGaugeWidgetController",e)}(),function(){"use strict";function e(e){var t;t='<div ng-form="infoGaugeForm">\n  <h4 translate>Data point for gauge</h4>\n  <c8y-data-point-list max-select-count="1" datapoints="config.datapointsGauge" dont-save="true" no-chart allow-adding-data-points-from-context-mo-only="dashboard.deviceType && dashboard.deviceTypeValue">\n  </c8y-data-point-list>\n  <h4 translate>Data point for labels</h4>\n  <c8y-data-point-list datapoints="config.datapointsLabels" dont-save="true" no-chart allow-adding-data-points-from-context-mo-only="dashboard.deviceType && dashboard.deviceTypeValue">\n  </c8y-data-point-list>\n  <div class="form-group">\n    <label translate>Decimal places</label>\n    <input name="decimalPlaces" ng-model="config.fractionSize" type="number" ng-min="1" step="1" c8y-model-options="{unsetWhenNull: true}" class="form-control">\n    <c8y-error-feedback field="infoGaugeForm.decimalPlaces"></c8y-error-feedback>\n  </div>\n</div>',e.put("core_infoGauge/infoGaugeWidget.config.html",t),e.put("/apps/core/infoGauge/infoGaugeWidget.config.html",t),t='<!-- widget start -->\n<div class="label-value-unit-gauge" ng-controller="infoGaugeWidgetController as vm">\n\n  <div class="gauge-legend">\n    <label ng-repeat-start="dp in vm.labelDatapoints" class="text-truncate">{{dp.label}}</label>\n    <h3>{{vm.getLabelValue(dp, $index) | number:child.config.fractionSize}} {{dp.unit}}</h3>\n    <p class="text-muted bottom-m" ng-repeat-end>\n      <small><em>{{vm.getLabelDateTime(dp, $index) | absoluteDateTimeShort}}</em></small>\n    </p>\n  </div>\n\n<div class="gauge-svg">\n\n  <svg width="214px" height="214px" viewBox="0 0 214 214" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>Oval</title>\n    <desc>radial for GD</desc>\n    <defs></defs>\n\n    <g id="scale" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-dasharray="1,5">\n      <circle id="Oval" stroke="#CACECE" stroke-width="7" cx="107" cy="107" r="103"></circle>\n      <rect id="mask" stroke="none" fill-rule="evenodd" x="0" y="0" width="214" height="214" transform="rotate(-45 290 182)"></rect>\n    </g>\n    <path class="track" d="M 107 27 a 80 80 0 1 0.1 0 Z" transform="rotate(-135 107 107)"></path>\n    <path class="track-value" d="M 107 27 a 80 80 0 1 0.1 0 Z" transform="rotate(-135 107 107)"></path>\n    <text class="center-label" x="107" y="91">{{vm.gaugeDatapoint.label}}</text>\n    <text class="center-value" x="107" y="115">{{vm.gaugeValue | number:child.config.fractionSize}}</text>\n    <text class="center-unit" x="107" y="129">{{vm.gaugeDatapoint.unit}}</text>\n    <text class="center-date-time" x="107" y="142">{{vm.gaugeDateTime | absoluteDateTimeShort}}</text>\n  </svg>\n</div>\n<div class="clearfix"></div>\n</div>\n',e.put("core_infoGauge/infoGaugeWidget.html",t),e.put("/apps/core/infoGauge/infoGaugeWidget.html",t)}angular.module("c8y.infoGauge").run(["$templateCache",e])}();