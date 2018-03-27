/* core_csvExporter 9.3.0 2018-03-26T16:24:39+00:00 796b68a031b1+ (release/9.3.0) tip */
!function(){angular.module("c8y.csvExporter",["ngCsv"])}(),function(){"use strict";function e(e){var t="c8y.csvExporter.csvConfig",n=[{label:e("comma - ,"),value:","},{label:e("semi-colon - ;"),value:";"},{label:e("tab - \\t"),value:"\t"}],a=[{label:e("point - ."),value:"."},{label:e("comma - ,"),value:","}],r=["utf-8"],i={fieldSeperator:n[0].value,decimalSeperator:a[0].value,textDelimiter:'"',charset:r[0]};return{configKey:t,fieldSeperators:n,decimalSeperators:a,charsets:r,defaultConfig:i}}angular.module("c8y.csvExporter").factory("csvExporterSvc",["gettext",e])}(),function(){function e(e,t,n,a){function r(){e.csvExporter={},i()}function i(){var a=t.getLocal(o);e.csvExporter.config=a||n.defaultConfig}function l(n){t.setLocal(o,n),e.$close()}function s(){e.$dismiss()}var o=n.configKey;r(),e.title=a("Export as CSV"),e.saveConfig=l,e.dismiss=s,e.charsets=n.charsets,e.fieldSeperators=n.fieldSeperators,e.decimalSeperators=n.decimalSeperators}angular.module("c8y.csvExporter").controller("csvExporterCtrl",["$scope","c8yUtil","csvExporterSvc","gettext","gettextCatalog",e])}(),function(){"use strict";function e(e,t){function n(n,a){a.bind("click",function(){e.open({templateUrl:"core_csvExporter/views/csvExporter.html",controller:"csvExporterCtrl",scope:n})}),n.headers=function(){var e=_.cloneDeep(n.virginHeaders());return _.map(e,function(e,n){return 0===n&&"ID"===e&&(e="id"),t.getString(e)})}}return{restrict:"A",link:n,scope:{fileName:"@c8yFilename",data:"&c8yData",virginHeaders:"&c8yHeaders",ngClick:"&"}}}angular.module("c8y.csvExporter").directive("c8yCsvExporter",["$uibModal","gettextCatalog",e])}(),!function(e){angular.module("ngCsv.config",[]).value("ngCsv.config",{debug:!0}).config(["$compileProvider",function(e){angular.isDefined(e.urlSanitizationWhitelist)?e.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/):e.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/)}]),angular.module("ngCsv.directives",["ngCsv.services"]),angular.module("ngCsv.services",[]),angular.module("ngCsv",["ngCsv.config","ngCsv.services","ngCsv.directives","ngSanitize"]),angular.module("ngCsv.services").service("CSV",["$q",function(e){var t="\r\n",n="\ufeff",a={"\\t":"\t","\\b":"\b","\\v":"\v","\\f":"\f","\\r":"\r"};this.stringifyField=function(e,t){return"locale"===t.decimalSep&&this.isFloat(e)?e.toLocaleString():"."!==t.decimalSep&&this.isFloat(e)?e.toString().replace(".",t.decimalSep):"string"==typeof e?(e=e.replace(/"/g,'""'),(t.quoteStrings||e.indexOf(",")>-1||e.indexOf("\n")>-1||e.indexOf("\r")>-1)&&(e=t.txtDelim+e+t.txtDelim),e):"boolean"==typeof e?e?"TRUE":"FALSE":e},this.isFloat=function(e){return+e===e&&(!isFinite(e)||Boolean(e%1))},this.stringify=function(a,r){var i=e.defer(),l=this,s="",o="",c=e.when(a).then(function(e){if(angular.isDefined(r.header)&&r.header){var a,c;a=[],angular.forEach(r.header,function(e){this.push(l.stringifyField(e,r))},a),c=a.join(r.fieldSep?r.fieldSep:","),o+=c+t}var d=[];angular.isArray(e)?d=e:angular.isFunction(e)&&(d=e()),angular.forEach(d,function(e,n){var a,i,s=angular.copy(d[n]);i=[],angular.forEach(s,function(e){this.push(l.stringifyField(e,r))},i),a=i.join(r.fieldSep?r.fieldSep:","),o+=n<d.length?a+t:a}),r.addByteOrderMarker&&(s+=n),s+=o,i.resolve(s)});return"function"==typeof c.catch&&c.catch(function(e){i.reject(e)}),i.promise},this.isSpecialChar=function(e){return void 0!==a[e]},this.getSpecialChar=function(e){return a[e]}}]),angular.module("ngCsv.directives").directive("ngCsv",["$parse","$q","CSV","$document","$timeout",function(t,n,a,r,i){return{restrict:"AC",scope:{data:"&ngCsv",filename:"@filename",header:"&csvHeader",txtDelim:"@textDelimiter",decimalSep:"@decimalSeparator",quoteStrings:"@quoteStrings",fieldSep:"@fieldSeparator",lazyLoad:"@lazyLoad",addByteOrderMarker:"@addBom",ngClick:"&",charset:"@charset"},controller:["$scope","$element","$attrs","$transclude",function(e,t,r){function i(){var t={txtDelim:e.txtDelim?e.txtDelim:'"',decimalSep:e.decimalSep?e.decimalSep:".",quoteStrings:e.quoteStrings,addByteOrderMarker:e.addByteOrderMarker};return angular.isDefined(r.csvHeader)&&(t.header=e.$eval(e.header)),t.fieldSep=e.fieldSep?e.fieldSep:",",t.fieldSep=a.isSpecialChar(t.fieldSep)?a.getSpecialChar(t.fieldSep):t.fieldSep,t}e.csv="",angular.isDefined(e.lazyLoad)&&"true"==e.lazyLoad||angular.isArray(e.data)&&e.$watch("data",function(){e.buildCSV()},!0),e.getFilename=function(){return e.filename||"download.csv"},e.buildCSV=function(){var l=n.defer();return t.addClass(r.ngCsvLoadingClass||"ng-csv-loading"),a.stringify(e.data(),i()).then(function(n){e.csv=n,t.removeClass(r.ngCsvLoadingClass||"ng-csv-loading"),l.resolve(n)}),e.$apply(),l.promise}}],link:function(t,n){function a(){var n=t.charset||"utf-8",a=new Blob([t.csv],{type:"text/csv;charset="+n+";"});if(e.navigator.msSaveOrOpenBlob)navigator.msSaveBlob(a,t.getFilename());else{var l=angular.element("<a></a>");l.attr("href",e.URL.createObjectURL(a)),l.attr("download",t.getFilename()),l.attr("target","_blank"),r.find("body").append(l),i(function(){l[0].click(),l.remove()},null)}}n.bind("click",function(){t.buildCSV().then(function(){a()}),t.$apply()})}}}])}(window,document),function(){"use strict";function e(e){var t;t='<div class="modal-header" ng-show="title">\n  <h3>{{title | translate}}</h3>\n</div>\n<div class="modal-body">\n  <div>\n    <form class="form-horizontal" name="csvExporterForm">\n      <div class="form-group">\n        <label class="control-label col-sm-3">{{\'Field separator\' | translate}}</label>\n        <div class="col-sm-9">\n          <div class="c8y-select-wrapper">\n            <select ng-options="s.value as (s.label | translate) for s in fieldSeperators" class="form-control" ng-model="csvExporter.config.fieldSeperator"></select>\n            <span></span>\n          </div>\n        </div>\n      </div>\n      <div class="form-group">\n        <label class="control-label col-sm-3">{{\'Decimal separator\' | translate}}</label>\n        <div class="col-sm-9">\n          <div class="c8y-select-wrapper">\n            <select ng-options="s.value as (s.label | translate) for s in decimalSeperators" class="form-control" ng-model="csvExporter.config.decimalSeperator"></select>\n            <span></span>\n          </div>\n        </div>\n      </div>\n      <div class="form-group">\n        <label class="control-label col-sm-3">{{\'Charset\' | translate}}</label>\n        <div class="col-sm-9">\n          <div class="c8y-select-wrapper">\n            <select ng-options="charset for charset in charsets" class="form-control" ng-model="csvExporter.config.charset"></select>\n            <span></span>\n          </div>\n        </div>\n      </div>\n      <div class="form-group">\n        <label class="control-label col-sm-3">{{\'Options\' | translate}}</label>\n        <div class="col-sm-9 form-inline">\n          <label class="c8y-checkbox right-m">\n            <input type="checkbox" ng-model="csvExporter.config.quoteStrings"><span></span> <span translate>Quote strings</span>\n          </label>\n          <label class="c8y-checkbox">\n            <input type="checkbox" ng-model="csvExporter.config.addBom"> <span></span> <span translate>Add Byte Order Mask (for Windows)</span>\n          </label>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n<div class="modal-footer">\n  <button class="btn btn-default" ng-click="dismiss()" translate>Close</button>\n\n  <button class="btn btn-primary" ng-csv="data()" filename="{{fileName}}" csv-header="headers()" field-separator="{{csvExporter.config.fieldSeperator}}" decimal-separator="{{csvExporter.config.decimalSeperator}}" text-delimiter="{{csvExporter.config.textDelimiter}}" ng-attr-quote-strings="{{csvExporter.config.quoteStrings || undefined }}" ng-attr-add-bom="{{csvExporter.config.addBom || undefined }}" charset="{{ csvExporter.config.charset }}" ng-click="saveConfig(csvExporter.config)">\n      <translate>Download</translate>\n  </button>\n\n</div>',e.put("core_csvExporter/views/csvExporter.html",t),e.put("/apps/core/csvExporter/views/csvExporter.html",t)}angular.module("c8y.csvExporter").run(["$templateCache",e])}();