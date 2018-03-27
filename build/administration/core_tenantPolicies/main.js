/* core_tenantPolicies 9.3.0 2018-03-26T16:26:30+00:00 796b68a031b1+ (release/9.3.0) tip */
!function(){"use strict";function n(n){n.config()}n.$inject=["c8yTenantPoliciesConfigProvider"],angular.module("c8y.tenantPolicies",[]).config(n)}(),function(){"use strict";function n(n,e){function t(){var e={type:o};return n.list(e)}function i(e){return e.id||(e.type=o),n.save(e)}var o="c8y_TenantPolicy";return{list:t,detail:n.detail,remove:n.remove,save:i,isTopTenant:e.isCurrentUserTopTenant}}n.$inject=["c8yInventory","c8yTenant"],angular.module("c8y.tenantPolicies").factory("c8yTenantPolicies",n)}(),function(){"use strict";function n(n,e,t){function i(){o(),a()}function o(){n.when(s,m),n.when(d,u)}function a(){e.addNavigation({name:v,parent:t("Tenants"),icon:r,path:s,showIf:["c8yUserUtil",function(n){return n.showTenantManagement()}]})}function l(n,e){var t=n.current.params.tenantPolicyId,i=/^(\d+|new)$/;return i.test(t)?t:e.reject()}function c(n,e,i,o,a,l){function c(t){n.path(s+e.getId(t))}function d(){n.path(s)}function m(){var n=m._default||{name:l.getString("New tenant policy"),description:l.getString("New tenant policy description"),options:[],retentions:[]};return delete m._default,n}function u(e){m._default=_.cloneDeep(_.omit(e,["id"])),n.path(p)}function y(n){return i({status:"danger",size:"sm",title:t("Delete tenant policy"),body:l.getString('Are you sure you want to delete tenant policy "{{name}}"?',n),labels:{ok:t("Delete")}}).then(_.partial(a.remove,n)).then(_.partial(g,n))}function g(n){var e=l.getString('Tenant policy "{{name}}" deleted',n);o.success(e)}function b(n,e){n.name=e,n.id&&a.save(_.pick(n,["id","name"])).then(_.partial(f,n))}function f(n){var e=l.getString('Tenant policy name changed to "{{name}}"',n);o.success(e)}return{TITLE:v,ROUTE_NEW:p,ICON:r,edit:c,toList:d,defaultObject:m,removeConfirm:y,duplicate:u,saveName:b}}l.$inject=["$route","$q"],c.$inject=["$location","c8yBase","c8yModal","c8yAlert","c8yTenantPolicies","gettextCatalog"];var s="tenantpolicies/",r="c8y-tenant-policies",d=s+":tenantPolicyId",p=s+"new",m={template:"<c8y-tenant-policy-list/>"},u={template:'<c8y-tenant-policy-detail id="$resolve.id"/>',resolve:{id:l}},v=t("Tenant policies");return{config:i,$get:c}}n.$inject=["c8yViewsProvider","c8yNavigatorProvider","gettext"],angular.module("c8y.tenantPolicies").provider("c8yTenantPoliciesConfig",n)}(),function(){"use strict";function n(n,e){function t(){i()}function i(){n.list().then(o)}function o(n){c.policies=n}function a(n){e.removeConfirm(n).then(i)}function l(n){e.duplicate(n)}var c=this;_.assign(c,{$onInit:t,TITLE:e.TITLE,ICON:e.ICON,ROUTE_NEW_POLICY:e.ROUTE_NEW,reload:i,edit:e.edit,remove:a,duplicate:l})}n.$inject=["c8yTenantPolicies","c8yTenantPoliciesConfig"],angular.module("c8y.tenantPolicies").component("c8yTenantPolicyList",{templateUrl:"core_tenantPolicies/tenantPolicyList/tenantPolicyList.html",controller:n,controllerAs:"vm"})}(),function(){"use strict";function n(n,e,t){function i(n){n.id&&u.id&&(/\d+/.test(u.id)&&o(u.id),"new"===u.id&&a(t.defaultObject())),n.policy&&u.policy&&a(u.policy)}function o(t){e.detail(t).then(n.getResData).then(a)}function a(n){u.editingPolicy=_.cloneDeep(n)}function l(n){t.saveName(u.editingPolicy,n)}function c(){u.editingPolicy.retentions.push({dataType:"*",fragmentType:"*",maximumAge:10,source:"*",type:"*",editable:void 0,isNew:!0})}function s(){u.editingPolicy.options.push({category:"",key:"",value:"",editable:void 0,isNew:!0})}function r(n){_.pull(u.editingPolicy.retentions,n)}function d(n){_.pull(u.editingPolicy.options,n)}function p(){e.save(u.editingPolicy).then(t.toList)}function m(){t.removeConfirm(u.editingPolicy).then(t.toList)}var u=this;_.assign(u,{$onChanges:i,addRetentionRule:c,addTenantOption:s,ICON:t.ICON,onRemoveRetentionRule:r,onRemoveTenantOption:d,onSaveTitle:l,save:p,cancel:t.toList,remove:m})}n.$inject=["c8yBase","c8yTenantPolicies","c8yTenantPoliciesConfig"],angular.module("c8y.tenantPolicies").component("c8yTenantPolicyDetail",{templateUrl:"core_tenantPolicies/tenantPolicyDetail/tenantPolicyDetail.html",controller:n,controllerAs:"vm",bindings:{id:"<",policy:"<"}})}(),function(){"use strict";function n(n,e){function t(){o(),a()}function i(){_.get(l.rule,"isNew")&&(delete l.rule.isNew,l.isOpen=!0)}function o(){n.isTopTenant().then(function(n){l.canDisableEdit=n})}function a(){_.set(l,"rule.editable",_.get(l,"rule.editable",!1))}var l=this;_.assign(l,{$onInit:t,$onChanges:i,dataTypes:e.DATA_TYPES})}n.$inject=["c8yTenantPolicies","c8yRetentions"],angular.module("c8y.tenantPolicies").component("c8yRetentionRuleRow",{templateUrl:"core_tenantPolicies/retentionRule/retentionRuleRow.html",controller:n,controllerAs:"vm",bindings:{rule:"<",onRemove:"&"}})}(),function(){"use strict";function n(n){function e(){i()}function t(){_.get(o.option,"isNew")&&(delete o.option.isNew,o.isOpen=!0)}function i(){n.isTopTenant().then(function(n){o.canDisableEdit=n})}var o=this;_.assign(o,{$onInit:e,$onChanges:t})}n.$inject=["c8yTenantPolicies"],angular.module("c8y.tenantPolicies").component("c8yTenantOptionsRow",{templateUrl:"core_tenantPolicies/tenantOptions/tenantOptionsRow.html",controller:n,controllerAs:"vm",bindings:{option:"<",onRemove:"&"}})}(),function(){"use strict";angular.module("c8y.tenantPolicies").component("c8yEditTenantOption",{templateUrl:"core_tenantPolicies/tenantOptions/editTenantOption.html",controllerAs:"vm",bindings:{option:"="}})}(),function(){"use strict";function n(n){var e;e='<div class="panel-default" uib-accordion-group is-open="vm.isOpen" ng-class="{\'expanded\': vm.isOpen}" template-url="core_tenantPolicies/tenantPolicyDetail/accordion.html">\n  <uib-accordion-heading>\n    <div style="align-self:center" class="col-sm-1">\n      <i c8y-icon="{{vm.dataTypes[vm.rule.dataType].icon}}" uib-tooltip="{{vm.dataTypes[vm.rule.dataType].label | translate}}">\n      </i>\n    </div>\n    <div class="col-sm-3 col-xs-12">\n      <span uib-tooltip="{{\'Fragment type\' | translate}}">{{vm.rule.fragmentType}}</span>\n    </div>\n    <div class="col-sm-3 col-xs-12">\n      <span uib-tooltip="{{\'Type\' | translate}}">{{vm.rule.type}}</span>\n    </div>\n    <div class="col-sm-3 col-xs-12">\n      <span uib-tooltip="{{\'Maximum age\' | translate}}">\n        <i c8y-icon="calendar"></i>\n        <span ng-show="vm.rule.maximumAge !== undefined" translate translate-n="vm.rule.maximumAge" translate-plural="{{$count}} days">1 day</span>\n      <span ng-show="vm.rule.maximumAge === undefined"> --- </span>\n      </span>\n    </div>\n    <div class="col-sm-2 text-right panel-actions">\n      <button class="showOnHover btn btn-link" style="font-size: 16px" ng-click="$event.stopPropagation();vm.onRemove({rule: vm.rule})" uib-tooltip="{{\'Remove\' | translate}}">\n        <i c8y-icon="minus-circle" class="text-danger"></i>\n      </button>\n      <button class="collapse-btn" style="margin-left:10px"><i c8y-icon="chevron-down"></i>\n      </button>\n    </div>\n  </uib-accordion-heading>\n\n  <form name="retentionForm" role="form" novalidate>\n\n    <div class="form-horizontal">\n      <div class="form-group" ng-show="vm.canDisableEdit">\n        <label for="description" class="col-sm-3 control-label" style="text-align:left">\n          {{\'Allow editing\' | translate}}\n          <a href="" uib-popover="{{\'Allow subtenants to edit this retention rule\' | translate}}" popover-placement="auto" popover-append-to-body="true">\n            <i c8y-icon="question-circle-o"></i>\n          </a>\n        </label>\n\n        <div class="col-sm-9">\n          <label class="c8y-switch" style="vertical-align:middle">\n            <input type="checkbox" ng-checked="vm.rule.editable" ng-click="vm.rule.editable=!vm.rule.editable">\n            <span></span>\n            <span ng-show="vm.rule.editable" translate>Enabled</span>\n            <span ng-hide="vm.rule.editable" translate>Disabled</span>\n          </label>\n        </div>\n      </div>\n    </div>\n\n    <c8y-edit-retention-rule hide-source="true" ng-model="vm.rule">\n    </c8y-edit-retention-rule>\n\n  </form>\n\n</div>',n.put("core_tenantPolicies/retentionRule/retentionRuleRow.html",e),n.put("/apps/core/tenantPolicies/retentionRule/retentionRuleRow.html",e),e='\n<ng-form name="systemOptionsForm">\n  <div class="form-group">\n    <label>{{\'Category\' | translate}}</label>\n    <input class="form-control" name="category" ng-model="vm.option.category" placeholder="{{\'e.g. two-factor-authentication\' | translate}}" required>\n      <c8y-error-feedback field="systemOptionsForm.category"></c8y-error-feedback>\n  </div>\n  <div class="form-group">\n    <label>{{\'Key\' | translate}}</label>\n    <input class="form-control" name="key" ng-model="vm.option.key" placeholder="{{\'e.g. enabled\' | translate}}" required>\n      <c8y-error-feedback field="systemOptionsForm.key"></c8y-error-feedback>\n  </div>\n  <div class="form-group">\n    <label>{{\'Value\' | translate}}</label>\n    <input class="form-control" name="value" ng-model="vm.option.value" placeholder="{{\'e.g. true\' | translate}}" required>\n      <c8y-error-feedback field="systemOptionsForm.value"></c8y-error-feedback>\n  </div>\n</ng-form>\n',n.put("core_tenantPolicies/systemOptions/editSystemOption.html",e),n.put("/apps/core/tenantPolicies/systemOptions/editSystemOption.html",e),e='<div class="panel-default" uib-accordion-group is-open="vm.isOpen" ng-class="{\'expanded\': vm.isOpen}" template-url="core_tenantPolicies/tenantPolicyDetail/accordion.html">\n  <uib-accordion-heading>\n    <div class="col-sm-4 col-xs-12">\n      <span uib-tooltip="{{\'Category\' | translate}}">\n        {{vm.option.category}}\n      </span>\n    </div>\n    <div class="col-sm-3 col-xs-12">\n      <span uib-tooltip="{{\'Key\' | translate}}">\n        {{vm.option.key}}\n      </span>\n    </div>\n    <div class="col-sm-3 col-xs-12">\n      <span uib-tooltip="{{\'Value\' | translate}}">\n        {{vm.option.value}}\n      </span>\n    </div>\n\n    <div class="col-sm-2 text-right panel-actions">\n      <button class="showOnHover btn btn-link" style="font-size: 16px" ng-click="$event.stopPropagation();vm.onRemove({option: vm.option})" uib-tooltip="{{\'Remove\' | translate}}">\n        <i c8y-icon="minus-circle" class="text-danger"></i>\n      </button>\n      <div class="btn btn-link"><i c8y-icon="chevron-down"></i></div>\n    </div>\n  </uib-accordion-heading>\n\n  <form name="systemOptionsForm" role="form" novalidate>\n    <div class="form-horizontal">\n      <div class="form-group" ng-show="vm.canDisableEdit">\n        <label for="description" class="col-sm-3 control-label" style="text-align:left">\n          {{\'Allow editing\' | translate}}\n          <a href="" uib-popover="{{\'Allow subtenants to edit this system option.\' | translate}}" popover-placement="auto" popover-append-to-body="true">\n            <i c8y-icon="question-circle-o"></i>\n          </a>\n        </label>\n\n        <div class="col-sm-9">\n          <label class="c8y-switch" style="vertical-align:middle">\n            <input type="checkbox" ng-checked="vm.option.editable" ng-click="vm.option.editable=!vm.option.editable">\n            <span></span>\n            <span ng-show="vm.option.editable" translate>Enabled</span>\n            <span ng-hide="vm.option.editable" translate>Disabled</span>\n          </label>\n        </div>\n      </div>\n    </div>\n    <c8y-edit-system-option option="vm.option"></c8y-edit-system-option>\n\n  </form>\n\n</div>\n',n.put("core_tenantPolicies/systemOptions/systemOptionsRow.html",e),n.put("/apps/core/tenantPolicies/systemOptions/systemOptionsRow.html",e),e='\n<ng-form name="tenantOptionsForm">\n  <div class="form-group">\n    <label>{{\'Category\' | translate}}</label>\n    <input class="form-control" name="category" ng-model="vm.option.category" placeholder="{{\'e.g. two-factor-authentication\' | translate}}" required>\n      <c8y-error-feedback field="tenantOptionsForm.category"></c8y-error-feedback>\n  </div>\n  <div class="form-group">\n    <label>{{\'Key\' | translate}}</label>\n    <input class="form-control" name="key" ng-model="vm.option.key" placeholder="{{\'e.g. enabled\' | translate}}" required>\n      <c8y-error-feedback field="tenantOptionsForm.key"></c8y-error-feedback>\n  </div>\n  <div class="form-group">\n    <label>{{\'Value\' | translate}}</label>\n    <input class="form-control" name="value" ng-model="vm.option.value" placeholder="{{\'e.g. true\' | translate}}" required>\n      <c8y-error-feedback field="tenantOptionsForm.value"></c8y-error-feedback>\n  </div>\n</ng-form>\n',n.put("core_tenantPolicies/tenantOptions/editTenantOption.html",e),n.put("/apps/core/tenantPolicies/tenantOptions/editTenantOption.html",e),e='<div class="panel-default" uib-accordion-group is-open="vm.isOpen" ng-class="{\'expanded\': vm.isOpen}" template-url="core_tenantPolicies/tenantPolicyDetail/accordion.html">\n  <uib-accordion-heading>\n    <div class="col-sm-4 col-xs-12">\n      <span uib-tooltip="{{\'Category\' | translate}}">\n        {{vm.option.category}}\n      </span>\n    </div>\n    <div class="col-sm-3 col-xs-12">\n      <span uib-tooltip="{{\'Key\' | translate}}">\n        {{vm.option.key}}\n      </span>\n    </div>\n    <div class="col-sm-3 col-xs-12">\n      <span uib-tooltip="{{\'Value\' | translate}}">\n        {{vm.option.value}}\n      </span>\n    </div>\n\n    <div class="col-sm-2 text-right panel-actions">\n      <button class="showOnHover btn btn-link" style="font-size: 16px" ng-click="$event.stopPropagation();vm.onRemove({option: vm.option})" uib-tooltip="{{\'Remove\' | translate}}">\n        <i c8y-icon="minus-circle" class="text-danger"></i>\n      </button>\n      <button class="collapse-btn"><i c8y-icon="chevron-down"></i></button>\n    </div>\n  </uib-accordion-heading>\n\n  <form name="tenantOptionsForm" role="form" novalidate>\n    <div class="form-horizontal">\n      <div class="form-group" ng-show="vm.canDisableEdit">\n        <label for="description" class="col-sm-3 control-label" style="text-align:left">\n          {{\'Allow editing\' | translate}}\n          <a href="" uib-popover="{{\'Allow subtenants to edit this tenant option.\' | translate}}" popover-placement="auto" popover-append-to-body="true">\n            <i c8y-icon="question-circle-o"></i>\n          </a>\n        </label>\n\n        <div class="col-sm-9">\n          <label class="c8y-switch" style="vertical-align:middle">\n            <input type="checkbox" ng-checked="vm.option.editable" ng-click="vm.option.editable=!vm.option.editable">\n            <span></span>\n            <span ng-show="vm.option.editable" translate>Enabled</span>\n            <span ng-hide="vm.option.editable" translate>Disabled</span>\n          </label>\n        </div>\n      </div>\n    </div>\n    <c8y-edit-tenant-option option="vm.option"></c8y-edit-tenant-option>\n\n  </form>\n\n</div>',n.put("core_tenantPolicies/tenantOptions/tenantOptionsRow.html",e),n.put("/apps/core/tenantPolicies/tenantOptions/tenantOptionsRow.html",e),e='<div tabindex="0" class="accordion-toggle interact row" ng-click="toggleOpen()" uib-accordion-transclude="heading">\n  <div uib-accordion-header class="flex-row" ng-class="{\'text-muted\': isDisabled}">\n    {{heading}}\n  </div>\n</div>\n\n\n<div class="panel-collapse collapse" uib-collapse="!isOpen">\n  <div class="panel-body" ng-transclude></div>\n</div>',n.put("core_tenantPolicies/tenantPolicyDetail/accordion.html",e),n.put("/apps/core/tenantPolicies/tenantPolicyDetail/accordion.html",e),e='<c8y-ui-title-set title="::vm.editingPolicy.name"></c8y-ui-title-set>\n\n<c8y-breadcrumbs-set>\n  <c8y-breadcrumbs-item path="#tenantpolicies" label="{{\'Tenant policies\' | translate}}" icon="c8y-tenant-policies"></c8y-breadcrumbs-item>\n</c8y-breadcrumbs-set>\n\n<form name="policyForm" novalidate>\n  <div class="row">\n    <div class="col-md-10 col-lg-8">\n      <div class="card">\n        <div class="card-block">\n          <div class="form-group">\n            <label for="name" translate>\n              Name\n            </label>\n            <input id="name" name="name" type="text" class="form-control" required ng-model="vm.editingPolicy.name">\n            <c8y-error-feedback field="policyForm.name"></c8y-error-feedback>\n          </div>\n          <div class="form-group">\n            <label for="description" translate>\n              Description\n            </label>\n            <textarea id="description" name="description" class="form-control" style="height:100px" ng-maxlength="1000" ng-model="vm.editingPolicy.description">\n            </textarea>\n            <c8y-error-feedback field="policyForm.description"></c8y-error-feedback>\n          </div>\n\n          <fieldset>\n            <div class="legend form-block center" translate>\n              Retention rules\n            </div>\n            <div class="c8y-empty-state text-left" ng-show="vm.editingPolicy.retentions.length === 0">\n              <h1 class="c8y-icon c8y-icon-tenant-policies c8y-icon-duocolor"></h1>\n              <p>\n                <strong translate>No retention rules defined.</strong>\n                <span translate>You must add at least one retention rule.</span>\n              </p>\n            </div>\n            <uib-accordion close-others="false">\n              <c8y-retention-rule-row ng-repeat="rule in vm.editingPolicy.retentions" rule="rule" on-remove="vm.onRemoveRetentionRule(rule); policyForm.$setDirty()">\n              </c8y-retention-rule-row>\n            </uib-accordion>\n          </fieldset>\n\n          <button class="btn-add-block" ng-click="vm.addRetentionRule(); policyForm.$setDirty()">\n            <i c8y-icon="plus-circle"></i> {{\'Add retention rule\' | translate}}\n          </button>\n\n          <fieldset>\n            <div class="legend form-block center" translate>\n              Tenant options\n            </div>\n            <div class="c8y-empty-state text-left" ng-show="vm.editingPolicy.options.length === 0">\n              <h1 class="c8y-icon c8y-icon-tenant-policies c8y-icon-duocolor"></h1>\n              <p>\n                <strong translate>No options defined.</strong>\n              </p>\n            </div>\n            <uib-accordion close-others="false">\n              <c8y-tenant-options-row ng-repeat="option in vm.editingPolicy.options" option="option" on-remove="vm.onRemoveTenantOption(option); policyForm.$setDirty()">\n              </c8y-tenant-options-row>\n            </uib-accordion>\n          </fieldset>\n\n          <button class="btn-add-block" ng-click="vm.addTenantOption(); policyForm.$setDirty()">\n            <i c8y-icon="plus-circle"></i> {{\'Add tenant option definition\' | translate}}\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="text-center page-footer">\n    <c8y-ui-button-footer>\n      <div class="row">\n        <div class="col-md-10 col-lg-8">\n          <button class="btn btn-default" ng-click="vm.cancel()" translate>\n            Cancel\n          </button> &nbsp;\n          <button class="btn btn-danger" ng-if="vm.editingPolicy.id" ng-click="vm.remove()" translate>\n            Remove\n          </button> &nbsp;\n          <button class="btn btn-primary" ng-disabled="!vm.editingPolicy.retentions.length || policyForm.$invalid || policyForm.$pristine" ng-click="vm.save()" translate>\n            Save\n          </button>\n        </div>\n      </div>\n    </c8y-ui-button-footer>\n  </div>\n</form>',n.put("core_tenantPolicies/tenantPolicyDetail/tenantPolicyDetail.html",e),n.put("/apps/core/tenantPolicies/tenantPolicyDetail/tenantPolicyDetail.html",e),e='<div class="panel-default" uib-accordion-group is-open="vm.isOpen" template-url="core_tenantPolicies/tenantPolicyDetail/accordion.html">\n  <uib-accordion-heading class="row">\n    <div style="align-self:center; padding: 0 10px" class="col-sm-1">\n      <i c8y-icon="{{vm.dataTypes[vm.rule.dataType].icon}}" uib-tooltip="{{vm.dataTypes[vm.rule.dataType].label | translate}}" tooltip-placement="right">\n      </i>\n    </div>\n    <div class="col-sm-3" uib-tooltip="{{\'Fragment type\' | translate}}" tooltip-placement="left">{{vm.rule.fragmentType}}</div>\n    <div class="col-sm-3" uib-tooltip="{{\'Type\' | translate}}" tooltip-placement="left">{{vm.rule.type}}</div>\n    <div class="col-sm-3" uib-tooltip="{{\'Maximum age\' | translate}}" tooltip-placement="left">\n      <i c8y-icon="calendar"></i>\n      <span ng-show="vm.rule.maximumAge !== undefined" translate translate-n="vm.rule.maximumAge" translate-plural="{{$count}} days">1 day</span>\n      <span ng-show="vm.rule.maximumAge === undefined"> --- </span>\n    </div>\n    <div class="col-sm-2 text-right">\n      <a class="showOnHover" style="font-size: 16px; line-height:14px" href="" ng-click="$event.stopPropagation();vm.onRemove({rule: vm.rule})" uib-tooltip="{{\'Remove\' | translate}}">\n        <i c8y-icon="minus-circle" class="text-muted"></i>\n      </a>\n      <i c8y-icon="chevron-down" ng-hide="vm.isOpen"></i>\n      <i c8y-icon="chevron-up" ng-show="vm.isOpen"></i>\n    </div>\n  </uib-accordion-heading>\n\n  <form name="retentionForm" role="form" novalidate>\n\n    <div class="form-horizontal">\n      <div class="form-group" ng-show="vm.canDisableEdit">\n        <label for="description" class="col-sm-3 control-label" style="text-align:left">\n          {{\'Allow editing\' | translate}}\n          <a href="" uib-popover="{{\'Allow subtenants to edit this retention rule\' | translate}}" popover-placement="auto" popover-append-to-body="true">\n            <i c8y-icon="question-circle-o"></i>\n          </a>\n        </label>\n\n        <div class="col-sm-9">\n          <label class="c8y-switch" style="vertical-align:middle">\n            <input type="checkbox" ng-checked="vm.rule.editable" ng-click="vm.rule.editable=!vm.rule.editable">\n            <span></span>\n            <span ng-show="vm.rule.editable" translate>Enabled</span>\n            <span ng-hide="vm.rule.editable" translate>Disabled</span>\n          </label>\n        </div>\n      </div>\n    </div>\n\n    <c8y-edit-retention-rule hide-source="true" ng-model="vm.rule">\n    </c8y-edit-retention-rule>\n\n  </form>\n\n</div>\n',n.put("core_tenantPolicies/tenantPolicyDetail/tenantPolicyRow.html",e),n.put("/apps/core/tenantPolicies/tenantPolicyDetail/tenantPolicyRow.html",e),e='<c8y-ui-title-set title="vm.TITLE | translate">\n</c8y-ui-title-set>\n\n<c8y-ui-action-bar-set>\n  <li class="navbar-form hidden-xs" action-bar-position="left">\n    <c8y-list-display-control list-length="vm.policies.length" on-list-class-change="vm.listClass = listClass">\n    </c8y-list-display-control>\n  </li>\n\n  <a href="#{{vm.ROUTE_NEW_POLICY}}" class="btn btn-link">\n    <i c8y-icon="plus-circle"></i> {{\'Add tenant policy\' | translate}}\n  </a>\n\n  <button type="button" class="btn btn-link" ng-click="vm.reload()">\n    <i c8y-icon="refresh"></i> {{\'Reload\' | translate}}\n  </button>\n</c8y-ui-action-bar-set>\n\n\n<div class="c8y-empty-state text-center" ng-if="vm.policies.length === 0">\n  <h1 class="c8y-icon c8y-icon-tenant-policies c8y-icon-duocolor"></h1>\n  <h3 translate>No tenant policies to display</h3>\n  <p translate>Click below to add your first tenant policy.</p>\n  <a href="#{{vm.ROUTE_NEW_POLICY}}" class="btn btn-primary">\n    <i c8y-icon="plus-circle"></i> {{\'Add tenant policy\' | translate}}\n  </a>\n  <!-- <p><small><span translate>Find out more on</span> <a href="{{vm.documentationURL}}" target="_blank" translate>User guide</a>.</small></p> -->\n</div>\n\n<div class="card-group" ng-class="vm.listClass">\n  <div ng-repeat="policy in vm.policies |orderBy:\'name\'" class="col-xs-12 col-sm-4 col-md-3">\n    <div class="card" ng-click="vm.edit(policy.id)">\n\n      <div class="card-actions" ng-click="$event.stopPropagation();">\n        <div class="dropdown settings" uib-dropdown>\n          <button class="dropdown-toggle c8y-dropdown" uib-dropdown-toggle ng-click="::$event.stopPropagation()">\n            <i c8y-icon="ellipsis-v"></i>\n          </button>\n          <ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu>\n            <li>\n              <a href="" ng-click="::$event.stopPropagation();vm.edit(policy)">\n                <i c8y-icon="pencil"></i> <translate>Edit</translate>\n              </a>\n            </li>\n            <li>\n              <a href="" ng-click="::$event.stopPropagation();vm.duplicate(policy)">\n                <i c8y-icon="copy"></i> <translate>Duplicate</translate>\n              </a>\n            </li>\n            <li>\n              <a href="" ng-click="::$event.stopPropagation();vm.remove(policy)">\n                <i c8y-icon="trash"></i> <translate>Delete</translate>\n              </a>\n            </li>\n          </ul>\n        </div>\n      </div>\n\n      <div class="card-header text-truncate">\n        <div class="card-icon">\n          <i c8y-icon="{{vm.ICON}} c8y-icon-duocolor"></i>\n        </div>\n        <div class="card-title" title="{{policy.name}}">\n          {{policy.name}}\n        </div>\n      </div>\n      <!-- ./card-header -->\n      <div class="card-block">\n        <p>{{policy.description}}</p>\n        <br>\n        <div class="clearfix card-item-last">\n          <p class="pull-left">\n            <span class="badge bg-primary" ng-bind="::(policy.retentions.length || 0)"></span>\n            <small translate class="text-muted">Retention rules</small>\n          </p>\n\n          <p class="pull-right">\n            <small translate class="text-muted">Tenant options</small>\n            <span class="badge bg-complementary" ng-bind="::(policy.options.length || 0)"></span>\n          </p>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>',n.put("core_tenantPolicies/tenantPolicyList/tenantPolicyList.html",e),n.put("/apps/core/tenantPolicies/tenantPolicyList/tenantPolicyList.html",e)}angular.module("c8y.tenantPolicies").run(["$templateCache",n])}();