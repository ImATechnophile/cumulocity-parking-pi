(function () {
  'use strict';

angular.module('c8y.ui').run(runBlock);

function runBlock(c8yAppIconsList) {
  c8yAppIconsList['parking_pi'] = 'parking'
}
}());



