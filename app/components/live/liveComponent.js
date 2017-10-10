'use strict';
  
angular.module('pandora')

  .component('live', {
    // defines a two way binding in and out of the component
    bindings: {
      media: '=',
      selectedRow: '=',
      isDisabled1: '=',
      isDisabled2: '='
     },
    // Load the template
    templateUrl: "app/components/live/liveView.html",
    controller: 'LiveController'
  })


  .controller('LiveController', [function () {
        var vm = this;
  // Add Live row and disable the particular button
    vm.isDisabled1 = false;
      // Add Live In 1
      vm.addLive1 = function(){
        vm.media.splice(vm.selectedRow+1, 0, { type: "L", dmxFolder: 100, dmxFile: 41, name: "Live In 1" });
        vm.selectedRow++;
        vm.isDisabled1 = true;
      }
      vm.isDisabled2 = false;
      // Add Live In 2
      vm.addLive2 = function(){
        vm.media.splice(vm.selectedRow+1, 0, { type:"L", dmxFolder: 100, dmxFile: 42, name: "Live In 2" });
        vm.selectedRow++;
        vm.isDisabled2 = true;
      }
}]);