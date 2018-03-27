/* administration_applications 9.3.0 2018-03-26T16:24:16+00:00 796b68a031b1+ (release/9.3.0) tip */
!function(){"use strict";function n(n,t,a,i,e){n.addNavigation({parent:e("Applications"),name:e("Own applications"),path:"applications",icon:"c8y-modules",priority:4e3}),t.when("/applications",{templateUrl:"administration_applications/views/list.html"}),t.when("/applications/:applicationId",{controller:"applicationDetailCtrl",templateUrl:"administration_applications/views/detail.html",icon:"list",name:e("Properties"),priority:1e3}),a.addTitle("/applications/:applicationId",{data:["$q",function(n){return n.when({templateUrl:"administration_applications/views/title.html"})}]}),i.addUrlAction({path:"/applications/:applicationId/*",text:e("Open"),actionBar:!0,position:"right",button:{cls:"default"},icon:"external-link",priority:2e3,showIf:function(n,t){return n.canOpenInBrowser(t.applicationId)},action:function(n,t,a,i){return i.detail(n.applicationId).then(a.getResData).then(function(n){t.location.href=i.getHref(n)})}}),i.addUrlAction({path:"/applications/:applicationId/*",text:e("Delete"),actionBar:!0,position:"right",button:{cls:"danger"},icon:"trash",priority:1e3,showIf:function(n,t){return t.getCurrent().then(function(t){return t.id!==n.applicationId})},action:function(n,t,a,i,l,r,o){return l.detail(n.applicationId).then(i.getResData).then(function(n){return r({title:e("Confirm delete?"),body:o.getString('Do you really want to remove application "{{app | humanizeAppName}}"?',{app:n}),status:"danger"}).then(angular.bind(l,l.remove,n)).then(function(){a.path("/applications")})})}})}n.$inject=["c8yNavigatorProvider","c8yViewsProvider","c8yTitleProvider","c8yActionsProvider","gettext"],angular.module("c8y.parts.applications",[]).config(n)}(),function(){"use strict";function n(n,t,a,i,e,l,r,o,p,s){function c(t){return n.applications||(n.applications=[]),t.forEach(function(t){n.applications.push(t)}),n.paging=t.paging,n.applications.length}function d(t){delete n.applications,i.getCurrent().then(u),i.listByOwner(t).then(c).then(z)}function u(t){n.currentApp=t}function m(n){a.path("/applications/"+n.id)}function g(n){a.path("/applications/"+n.id+"/plugins")}function v(){a.path("/applications/new")}function h(){return l.open({templateUrl:"administration_applications/appWizard/wizard.html"}).result.then(b)}function f(t){e({title:p("Confirm application removal?"),body:s.getString('Do you really want to remove application "{{appName}}"?',{appName:t.name}),size:"sm",labels:{ok:"Remove"},status:"danger"}).then(angular.bind(i,i.remove,t)).then(angular.bind(r,r.removeFromList,n.applications,t)).then(z)}function y(){n.paging.loading=!0,n.paging.next().then(c).then(z).finally(function(){n.paging.loading=!1})}function b(){n.applications=null,n.refreshLoading=!0,n.paging.refresh().then(c).then(z).finally(function(){n.refreshLoading=!1}),n.paging=null}function w(n){return _.includes(["HOSTED","MICROSERVICE"],n.type)?n.contextPath:n.externalUrl}function z(){o.changeTitle(A())}function A(){var a=n.applications.length,i=p("Own applications"),e=_.isUndefined(a)?"":s.getPlural(a,"1 application","{{$count}} applications",{});return t.resolve({title:i,subtitle:e})}function x(t){return Boolean(n.currentApp&&n.currentApp.id===t.id)}function C(n){var t={result:!1};return i.canOpenInBrowser(n).then(function(n){t.result=n}),t}function S(n){var t={result:!1};return i.canAddPlugin(n).then(function(n){t.result=n}),t}n.getHref=i.getHref,n.detail=m,n.detailPlugins=g,n.add=v,n.addWithWizard=h,n.onClickDelete=f,n.loadNext=y,n.refresh=b,n.path=w,n.iconType=i.icon,n.isCurrentApp=x,n.canOpenInBrowser=_.memoize(C,function(n){return n.id}),n.canAddPlugin=_.memoize(S,function(n){return n.id}),d()}n.$inject=["$scope","$q","$location","c8yApplication","c8yModal","c8yWizardModal","c8yBase","c8yTitle","gettext","gettextCatalog"],angular.module("c8y.parts.applications").controller("applicationListCtrl",n)}(),function(){"use strict";function n(n,t,a,i,e){function l(){t.applicationId&&i.detail(t.applicationId).then(a.getResData).then(function(n){o.app=n})}function r(){return e.getString('This application has been cloned from "{{name}}" and won\'t get any further updates from the original app.',o.clonedFromApp)}var o=this;o.getClonedAppTooltip=r,n.$on("$routeChangeSuccess",l),l()}angular.module("c8y.parts.applications").controller("appDetailsTitleCtrl",["$rootScope","$routeParams","c8yBase","c8yApplication","gettextCatalog",n])}();var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n};angular.module("c8y.parts.applications").controller("applicationDetailCtrl",["$scope","$location","$route","$routeParams","c8yApplication","c8yUser","c8yBase","c8yTitle","gettext","gettextCatalog","c8yAlert",function(n,t,a,i,e,l,r,o,p,s,c){"use strict";function d(t){n.application=e.convertType(t)}function u(i){c.success(p("Application has been saved successfully!")),n.isNew?t.path("/applications/"+i.id):a.reload()}function m(t){n.tenant=t.tenant}function g(t){t.length&&(n.file=t[0])}function v(){l.current().then(m)}function h(){b?e.detail(b).then(function(n){return n.data}).then(d):(n.isNew=!0,d({}))}function f(t){t=_.cloneDeep(t),t.manifest||(t.manifest={});var a=t.type;"HOSTED"===a&&(t.resourcesUrl="/"),t=e.revertType(t);var i=e.save(t).then(r.getResData);return"HOSTED"===a&&n.file&&(i=i.then(function(a){return t=a,e.uploadArchive(t,n.file)}).then(r.getResData).then(function(n){return e.save(_.assign(t,{activeVersionId:n.id})).then(r.getResData)})),i.then(u)}function y(t){var a=[];return n[w][t]&&n[w][t].$error&&_.forEach(n[w][t].$error,function(n,i){n&&(_.isUndefined(z[i])||("object"===_typeof(z[i])?z[i][t]&&a.push(z[i][t]):a.push(z[i])))}),a.join(" ")}var b=i.applicationId,w="applicationForm",z={required:s.getString("This field is required!"),maxlength:s.getString("Up to 120 characters allowed!"),url:s.getString("Valid URL required!")};b="new"===b?void 0:b,n.icon=e.icon,n.typeLabel=e.typeLabel,n.invalid=angular.bind(r,r.invalid,n,"applicationForm"),n.validationHints=y,n.save=f,n.onFileSelect=g,n.host=t.host(),h(),v()}]),function(){"use strict";function n(n,t,a){function i(){e()}function e(){l().then(o)}function l(){return t.current().then(function(n){return a.listByUser(n).then(r)})}function r(n){return _.uniqBy(n,function(n){return n.id})}function o(t){n.applications=t}function p(){n.allowedApplications=n.allowedApplications||[]}function s(n){c(n)?d(n):u(n)}function c(t){return!!_.find(n.allowedApplications,function(n){return n.id==t.id})}function d(t){n.allowedApplications=_.filter(n.allowedApplications,function(n){return n.id!=t.id})}function u(t){p(),n.allowedApplications.push({id:t.id,type:t.type})}n.isAccessAllowed=c,n.toggleAccess=s,i()}angular.module("c8y.parts.applications").controller("applicationAccessEditorCtrl",["$scope","c8yUser","c8yApplication",n])}(),function(){"use strict";function n(){return{restrict:"A",scope:{allowedApplications:"=",disabledEdit:"=?"},templateUrl:"administration_applications/views/applicationAccessEditor.html",controller:"applicationAccessEditorCtrl"}}angular.module("c8y.parts.applications").directive("applicationAccessEditor",n)}(),function(){"use strict";function n(n,t,a){function i(){t.all(_.map(r,function(n){return a.configureVisibility(n,"show")})).then(function(n){l.methods=n})}function e(n){l.wizardCtrl.data.chosenMethod=n,l.wizardCtrl.goTo(n.nextStep)}var l=this,r=[{id:"ZIP_FILE_UPLOAD",label:n("Upload ZIP file"),icon:"upload",nextStep:"upload"},{id:"EXTERNAL_APP_ADD",label:n("External application"),icon:"external-link-square",nextStep:"external"},{id:"CLONE_APP",label:n("Clone existing application"),icon:"copy",nextStep:"clone1"},{id:"CEP_RULE_UPLOAD",label:n("Upload custom CEP rule"),icon:"file-code-o",nextStep:"upload",showIf:["c8yApplication",function(n){return n.isAvailable({name:"apama-small",type:"MICROSERVICE"})}]}];_.assign(l,{$onInit:i,chooseMethod:e})}n.$inject=["gettext","$q","c8yUiUtil"],angular.module("c8y.parts.applications").component("appWizardMenuStep",{require:{wizardCtrl:"^c8yWizardStep"},templateUrl:"administration_applications/appWizard/appWizardMenuStep.html",controller:n,controllerAs:"vm"})}(),function(){"use strict";function n(n,t,a,i,e,l,r,o){function p(n){var t=void 0;return y.inProgress=!0,y.progress=0,s(n).then(function(a){return t=a,g(a,n)}).then(v).catch(function(n){t&&i.remove(t);var a=_.get(n,"data.message")||_.get(n,"data.error")||_.get(n,"errorMessage")||o("An error has occurred"),r=_.get(n,"data.details")||_.get(n,"errorDetails"),p=l.translate(a);e.danger(p,r)}).finally(function(){y.inProgress=!1,y.progress=100})}function s(n){var t={name:c(n),key:d(n),contextPath:d(n),manifest:{},resourcesUrl:"/"};return y.label=o("Creating application"),m(n).then(function(n){return t.type=n,t}).then(i.revertType).then(i.trySave).finally(function(){y.progress+=10})}function c(n){var t=n.name.split(".");return t.pop(),t.join(".")}function d(n){var t=c(n).toLowerCase();return u(t)}function u(n){return n.replace(/[^a-zA-Z0-9-_]/g,"")}function m(t){return f.isCepRuleUpload?n.when("APAMA_CEP_RULE"):r.getJsonData(t,{filename:"cumulocity.json"}).then(function(n){return _.get(n,"type")||(_.get(n,"apiVersion")?"MICROSERVICE":"HOSTED")}).catch(function(){return"HOSTED"})}function g(n,t){return y.label=o("Uploading file"),i.uploadArchive(n,t).progress(function(n){y.progress=10+n.loaded/n.total*90}).then(a.getResData).then(_.partial(i.setActiveArchive,n)).then(function(){return n})}function v(n){f.wizardCtrl.data.createdApp=n,f.wizardCtrl.goTo("success")}function h(){return f.isCepRuleUpload?["epl"]:["archive"]}var f=this,y={inProgress:!1,progress:0,label:null};_.assign(f,{processingStatus:y,createAppAndUploadArchive:p}),t.$watch(function(){return f.wizardCtrl.getCurrentStep()},function(n){"upload"===_.get(n,"stepId")&&(f.isCepRuleUpload="CEP_RULE_UPLOAD"===_.get(f.wizardCtrl.data,"chosenMethod.id"),f.supportedFileTypes=h())})}n.$inject=["$q","$scope","c8yBase","c8yApplication","c8yAlert","c8yServerMessages","c8yZip","gettext"],angular.module("c8y.parts.applications").component("appWizardUploadStep",{require:{wizardCtrl:"^c8yWizardStep"},templateUrl:"administration_applications/appWizard/appWizardUploadStep.html",controller:n,controllerAs:"vm"})}(),function(){"use strict";function n(n,t,a){function i(a){return a.manifest={},a.type="EXTERNAL",a=t.revertType(a),t.save(a).then(n.getResData).then(e)}function e(n){l.wizardCtrl.data.createdApp=n,l.wizardCtrl.goTo("success")}var l=this,r={required:a.getString("This field is required!"),maxlength:a.getString("Up to 120 characters allowed!"),url:a.getString("Valid URL required!")};_.assign(l,{invalid:n.invalidFormOrField,validationHints:_.partialRight(n.validationHints,r),save:i})}n.$inject=["c8yBase","c8yApplication","gettextCatalog"],angular.module("c8y.parts.applications").component("appWizardExternalStep",{require:{wizardCtrl:"^c8yWizardStep"},templateUrl:"administration_applications/appWizard/appWizardExternalStep.html",controller:n,controllerAs:"vm"})}(),function(){"use strict";function n(n){function t(){a()}function a(){n.listByVisibleLinks().then(i)}function i(n){r.existingApps=n}function e(n){r.wizardCtrl.data.appClone=r.wizardCtrl.data.appClone||{},r.wizardCtrl.data.appClone.srcApp=n,r.wizardCtrl.data.appClone.destApp=l(n),r.wizardCtrl.goTo("clone2")}function l(n){var t,a=0;do a++,t={name:[n.name,a].join("-"),key:[n.key,a].join("-"),contextPath:[n.contextPath,a].join("-")};while(_.find(r.existingApps,t));return t}var r=this;_.assign(r,{$onInit:t,choose:e})}n.$inject=["c8yApplication"],angular.module("c8y.parts.applications").component("appWizardClone1Step",{require:{wizardCtrl:"^c8yWizardStep"},templateUrl:"administration_applications/appWizard/appWizardClone1Step.html",controller:n,controllerAs:"vm"})}(),function(){"use strict";function n(n,t){function a(){return i.cloneInProgress=!0,t.clone(i.wizardCtrl.data.appClone.srcApp,i.wizardCtrl.data.appClone.destApp).then(function(n){i.wizardCtrl.data.createdApp=n,i.wizardCtrl.goTo("success")}).finally(function(){i.cloneInProgress=!1})}var i=this;_.assign(i,{host:n.host(),cloneInProgress:!1,clone:a})}n.$inject=["$location","c8yApplication"],angular.module("c8y.parts.applications").component("appWizardClone2Step",{require:{wizardCtrl:"^c8yWizardStep"},templateUrl:"administration_applications/appWizard/appWizardClone2Step.html",controller:n,controllerAs:"vm"})}(),function(){"use strict";function n(n,t,a,i){function e(){var n=_.defaults(l.wizardCtrl.data.smartApp,o);return n.key=[n.path,"appkey",String(Math.random()).substr(2)].join("-"),n.manifest={imports:["core/c8yBranding"]},n.manifest.uiCreated=!0,a.save(n).then(t.getResData).then(function(n){l.wizardCtrl.data.createdApp=n,l.wizardCtrl.goTo("success")})}var l=this,r={required:i.getString("This field is required!"),maxlength:i.getString("Up to 120 characters allowed!"),url:i.getString("Valid URL required!")},o={type:"HOSTED",resourcesUrl:"https://bitbucket.org/m2m/cumulocity-ui/raw/default/build",resourcesUsername:"afwifawfoijafa",resourcesPassword:"kjijfgknnoippk"};_.assign(l,{host:n.host(),invalid:t.invalidFormOrField,validationHints:_.partialRight(t.validationHints,r),create:e})}n.$inject=["$location","c8yBase","c8yApplication","gettextCatalog"],angular.module("c8y.parts.applications").component("appWizardSmartAppStep",{require:{wizardCtrl:"^c8yWizardStep"},templateUrl:"administration_applications/appWizard/appWizardSmartAppStep.html",controller:n,controllerAs:"vm"})}(),function(){"use strict";function n(n,t,a){function i(n){e.wizardCtrl.close(),t.open(a.getHref(n),"_blank")}var e=this;_.assign(e,{open:i,canOpenInBrowser:!1}),n.$watch(function(){return e.wizardCtrl.getCurrentStep()},function(n){"success"===_.get(n,"stepId")&&a.canOpenInBrowser(e.wizardCtrl.data.createdApp).then(function(n){e.canOpenInBrowser=n})})}n.$inject=["$scope","$window","c8yApplication"],angular.module("c8y.parts.applications").component("appWizardSuccessStep",{require:{wizardCtrl:"^c8yWizardStep"},templateUrl:"administration_applications/appWizard/appWizardSuccessStep.html",controller:n,controllerAs:"vm"})}(),function(){"use strict";function n(){function n(n,a,i,e){function l(n){var a;return n.match(t)?(r.$setValidity("c8yApplicationContextPath",!0),a=n):r.$setValidity("c8yApplicationContextPath",!1),a}var r=e;r.$parsers.unshift(l)}var a={require:"ngModel",link:n};return a}var t=/^\S+$/;angular.module("c8y.parts.applications").directive("c8yApplicationContextPath",n)}(),function(){"use strict";function n(n){var t;t='<div>\n  <div class="c8y-wizard-nav">\n      <i c8y-icon="copy"></i> <span translate>Clone application</span>\n  </div>\n  <hr style="margin:0">\n\n  <div class="modal-inner-scroll">\n    <div class="c8y-wizard-list-nav">\n      <a href="" class="list-group-item text-truncate" ng-repeat="app in vm.existingApps | orderBy:\'name | humanizeAppName\'" ng-click="vm.choose(app)">\n        <c8y-app-icon app="app" class="list-group-icon"></c8y-app-icon>\n        <span ng-bind="app | humanizeAppName"></span>\n      </a>\n    </div>\n  </div>\n\n  <div class="c8y-wizard-footer">\n    <button class="btn btn-default" ng-click="vm.wizardCtrl.goTo(\'menu\')" translate>Back</button>\n    <button class="btn btn-default" ng-click="vm.wizardCtrl.dismiss()" translate>Cancel</button>\n  </div>\n</div>\n',n.put("administration_applications/appWizard/appWizardClone1Step.html",t),n.put("/apps/administration/applications/appWizard/appWizardClone1Step.html",t),t='<div>\n  <div class="c8y-wizard-nav">\n    <i c8y-icon="copy"></i> <span translate>Clone application</span>\n  </div>\n  <hr style="margin:0">\n  <div class="c8y-wizard-body">\n    <h4 class="app-title flex-row flex-center">\n      <c8y-app-icon app="vm.wizardCtrl.data.appClone.srcApp" class="right-m-sm"></c8y-app-icon>\n      <span ng-bind="vm.wizardCtrl.data.appClone.srcApp | humanizeAppName"></span>\n    </h4>\n  </div>\n\n  <form name="appCloneForm" class="c8y-wizard-form">\n    <div>\n      <div class="form-group" ng-class="{\'has-error\': invalid(\'name\')}">\n        <label for="name"><span translate>Name</span> *</label>\n        <input type="text" class="form-control" id="name" name="name" ng-model="vm.wizardCtrl.data.appClone.destApp.name" required ng-maxlength="120" class="form-control" uib-tooltip="{{validationHints(\'name\')}}">\n      </div>\n\n      <div class="form-group" ng-class="{\'has-error\': invalid(\'key\')}">\n        <label for="key"><span translate>Application key</span> *</label>\n        <input type="text" class="form-control" id="key" name="key" ng-model="vm.wizardCtrl.data.appClone.destApp.key" ng-maxlength="120" required uib-tooltip="{{validationHints(\'key\')}}">\n      </div>\n\n      <div class="form-group" ng-class="{\'has-error\': invalid(\'contextPath\')}">\n        <label for="contextPath"><span translate>Path</span> *</label>\n        <div class="input-group">\n          <span class="input-group-addon">{{ctrl.host}}/apps/</span>\n          <input type="text" class="form-control" id="contextPath" name="contextPath" ng-model="vm.wizardCtrl.data.appClone.destApp.contextPath" required ng-maxlentgh="120" uib-tooltip="{{validationHints(\'contextPath\')}}" c8y-application-context-path>\n        </div>\n      </div>\n    </div>\n    <c8y-rectangle-spinner class="c8y-wizard-processing" ng-show="vm.cloneInProgress">\n    </c8y-rectangle-spinner>\n  </form>\n\n  <div class="c8y-wizard-footer">\n    <button class="btn btn-default" ng-click="vm.wizardCtrl.goTo(\'clone1\')" ng-disabled="vm.cloneInProgress" translate>Back</button>\n    <button class="btn btn-default" ng-click="vm.wizardCtrl.dismiss()" ng-disabled="vm.cloneInProgress" translate>Cancel</button>\n    <button class="btn btn-primary" ng-click="vm.clone(); processing = true;" ng-disabled="appCloneForm.$invalid || vm.cloneInProgress" translate>Clone</button>\n  </div>\n</div>\n',n.put("administration_applications/appWizard/appWizardClone2Step.html",t),n.put("/apps/administration/applications/appWizard/appWizardClone2Step.html",t),t='<div>\n  <div class="c8y-wizard-nav">\n    <i c8y-icon="external-link-square"></i> <span translate>External application</span>\n  </div>\n\n  <form name="externalAppForm" class="c8y-wizard-form">\n    <div class="form-group" ng-class="{\'has-error\': vm.invalid(externalAppForm.name)}">\n      <label for="name"><span translate>Name</span></label>\n      <input type="text" class="form-control" id="name" name="name" ng-model="vm.wizardCtrl.data.externalApp.name" required ng-maxlength="120" class="form-control" uib-tooltip="{{vm.validationHints(externalAppForm.name)}}">\n    </div>\n\n    <div class="form-group" ng-class="{\'has-error\': vm.invalid(externalAppForm.key)}">\n      <label for="key"><span translate>Application key</span></label>\n      <input type="text" class="form-control" id="key" name="key" ng-model="vm.wizardCtrl.data.externalApp.key" ng-maxlength="120" required uib-tooltip="{{vm.validationHints(externalAppForm.key)}}">\n    </div>\n\n    <div class="form-group" ng-class="{\'has-error\': vm.invalid(externalAppForm.externalUrl)}">\n      <label for="externalUrl"><span translate>External URL</span></label>\n      <input type="url" id="externalUrl" name="externalUrl" class="form-control" ng-model="vm.wizardCtrl.data.externalApp.externalUrl" required uib-tooltip="{{vm.validationHints(externalAppForm.externalUrl)}}">\n    </div>\n  </form>\n\n  <div class="c8y-wizard-footer">\n    <button class="btn btn-default" ng-click="vm.wizardCtrl.goTo(\'menu\')" translate>Back</button>\n    <button class="btn btn-default" ng-click="vm.wizardCtrl.dismiss()" translate>Cancel</button>\n    <button class="btn btn-primary" ng-click="vm.save(vm.wizardCtrl.data.externalApp)" ng-disabled="externalAppForm.$invalid" translate>Save</button>\n  </div>\n</div>\n',n.put("administration_applications/appWizard/appWizardExternalStep.html",t),n.put("/apps/administration/applications/appWizard/appWizardExternalStep.html",t),t='<div>\n  <div class="c8y-wizard-nav">\n    <span translate>Choose method</span>\n  </div>\n  <hr style="margin:0">\n  <div class="modal-inner-scroll">\n    <div class="c8y-wizard-list-nav">\n      <a href="" class="list-group-item" ng-repeat="method in vm.methods" ng-show="method.show" ng-click="vm.chooseMethod(method)">\n        <span class="list-group-icon">\n          <i c8y-icon="{{method.icon}}"></i>\n        </span>\n        <span ng-bind="method.label | translate"></span>\n      </a>\n    </div>\n\n  </div>\n  <div class="c8y-wizard-footer">\n    <button class="btn btn-default" ng-click="vm.wizardCtrl.dismiss()" translate>Cancel</button>\n  </div>\n</div>\n',n.put("administration_applications/appWizard/appWizardMenuStep.html",t),n.put("/apps/administration/applications/appWizard/appWizardMenuStep.html",t),t='<div>\n  <div class="c8y-wizard-nav">\n    <i c8y-icon="code"></i> <span translate>Create legacy smartapp</span>\n  </div>\n\n\n\n  <form name="smartAppForm" class="c8y-wizard-form">\n    <div class="form-group" ng-class="{\'has-error\': vm.invalid(smartAppForm.name)}">\n      <label for="name"><span translate>Name</span> *</label>\n      <input type="text" class="form-control" id="name" name="name" ng-model="vm.wizardCtrl.data.smartApp.name" required ng-maxlength="120" class="form-control" uib-tooltip="{{vm.validationHints(smartAppForm.name)}}">\n    </div>\n\n    <div class="form-group" ng-class="{\'has-error\': vm.invalid(smartAppForm.contextPath)}">\n      <label for="contextPath"><span translate>Path</span> *</label>\n      <div class="input-group">\n        <span class="input-group-addon">{{vm.host}}/apps/</span>\n        <input type="text" class="form-control" id="contextPath" name="contextPath" ng-model="vm.wizardCtrl.data.smartApp.contextPath" required ng-maxlentgh="120" uib-tooltip="{{vm.validationHints(smartAppForm.contextPath)}}" c8y-application-context-path>\n      </div>\n    </div>\n  </form>\n\n  <div class="c8y-wizard-footer">\n    <button class="btn btn-default" ng-click="vm.wizardCtrl.goTo(\'menu\')" translate>Back</button>\n    <button class="btn btn-default" ng-click="vm.wizardCtrl.dismiss()" translate>Cancel</button>\n    <button class="btn btn-primary" ng-click="vm.create()" ng-disabled="smartAppForm.$invalid" translate>Create</button>\n  </div>\n</div>\n',n.put("administration_applications/appWizard/appWizardSmartAppStep.html",t),n.put("/apps/administration/applications/appWizard/appWizardSmartAppStep.html",t),t='<div>\n  <div class="c8y-wizard-nav">\n    <span translate>Application created</span>\n  </div>\n\n  <div class="c8y-wizard-title">\n    <span ng-bind="vm.wizardCtrl.data.chosenMethod.label | translate"></span>\n  </div>\n\n  <div class="c8y-wizard-body">\n    <div class="text-center bottom-m">\n      <i c8y-icon="check-circle-o" class="text-success" style="font-size: 5em"></i>\n      <br/>\n      <span class="text-success" style="font-size: 20pt" translate>Application created</span>\n      <br/>\n      <span translate>\n        Application has been successfully created.\n      </span>\n    </div>\n  </div>\n\n  <div class="c8y-wizard-footer">\n    <button class="btn btn-default" ng-click="vm.wizardCtrl.close()" translate>Done</button>\n    <button class="btn btn-primary" ng-click="vm.open(vm.wizardCtrl.data.createdApp)" ng-if="vm.canOpenInBrowser">\n      <i c8y-icon="external-link"></i> <span translate>Open</span>\n    </button>\n  </div>\n</div>\n',n.put("administration_applications/appWizard/appWizardSuccessStep.html",t),n.put("/apps/administration/applications/appWizard/appWizardSuccessStep.html",t),t='<div>\n  <div class="c8y-wizard-nav">\n      <i c8y-icon="upload"></i>\n    <span translate>Upload {{vm.isCepRuleUpload ? \'.mon\' : \'ZIP\'}} file</span>\n  </div>\n\n  <div class="c8y-wizard-form">\n    <file-picker files="vm.wizardCtrl.data.appUpload.files" multiple="false" required="true" data-disabled="vm.processingStatus.inProgress" display-drop-zone="true" drop-zone-label="\'Upload file\' | translate" processing-status="vm.processingStatus" on-file-selected="vm.createAppAndUploadArchive(vm.wizardCtrl.data.appUpload.files[0].file)" allowed-file-type="vm.supportedFileTypes">\n    </file-picker>\n  </div>\n\n  <div class="c8y-wizard-footer">\n    <button class="btn btn-default" ng-click="vm.wizardCtrl.goTo(\'menu\')" translate>Back</button>\n    <button class="btn btn-default" ng-click="vm.wizardCtrl.dismiss()" translate>Cancel</button>\n  </div>\n</div>\n',n.put("administration_applications/appWizard/appWizardUploadStep.html",t),n.put("/apps/administration/applications/appWizard/appWizardUploadStep.html",t),t='<c8y-wizard on-dismiss="$dismiss()" on-close="$close()">\n  <header>\n    <div style="font-size: 62px">\n      <span c8y-icon="c8y-modules"></span>\n    </div>\n    <h4 class="text-uppercase" style="margin:0; letter-spacing: 0.15em" translate>\n      Add application\n    </h4>\n  </header>\n  <steps>\n    <c8y-wizard-step step-id="menu">\n      <app-wizard-menu-step></app-wizard-menu-step>\n    </c8y-wizard-step>\n    <c8y-wizard-step step-id="upload">\n      <app-wizard-upload-step></app-wizard-upload-step>\n    </c8y-wizard-step>\n    <c8y-wizard-step step-id="external">\n      <app-wizard-external-step></app-wizard-external-step>\n    </c8y-wizard-step>\n    <c8y-wizard-step step-id="clone1">\n      <app-wizard-clone1-step></app-wizard-clone1-step>\n    </c8y-wizard-step>\n    <c8y-wizard-step step-id="clone2">\n      <app-wizard-clone2-step></app-wizard-clone2-step>\n    </c8y-wizard-step>\n    <c8y-wizard-step step-id="smartApp">\n      <app-wizard-smart-app-step></app-wizard-smart-app-step>\n    </c8y-wizard-step>\n    <c8y-wizard-step step-id="success">\n      <app-wizard-success-step></app-wizard-success-step>\n    </c8y-wizard-step>\n  </steps>\n</c8y-wizard>\n',n.put("administration_applications/appWizard/wizard.html",t),n.put("/apps/administration/applications/appWizard/wizard.html",t),t='<div>\n\n  <label style="z-index:0" ng-show="marketApps.length > 0">\n    {{ \'Built-in applications\' | translate }}\n    <i c8y-icon="info-circle" uib-popover="{{\'Applications your tenant is subscribed to\' | translate}}" popover-append-to-body="true" popover-placement="right" popover-trigger="\'mouseenter\'">\n    </i>\n  </label>\n  <ul class="list-group" style="margin-bottom:20px">\n    <li class="list-group-item" ng-repeat="application in marketApps = (applications | filter:{availability:\'MARKET\'} | orderBy:\'name\')">\n        <input type="checkbox" ng-checked="isAccessAllowed(application)" ng-click="toggleAccess(application)" ng-disabled="disabledEdit">\n        {{application | humanizeAppName}}\n    </li>\n  </ul>\n\n  <label ng-show="privateApps.length > 0">\n    {{\'Custom applications\' | translate}}\n\n    <i c8y-icon="info-circle" uib-popover="{{\'Applications owned by your tenant\' | translate}}" popover-append-to-body="true" popover-placement="right" popover-trigger="\'mouseenter\'">\n    </i>\n  </label>\n  <ul class="list-group">\n    <li class="list-group-item" ng-repeat="application in privateApps = (applications | filter:{availability:\'PRIVATE\'} | orderBy:\'name\')">\n        <input type="checkbox" ng-checked="isAccessAllowed(application)" ng-click="toggleAccess(application)" ng-disabled="disabledEdit">\n        {{application | humanizeAppName}}\n    </li>\n  </ul>\n\n</div>\n',n.put("administration_applications/views/applicationAccessEditor.html",t),n.put("/apps/administration/applications/views/applicationAccessEditor.html",t),t='<c8y-breadcrumbs-set>\n  <c8y-breadcrumbs-item path="#applications" label="{{\'Own applications\' | translate}}" icon="c8y-modules"></c8y-breadcrumbs-item>\n</c8y-breadcrumbs-set>\n\n<div class="row">\n  <form name="applicationForm" novalidate class="col-md-8 col-sm-12 col-lg-6">\n    <div class="card">\n      <div class="card-block">\n        <!-- <h3 class="tab-title">Application Properties</h3> -->\n        <div class="row">\n          <div class="col-sm-5">\n            <div class="form-group">\n              <label>{{\'ID\' | translate}}</label>\n              <input type="text" ng-model="application.id" class="disabled form-control" disabled="disabled">\n            </div>\n          </div>\n          <div class="col-sm-7">\n            <div class="form-group" ng-class="{\'has-error\': invalid(\'name\')}">\n              <label>{{\'Name\' | translate}}</label>\n              <input type="text" ng-model="application.name" name="name" required ng-maxlength="120" class="form-control" uib-tooltip="{{validationHints(\'name\')}}">\n            </div>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="col-sm-5">\n            <div class="form-group" ng-class="{\'has-error\': invalid(\'key\')}">\n              <label>{{\'Application key\' | translate}}</label>\n              <input type="text" name="key" class="form-control" ng-model="application.key" ng-maxlength="120" ng-readonly="application.id" required uib-tooltip="{{validationHints(\'key\')}}">\n            </div>\n          </div>\n\n          <div class="col-sm-7">\n            <div class="form-group">\n              <label>{{\'Type\' | translate}}</label>\n              <div>\n                <div ng-if="application.id">\n                  <p class="form-control-static">\n                    <i c8y-icon="{{icon(application)}}"></i>\n                    <span ng-bind="typeLabel(application) | translate"/>\n                  </p>\n                </div>\n\n                <div class="btn-group" ng-show="isNew">\n                  <button type="button" class="btn btn-default btn-sm" ng-model="application.type" uib-btn-radio="\'HOSTED\'">\n                    <i c8y-icon="cloud"></i>\n                    <span ng-bind="typeLabel(\'HOSTED\') | translate"/>\n                  </button>\n                  <button type="button" class="btn btn-default btn-sm" ng-model="application.type" uib-btn-radio="\'REPOSITORY\'">\n                    <i c8y-icon="bitbucket"></i>\n                    <span ng-bind="typeLabel(\'REPOSITORY\') | translate"/>\n                  </button>\n                  <button type="button" class="btn btn-default btn-sm" ng-model="application.type" uib-btn-radio="\'EXTERNAL\'">\n                    <i c8y-icon="external-link-square"></i>\n                    <span ng-bind="typeLabel(\'EXTERNAL\') | translate"/>\n                  </button>\n                  <button type="button" class="btn btn-default btn-sm" ng-model="application.type" uib-btn-radio="\'MICROSERVICE\'">\n                    <i c8y-icon="microchip"></i>\n                    <span ng-bind="typeLabel(\'MICROSERVICE\') | translate"/>\n                  </button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div ng-switch="application.type">\n          <div ng-switch-when="HOSTED">\n            <div class="form-group" ng-class="{\'has-error\': invalid(\'contextPath\')}">\n              <label>{{\'Path\' | translate}}</label>\n              <div class="input-group">\n                <span class="input-group-addon">{{host}}/apps/</span>\n                <input type="text" name="contextPath" class="form-control" ng-model="application.contextPath" required ng-readonly="application.id" ng-maxlength="120" uib-tooltip="{{validationHints(\'contextPath\')}}">\n              </div>\n            </div>\n\n            <div class="form-group" ng-class="{\'has-error\': invalid(\'resourcesUrl\')}" ng-if="isNew">\n              <label>{{\'Archive\' | translate}}</label>\n              <i c8y-icon="question-circle" uib-tooltip="{{\'Compressed files must have an index.html at root. URLs in the web application can be relative.\' | translate}}"></i>\n              <div class="input-group">\n                <input type="text" readonly="readonly" required class="form-control" ng-model="file.name" placeholder="{{\'Select file\' | translate}}">\n                <span class="input-group-btn">\n                  <button class="btn btn-primary" ng-file-select="onFileSelect($files)">\n                    <span><i c8y-icon="upload"></i></span>\n                </button>\n                </span>\n              </div>\n            </div>\n          </div>\n\n          <div ng-switch-when="MICROSERVICE">\n            <div class="form-group" ng-class="{\'has-error\': invalid(\'contextPath\')}">\n              <label>{{\'Path\' | translate}}</label>\n              <div class="input-group">\n                <span class="input-group-addon">{{host}}/service/</span>\n                <input type="text" name="contextPath" class="form-control" ng-model="application.contextPath" required ng-readonly="application.id" ng-maxlength="120" uib-tooltip="{{validationHints(\'contextPath\')}}">\n              </div>\n            </div>\n          </div>\n\n          <div ng-switch-when="REPOSITORY">\n            <div class="form-group" ng-class="{\'has-error\': invalid(\'contextPath\')}">\n              <label>{{\'Path\' | translate}}</label>\n              <div class="input-group">\n                <span class="input-group-addon">{{host}}/apps/</span>\n                <input type="text" name="contextPath" class="form-control" ng-model="application.contextPath" required ng-readonly="application.id" ng-maxlength="120" uib-tooltip="{{validationHints(\'contextPath\')}}">\n              </div>\n            </div>\n\n            <div class="form-group" ng-class="{\'has-error\': invalid(\'resourcesUrl\')}">\n              <label>{{\'Server URL\' | translate}}</label>\n              <input type="url" name="resourcesUrl" class="form-control" ng-model="application.resourcesUrl" uib-tooltip="{{validationHints(\'resourcesUrl\')}}" required>\n            </div>\n\n            <div class="form-group">\n              <label translate>Username</label>\n              <input type="text" class="form-control" ng-model="application.resourcesUsername" c8y-autocomplete="off">\n            </div>\n\n            <div class="form-group">\n              <label translate>Password</label>\n              <input type="text" class="form-control" ng-model="application.resourcesPassword" c8y-autocomplete="off">\n            </div>\n\n          </div>\n\n          <div ng-switch-when="EXTERNAL">\n\n            <div class="form-group" ng-class="{\'has-error\': invalid(\'externalUrl\')}">\n              <label>{{\'External URL\' | translate}}</label>\n              <input type="url" name="externalUrl" class="form-control" ng-model="application.externalUrl" required uib-tooltip="{{validationHints(\'externalUrl\')}}">\n            </div>\n\n          </div>\n\n        </div>\n      </div>\n      <div class="card-footer separator">\n        <button class="btn btn-primary btn-form" ng-click="save(application)" ng-show="application" ng-disabled="!application.type || applicationForm.$invalid || applicationForm.$pristine" translate>\n          Save\n        </button>\n      </div>\n    </div>\n    <!-- /.card -->\n  </form>\n</div>\n',
n.put("administration_applications/views/detail.html",t),n.put("/apps/administration/applications/views/detail.html",t),t='<div ng-controller="applicationListCtrl">\n\n  <c8y-ui-action-bar-set>\n    <c8y-refresh-btn></c8y-refresh-btn>\n  </c8y-ui-action-bar-set>\n\n\n    <div class="c8y-empty-state text-center" ng-show="applications.length == 0">\n      <h1 class="c8y-icon c8y-icon-administration c8y-icon-duocolor"></h1>\n      <h3 translate>No applications found.</h3>\n      <p translate>Start by adding your first application.</p>\n      <p><button type="button" class="btn btn-primary" ng-click="addWithWizard()" translate>Add application</button></p>\n      <p c8y-guide-docs><small translate>Find out more on <a c8y-guide-href="concepts/applications/">User guide</a>.</small></p>\n    </div>\n\n  <div class="card-group interact-grid">\n    <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2" ng-show="applications.length > 0">\n      <a href="" class="card add-card" ng-click="addWithWizard()">\n        <i c8y-icon="plus-square" class="text-muted"></i><br/>\n        <translate>Add application</translate>\n      </a>\n    </div>\n    <div ng-repeat="app in applications|orderBy:\'name | humanizeAppName\'" class="col-xs-12 col-sm-4 col-md-3 col-lg-2">\n      <div class="card" ng-click="detail(app)">\n\n        <div class="dropdown card-actions" uib-dropdown ng-click="$event.stopPropagation()">\n          <button type="button" title="{{\'Settings\' | translate}}" class="dropdown-toggle c8y-dropdown" uib-dropdown-toggle>\n            <i c8y-icon="ellipsis-v"></i>\n          </button>\n          <ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu>\n            <li>\n              <a href="" ng-click="detail(app)">\n                <i c8y-icon="edit"></i> <translate>Edit</translate>\n               </a>\n            </li>\n            <li ng-if="!isCurrentApp(app)">\n              <a href="" ng-click="onClickDelete(app)">\n                <i c8y-icon="times"></i> <translate>Remove</translate>\n              </a>\n            </li>\n          </ul>\n        </div>\n\n\n        <div class="card-block text-center">\n          <h1 style="margin: 15px 0  5px; font-size: 42px"><c8y-app-icon app="app"></c8y-app-icon></h1>\n          <p ng-bind="app | humanizeAppName" style="word-wrap: break-word" class="e2e-appCardName"></p>\n          <p class="text-truncate">\n            <i c8y-icon="{{iconType(app)}}" class="text-muted"></i>\n            <small class="text-muted" ng-bind="path(app)"></small>\n          </p>\n        </div>\n\n\n        <div ng-if="canOpenInBrowser(app).result || canAddPlugin(app).result" class="card-actions-group" ng-click="$event.stopPropagation()">\n          <a ng-if="canOpenInBrowser(app).result" ng-href="{{getHref(app)}}" target="_blank">\n            <i c8y-icon="external-link"></i>\n            <translate>Open</translate>\n          </a>\n          <!-- TODO: build add plugin sequence (for now it could simply target the plugins tab on the application detail) -->\n          <button ng-if="canAddPlugin(app).result" ng-click="detailPlugins(app)">\n            <i c8y-icon="plug"></i>\n            <translate>Add plugin</translate>\n          </button>\n        </div>\n\n      </div>\n    </div>\n  </div>\n\n  <c8y-load-more></c8y-load-more>\n\n</div>\n',n.put("administration_applications/views/list.html",t),n.put("/apps/administration/applications/views/list.html",t),t='<h1 ng-controller="appDetailsTitleCtrl as ctrl" class="text-truncate">\n  <span ng-bind="ctrl.app | humanizeAppName"></span>\n</h1>\n',n.put("administration_applications/views/title.html",t),n.put("/apps/administration/applications/views/title.html",t)}angular.module("c8y.parts.applications").run(["$templateCache",n])}();