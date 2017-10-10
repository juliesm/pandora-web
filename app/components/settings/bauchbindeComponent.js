'use strict';
  
angular.module('pandora')

  .component('bauchbinde', {
    // defines a two way binding in and out of the component
    bindings: {
      position:'='
     },
    // Load the template
    templateUrl: "app/components/settings/bauchbindeView.html",
    controller: 'BauchbindeController'
  })

//Component Controller
.controller('BauchbindeController', ["remoteService", function (remoteService) {
      var vm = this;  

      vm.button = "Speichern";


      // Check if selected row is the active row
      if(vm.selectedRow == vm.activeRowIndex) {

      PBAuto.getParam(2, vm.inactiveLayer,"X Pos", function(response) {

            /* TODO: find out how 'bauchbinde' is coded in PB Manager */
            vm.bauchbinde = response.parameterValue;

            /* TODO: If 'bauchbinde' == Heller then */
            if(vm.bauchbinde == 0) {
              vm.position = 'M';
            }
            /* TODO: If 'bauchbinde' == Bachmann then */
            else if(vm.position == -7.5) {
              vm.position.value = 'L';
            }
            /* TODO: If 'bauhcbinde' == ID3 (whatever) then */
            else if(vm.position == 7.5) {
              vm.position.value = 'R';
            }
            else {
              vm.bauchbinde = vm.bauchbinde;
            }
            
        });
    }
    else {

      PBAuto.getParam(2, vm.activeLayer,"X Pos", function(response) {

          /* 
          * TODO
          *---------------
          * Same as above goes for this case 
          */

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
            
        });

    }

      
      // Change the Save Button Text from "Saved" to "Save" when input (radio boxes) changes
      vm.changeButton = function() {
          vm.button = "Speichern";
        }


        // Save the changed from the position readio boxes
        // Change the Save Button Text from "Save" to "Saved"
        vm.save = function(position) {

          /*
          * TODO
          *----------------
          * Same as above goes for active/inactive layers
          */

          if(vm.selectedRow == vm.activeRowIndex) {
           if(vm.position == 'M') {
               PBAuto.setParamDouble(2, vm.inactiveLayer, "X Pos", 0.0, false, false, false);
            }
            else if(vm.position == 'L') {
               PBAuto.setParamDouble(2, vm.inactiveLayer, "X Pos", -7.5, false, false, false);
            }
            else if(vm.position == 'R') {
               PBAuto.setParamDouble(2, vm.inactiveLayer, "X Pos", 7.5, false, false, false);
            }
          }

          else {
            if(vm.position == 'M') {
               PBAuto.setParamDouble(2, vm.activeLayer, "X Pos", 0.0, false, false, false);
            }
            else if(vm.position == 'L') {
               PBAuto.setParamDouble(2, vm.activeLayer, "X Pos", -7.5, false, false, false);
            }
            else if(vm.position == 'R') {
               PBAuto.setParamDouble(2, vm.activeLayer, "X Pos", 7.5, false, false, false);
            }
          }


        PBAuto.storeActiveToTime(2, 0, 0, 5, 0, false); 

        vm.button = "Gespeichert";
        }


}]);
