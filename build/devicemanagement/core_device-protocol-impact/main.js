/* core_device-protocol-impact 9.3.0 2018-03-26T16:25:02+00:00 796b68a031b1+ (release/9.3.0) tip */
!function(){"use strict";function e(e){e.initUi()}e.$inject=["c8yImpactProvider"],angular.module("c8y.impact",["c8y.deviceProtocols"]).config(e)}(),function(){"use strict";function e(e,t,a){function r(e){_.assign(this,e)}function o(){e.register(i),t.when(s.path,s)}function c(e,n,t,r,o,c,i,l){function d(){return d._cached||(d._cached=m()),d._cached}function m(){return l.head(M+"health",{silentError:!0}).then(_.constant(!0),_.constant(!1))}function p(){return l.get(k).then(e.getResData)}function u(n){var a=t.createManagedObject(n);return a.type=w,l.post(j,a).then(e.getResData)}function v(n){var a=t.fragments.BASE_FRAGMENT,r=_.pick(n,["id",a]);if(!_.get(r,a))throw new Error("c8yImpact.save: "+a+" is not defined");if(!_.get(r,"id"))throw new Error("c8yImpact.save: Id is not defined");return l.post(j,r).then(e.getResData)}function v(n){var a=t.fragments.BASE_FRAGMENT,r=_.pick(n,["id",a]);if(!_.get(r,a))throw new Error("c8yImpact.save: "+a+" is not defined");if(!_.get(r,"id"))throw new Error("c8yImpact.save: Id is not defined");var o=void 0;return l.post(j,r).then(e.getResData).then(function(e){return o=e,g()}).then(function(){return o})}function g(){return l.put(M+"updateAll")}function f(t){var a=e.getId(t);return n.detail(a).then(e.getResData)}function b(n){var t=e.getId(n);return s.path.replace(/:id$/,t)}function y(e){var n={title:a("Remove resource?"),body:c.getString('Do you want to remove the resource with the id "{{id}}"',e),status:"danger",labels:{ok:a("Remove"),cancel:a("Cancel")}};return r(n).then(function(n){return n?e:i.reject()})}function h(){var e=a("Resource successfully removed");o.success(e)}function R(){var e=a("Device protocol updated");o.success(e)}var w="impact_object_mapping",M=e.url("service/impact/"),k=M+"objectResourceMappings",j=k+"/json",x=["c8yImpactCreateStep"],I=[a("BOOLEAN"),a("STRING"),a("INTEGER"),a("FLOAT")];return{showIf:d,isServiceAvailable:m,flow:_.constant(x),detail:f,detailPath:b,create:u,save:v,remove:n.remove,removeResourceConfirm:y,list:p,getName:t.getName,DATA_TYPES:I,alertRemoveResourceSuccess:h,alertUpdateProtocolSuccess:R,listRowInfoComponent:"c8yDeviceProtocolRowCountResources"}}r.$inject=["$routeParams"],c.$inject=["c8yBase","c8yInventory","c8yObjectMappings","c8yModal","c8yAlert","gettextCatalog","$q","$http"];var i={service:n,id:"impact",name:a("IMPACT")},s={path:"/deviceprotocols/"+i.id+"/:id",template:'<c8y-impact-detail id="vm.id"></c8y-impact-detail>',controllerAs:"vm",controller:r};return{initUi:o,$get:c}}e.$inject=["c8yDeviceProtocolUiProvider","c8yViewsProvider","gettext"];var n="c8yImpact";angular.module("c8y.impact").provider(n,e)}(),function(){"use strict";function e(e){function n(n){return r.pending=!0,e.create(n).then(e.detailPath).then(t,a)}function t(e){r.wizardCtrl.close({path:e})}function a(){r.pending=!1}var r=this;_.assign(r,{model:{},create:n})}e.$inject=["c8yImpact"],angular.module("c8y.impact").component("c8yImpactCreateStep",{require:{wizardCtrl:"^c8yWizardStep"},templateUrl:"core_device-protocol-impact/impact-create-step.html",controller:e,controllerAs:"vm"})}(),function(){"use strict";function e(e,n){function t(e){e.id&&a()}function a(){e.detail(y.id).then(r)}function r(n){y.object=n,y.title=e.getName(n),m(),i()}function o(){y.newResource={multiple:!1}}function c(){return!y.newResource&&0===n.countResources(y.object)}function i(){delete y.newResource}function s(t,a,o){var c=_.cloneDeep(y.object);return c=n.updateResource(t,o,c),c=n.updateMappingToResource(a,t,c),e.save(c).then(r)}function l(t){var a=_.cloneDeep(y.object);return e.removeResourceConfirm(t).then(function(e){return n.removeResource(e,a)}).then(n.saveToInventory).then(r).then(e.alertRemoveResourceSuccess)}function d(){y.editingMain=!y.editingMain}function m(){var e=["id","name","description"];y.objectMain=_.pick(_.clone(n.getMainProperties(y.object)),e),y.mainPropertiesForm.$setPristine(),y.editingMain=!1}function p(){var t=_.cloneDeep(y.object);return t=n.updateMainProperties(y.objectMain,t),n.saveToInventory(t).then(r).then(e.alertUpdateProtocolSuccess)}function u(){d(),m()}function v(){return n.getMappings(y.object)}function g(){return n.getMainObject(y.object)}function f(){return n.getResources(y.object)}function b(e){return _.get(v(),e)}var y=this;_.assign(y,{$onChanges:t,addResource:o,noResources:c,cancelNewResourceMapping:i,saveResourceAndMapping:s,removeResource:l,toggleMainEdit:d,saveMainProperties:p,cancelMainProperties:u,getResources:f,getMappingForResource:b,getMainObject:g})}e.$inject=["c8yImpact","c8yObjectMappings"],angular.module("c8y.impact").component("c8yImpactDetail",{bindings:{id:"<"},templateUrl:"core_device-protocol-impact/impact-detail.html",controller:e,controllerAs:"vm"})}(),function(){"use strict";function e(e){function n(e){e.serverMapping&&o(),e.serverResource&&r()}function t(){l.isDetailOpen=l.startOpen}function a(){l.isDetailOpen=!l.isDetailOpen,l.isDetailOpen&&(r(),o())}function r(){l.resource=_.cloneDeep(l.serverResource)}function o(){l.mapping=_.cloneDeep(l.serverMapping)||{}}function c(){l.mapping.resourceID=l.resource.id,l.onUpdate({changedResource:l.resource,mapping:l.mapping}).then(a)}function i(){l.onCancel(),a()}function s(){l.onRemove({resource:l.resource})}var l=this;_.assign(l,{dataTypes:e.DATA_TYPES,$onChanges:n,$onInit:t,toggleDetail:a,save:c,cancel:i,remove:s})}e.$inject=["c8yImpact"],angular.module("c8y.impact").component("c8yImpactResource",{bindings:{serverResource:"<resource",serverMapping:"<mapping",onUpdate:"&",onCancel:"&",onRemove:"&",startOpen:"<"},templateUrl:"core_device-protocol-impact/impact-resource.html",controller:e,controllerAs:"vm"})}(),function(){"use strict";function e(e){var n;n='<div class="bg-gray-white">\n\n  <div class="c8y-wizard-body">\n    <form class="form" name="modelForm" novalidate>\n      <div class="form-group">\n        <label translate>Id</label>\n        <input name="id" class="form-control" ng-model="vm.model.id" ng-max="50" required ng-disabled="vm.pending">\n        <c8y-error-feedback field="modelForm.id"></c8y-error-feedback>\n      </div>\n      <div class="form-group">\n        <label translate>Name</label>\n        <input name="name" class="form-control" ng-model="vm.model.name" ng-max="100" required ng-disabled="vm.pending">\n        <c8y-error-feedback field="modelForm.name"></c8y-error-feedback>\n      </div>\n      <div class="form-group">\n        <label translate>Description</label>\n        <textarea style="height:150px" class="form-control" ng-model="vm.model.description" ng-disabled="vm.pending"></textarea>\n      </div>\n    </form>\n  </div>\n\n  <div class="c8y-wizard-footer">\n      <button class="btn btn-default" ng-click="vm.wizardCtrl.goToIndex(0)" translate>Back</button>\n      <button class="btn btn-default" ng-click="vm.wizardCtrl.dismiss()" translate>Cancel</button>\n      <button class="btn btn-primary" ng-click="vm.create(vm.model)" translate ng-disabled="modelForm.$invalid || vm.pending">Create</button>\n  </div>\n\n</div>\n',e.put("core_device-protocol-impact/impact-create-step.html",n),e.put("/apps/core/device-protocol-impact/impact-create-step.html",n),n='<c8y-ui-title-set title="vm.title"></c8y-ui-title-set>\n<c8y-device-protocol-breadcrumb></c8y-device-protocol-breadcrumb>\n\n<div class="row">\n  <div class="col-lg-12 col-lg-max">\n    <div class="card bottom-m-xs">\n      <div class="card-block">\n        <div class="row">\n          <div class="col-md-7">\n            <form class="form row" name="vm.mainPropertiesForm" ng-class="{\'form-read-only\': !vm.editingMain}" novalidate>\n              <div class="col-md-4">\n                <div class="form-group" ng-show="vm.editingMain">\n                  <label translate>Id</label>\n                  <input name="id" class="form-control" ng-model="vm.objectMain.id" required ng-max="100">\n                  <c8y-error-feedback field="vm.mainPropertiesForm.id"></c8y-error-feedback>\n                </div>\n              </div>\n              <div class="col-md-8">\n                <div class="form-group" ng-show="vm.editingMain">\n                  <label translate>Name</label>\n                  <input name="name" class="form-control" ng-model="vm.objectMain.name" required ng-max="200">\n                  <c8y-error-feedback field="vm.mainPropertiesForm.name"></c8y-error-feedback>\n                </div>\n              </div>\n              <div class="col-md-12">\n                <div class="form-group" ng-show="vm.editingMain">\n                  <label translate>Description</label>\n                  <textarea class="form-control" ng-model="vm.objectMain.description"></textarea>\n                </div>\n              </div>\n              <div class="col-md-12" ng-show="vm.editingMain">\n                <button type="button" class="btn btn-default top-m bottom-m" style="min-width: 100px" ng-click="vm.cancelMainProperties()" translate>\n                  Cancel\n                </button>\n                <button class="btn btn-primary top-m bottom-m" style="min-width: 100px" ng-click="vm.saveMainProperties()" ng-disabled="vm.mainPropertiesForm.$invalid || vm.mainPropertiesForm.$pristine" translate>\n                  Save\n                </button>\n              </div>\n            </form>\n            <div class="form-group" ng-hide="vm.editingMain">\n              <label class="small" translate>Description</label>\n              <p class="static-form-control">{{vm.objectMain.description}}</p>\n            </div>\n            <small ng-hide="vm.editingMain">\n              <a href="" ng-click="vm.toggleMainEdit()"><i c8y-icon="pencil"></i> {{\'Edit\' | translate}}</a>\n            </small>\n          </div>\n\n          <div class="col-md-5">\n            <dl class="dl-horizontal" style="margin-bottom:0">\n              <dt><label class="small" translate>Id</label></dt>\n              <dd style="font-size:1.5em">{{vm.getMainObject().id}}</dd>\n              <dt><label class="small" translate>Date created</label></dt>\n              <dd>{{vm.object.creationTime | absoluteDate}}</dd>\n              <dt><label class="small" translate>Last update</label></dt>\n              <dd>{{vm.object.lastUpdated | absoluteDate}}</dd>\n            </dl>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class="card">\n      <div class="card-header"><h4 translate>Resources</h4></div>\n        <div class="list-group">\n          <div class="c8y-empty-state text-left" ng-show="vm.noResources()">\n            <h1 c8y-icon="c8y-data-points"></h1>\n            <p translate>No resources to display. Click below to add.</p>\n          </div>\n\n          <c8y-impact-resource ng-repeat="(resourceId, resource) in vm.getResources()" resource="resource" mapping="vm.getMappingForResource(resourceId)" on-remove="vm.removeResource(resource)" on-update="vm.saveResourceAndMapping(changedResource, mapping, resource)">\n          </c8y-impact-resource>\n\n          <div ng-if="vm.newResource">\n            <c8y-impact-resource ng-show="vm.newResource" start-open="true" resource="vm.newResource" on-cancel="vm.cancelNewResourceMapping()" on-remove="vm.cancelNewResourceMapping()" on-update="vm.saveResourceAndMapping(changedResource, mapping)">\n            </c8y-impact-resource>\n          </div>\n\n          <div class="list-group-item" ng-hide="vm.newResource">\n            <button class="btn-add-block" ng-click="vm.addResource()">\n              <i c8y-icon="plus-square"></i> {{\'Add resource\' | translate}}\n            </button>\n          </div>\n      </div>\n    </div>\n  </div>\n</div>\n',e.put("core_device-protocol-impact/impact-detail.html",n),e.put("/apps/core/device-protocol-impact/impact-detail.html",n),n='<div class="list-group-item collapsible" ng-class="{\'expanded\': vm.isDetailOpen}">\n  <div class="flex-row" ng-click="vm.toggleDetail()">\n\n    <div class="list-item-actions">\n      <button type="button" title="{{\'Expand\' | translate}}" class="collapse-btn" ng-class="{active: vm.isDetailOpen}">\n        <i c8y-icon="chevron-down"></i>\n      </button>\n    </div>\n\n    <div class="list-item-icon">\n      <i c8y-icon="c8y-data-points"></i>\n    </div>\n\n    <div class="list-item-body right-m">\n      <div class="row flex-row">\n        <div class="col-xs-7">\n          <small class="text-muted">{{vm.serverResource.id}}</small>\n          {{vm.serverResource.name}}\n        </div>\n        <div class="col-xs-5">\n          <div class="list-functionalities">\n            <label class="small hidden-xs" translate>Functionalities</label>&nbsp;\n            <c8y-object-mapping-status-icons mapping="vm.serverMapping"></c8y-object-mapping-status-icons>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class="showOnHover right-m">\n      <a href="" style="text-decoration:none;padding-top:5px" class="text-danger" c8y-icon="minus-circle" ng-click="$event.stopPropagation();vm.remove()">\n      </a>\n    </div>\n\n  </div>\n\n  <div class="detail top-m-sm" uib-collapse="!vm.isDetailOpen">\n    <form name="wrapperForm" novalidate>\n      <div class="form tight-grid" ng-form="resourceForm">\n        <div class="col-md-4">\n          <div class="form-group form-group-sm">\n            <label translate>Id</label>\n            <input name="id" class="form-control" ng-model="vm.resource.id" required ng-maxlength="100">\n            <c8y-error-feedback field="resourceForm.id"></c8y-error-feedback>\n          </div>\n        </div>\n        <div class="col-md-8">\n          <div class="form-group form-group-sm">\n            <label translate>Name</label>\n            <input name="name" class="form-control" ng-model="vm.resource.name" required ng-maxlength="200">\n            <c8y-error-feedback field="resourceForm.name"></c8y-error-feedback>\n          </div>\n        </div>\n        <div class="col-md-4">\n          <div class="form-group form-group-sm">\n            <label translate>Type</label>\n            <div class="c8y-select-wrapper">\n              <select required name="type" class="form-control" ng-model="vm.resource.type" ng-options="dataType as (dataType | translate) for dataType in vm.dataTypes">\n              </select>\n              <span></span>\n            </div>\n            <c8y-error-feedback field="resourceForm.type"></c8y-error-feedback>\n          </div>\n        </div>\n        <div class="col-md-4">\n          <div class="form-group form-group-sm">\n            <label translate>Unit</label>\n            <input name="unit" class="form-control" ng-model="vm.resource.unit" ng-maxlength="50">\n            <c8y-error-feedback field="resourceForm.unit"></c8y-error-feedback>\n          </div>\n        </div>\n        <div class="col-md-4">\n          <div class="form-group form-group-sm">\n            <label translate>Instance type</label>\n            <div>\n                <label class="c8y-radio radio-inline">\n                  <input type="radio" name="multiple" ng-model="vm.resource.multiple" ng-value="false">\n                  <span></span> {{\'Single\' | translate}}\n                </label>\n                <label class="c8y-radio radio-inline">\n                  <input type="radio" name="multiple" ng-model="vm.resource.multiple" ng-value="true">\n                  <span></span> {{\'Multiple\' | translate}}\n                </label>\n            </div>\n            <c8y-error-feedback field="resourceForm.multiple"></c8y-error-feedback>\n          </div>\n        </div>\n        <div class="col-md-8">\n          <div class="form-group form-group-sm">\n            <label translate>Description</label>\n            <textarea class="form-control" name="description" ng-model="vm.resource.description"></textarea>\n            <c8y-error-feedback field="resourceForm.description"></c8y-error-feedback>\n          </div>\n        </div>\n      </div>\n\n      <c8y-object-mapping mapping="vm.mapping"></c8y-object-mapping>\n\n      <button class="btn btn-default top-m bottom-m" style="min-width: 100px" ng-click="vm.cancel()" translate>\n        Cancel\n      </button>\n      <button class="btn btn-primary top-m bottom-m" style="min-width: 100px" ng-click="vm.save()" ng-disabled="wrapperForm.$invalid || wrapperForm.$pristine" translate>\n          Save\n      </button>\n    </form>\n  </div>\n</div>\n',e.put("core_device-protocol-impact/impact-resource.html",n),e.put("/apps/core/device-protocol-impact/impact-resource.html",n)}angular.module("c8y.impact").run(["$templateCache",e])}();