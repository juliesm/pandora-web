'use strict';
  
angular.module('pandora')

  .component('size', {
    // defines a two way binding in and out of the component
    bindings: {
      size: '=',
      activeRowIndex: '<',
      selectedRow: '=',
      activeLayer: '<',
      inactiveLayer: '<'
     },
    // Load the template
    templateUrl: "app/components/settings/sizeView.html",
    //Load the controller
    controller: 'SizeController'
  })

//Component Controller
.controller('SizeController', ["remoteService", function (remoteService) {
      var vm = this;

      vm.button = "Speichern";

      //vm.activeLayer;
      //vm.inactiveLayer;

 vm.$onInit = function() {    
            PBAuto.getParam(2,7,"X Scale",function(response) {
            vm.size = response.parameterValue * 100;
            console.log("The size is: ", vm.size);
            });
      }


      vm.changeButton = function() {
        vm.button = "Speichern";
      }

      vm.save = function(size) {
        // Save the value from input to PB
        if(vm.selectedRow == vm.activeRowIndex) {
          PBAuto.setParamInt(2,vm.activeLayer, "X Scale", size*10, false, false, false);
          PBAuto.setParamInt(2,vm.activeLayer,"Y Scale",size*10, false, false, false);

          // Get new image size
          PBAuto.getParam(2,vm.activeLayer,"X Scale",function(response) {
            vm.size = response.parameterValue * 100;
          });
        }
        else {
          PBAuto.setParamInt(2,vm.inactiveLayer, "X Scale", size*10, false, false, false);
          PBAuto.setParamInt(2,vm.inactiveLayer,"Y Scale",size*10, false, false, false);

          // Get new image size
          PBAuto.getParam(2,vm.inactiveLayer,"X Scale",function(response) {
            vm.size = response.parameterValue * 100;
          });
        }
        PBAuto.storeActiveToTime(2, 0, 0, 5, 0, false); 
        vm.button = "Gespeichert";
      }

}]);
