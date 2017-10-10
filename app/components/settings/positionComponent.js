'use strict';
  
angular.module('pandora')

  .component('position', {
    // defines a two way binding in and out of the component
    bindings: {
      position: '=',
      activeLayer: '<',
      inactiveLayer: '<',
      activeRowIndex: '<',
      selectedRow: '<',
     },
    // Load the template
    templateUrl: "app/components/settings/positionView.html",
    controller: 'PositionController'
  })

//Component Controller
.controller('PositionController', ["remoteService", function (remoteService) {
      var vm = this;  

      vm.button = "Speichern";


      //vm.activeLayer;
      //vm.inactiveLayer;

    vm.$onInit = function() {    
            PBAuto.getParam(2, 7,"X Pos", function(response) {

              vm.position = response.parameterValue;

              if(vm.position == 0) {
                vm.position = 'M';
              }
              else if(vm.position == -7.5) {
                vm.position.value = 'L';
              }
              else if(vm.position == 7.5) {
                vm.position.value = 'R';
              }
              else {
               vm.position = vm.position;
              }
              console.log("Init position: ", vm.position);
            
            });
      }

    
      
      // Change the Save Button Text from "Saved" to "Save" when input (radio boxes) changes
      vm.changeButton = function() {
          vm.button = "Speichern";
        }


        // Save the changed from the position readio boxes
        vm.save = function(position) {

          if(vm.selectedRow == vm.activeRowIndex) {
           if(position == 'M') {
               PBAuto.setParamDouble(2, vm.activeLayer, "X Pos", 0.0, false, false, false);
            }
            else if(position == 'L') {
               PBAuto.setParamDouble(2, vm.activeLayer, "X Pos", -7, false, false, false);
            }
            else if(position == 'R') {
               PBAuto.setParamDouble(2, vm.activeLayer, "X Pos", 7, false, false, false);
            }

            // Get new position
            PBAuto.getParam(2, vm.activeLayer,"X Pos", function(response) {

            vm.position = response.parameterValue;

            if(vm.position == 0) {
              vm.position = 'M';
            }
            else if(vm.position == -7) {
              vm.position.value = 'L';
            }
            else if(vm.position == 7) {
              vm.position.value = 'R';
            }
            else {
              vm.position = vm.position;
            }
            console.log("New position for the active layer is ", vm.position);
            
            });
          }

          if(vm.selectedRow != vm.activeRowIndex) {
            if(position == 'M') {
               PBAuto.setParamDouble(2, vm.inactiveLayer, "X Pos", 0.0, false, false, false);
            }
            else if(position == 'L') {
               PBAuto.setParamDouble(2, vm.inactiveLayer, "X Pos", -7, false, false, false);
            }
            else if(position == 'R') {
               PBAuto.setParamDouble(2, vm.inactiveLayer, "X Pos", 7, false, false, false);
            }


            // Get new position
            PBAuto.getParam(2, vm.inactiveLayer,"X Pos", function(response) {

            vm.position = response.parameterValue;

            if(vm.position == 0) {
              vm.position = 'M';
            }
            else if(vm.position == -7) {
              vm.position.value = 'L';
            }
            else if(vm.position == 7) {
              vm.position.value = 'R';
            }
            else {
              vm.position = vm.position;
            }
            console.log("New position for the inactive layer is ", vm.position);
            
          });

          }

        PBAuto.storeActiveToTime(2, 0, 0, 5, 0, false); 

        // Change the Save Button Text from "Save" to "Saved"
        vm.button = "Gespeichert";
        }


}]);
