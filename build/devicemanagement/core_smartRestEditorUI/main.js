/* core_smartRestEditorUI 9.3.0 2018-03-26T16:26:16+00:00 796b68a031b1+ (release/9.3.0) tip */
!function(){"use strict";function e(e,t,r,i,a){var n="smart-rest-templates",o=i+"/views",c=a("SmartREST templates"),l={parent:a("Device types"),name:c,path:n,icon:"file-code-o",priority:1e3},s="/"+n,m={templateUrl:o+"/list.html"},p=s+"/:smartRestTemplateId",u=[{name:a("Messages"),icon:"arrow-circle-right",templateUrl:o+"/requests.html",priority:3e3},{name:a("Responses"),icon:"arrow-circle-left",templateUrl:o+"/responses.html",priority:2e3},{name:a("CSV preview"),icon:"file-code-o",templateUrl:o+"/preview.html",priority:1e3}],d={data:["$q",function(e){return e.when({templateUrl:o+"/title.html"})}]},h={};h[s]=[m],h[p]=u;var f={};f[p]=d,e.addNavigation(l),_.each(h,function(e,r){_.each(e,function(e){t.when(r,e)})}),_.each(f,function(e,t){r.addTitle(p,e)})}e.$inject=["c8yNavigatorProvider","c8yViewsProvider","c8yTitleProvider","smartRestEditorPluginPath","gettext"],angular.module("c8y.smartRestEditorUI",["c8y.smartRestEditor"]).config(e)}(),function(){"use strict";function e(e){}angular.module("c8y.smartRestEditorUI").run(["$templateCache",e])}();