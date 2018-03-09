(function () {
  'use strict';

  angular
    .module('info')
    .controller('infoController', infoController);

  function infoController() {
    var vm = this;

    vm.text = 'hello, world';
  }
}());