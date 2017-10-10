'use strict';
  
angular.module('pandora')

  .component('play', {
    // defines a two way binding in and out of the component
    bindings: {
      selectedRow: '=',
      activeRowIndex: '=',
      media: '<',
      activeLayer: '=',
      inactiveLayer: '=',
      size: '='
     },
    // Load the template
    templateUrl: "app/components/play/playView.html",
    controller: 'PlayController'
     })

// Component Controller
 .controller('PlayController', ["remoteService", "$http", function (remoteService, $http) {

      var vm = this;

      vm.inactiveLayer = 7;
      vm.activeLayer = 8;

      // Get the active and inactive layers
      // Active: Layer that shows up, opacity is 255
      // Inactive: Layer that's currently hidden, opacity is 0
      PBAuto.getParam(2,7,'Opacity',function(res){
        //If opacity of 2.7 equals 0, inactiveLayer is 7
        if(res.parameterValue == 0) {
          vm.inactiveLayer = 7;
          vm.activeLayer = 8;
        }
        else {
          vm.inactiveLayer = 8;
          vm.activeLayer = 7;
        }
      });


      vm.assignRessource = function() {

        // Get opacity of layer 2.7
        var assignOpacity = PBAuto.getParam(2,7,'Opacity',function(res){

        // store opacity in variable
        var opacity = res.parameterValue;


        // If opacity of layer 2.7 equals 0, assign to 2.7
        if(opacity == 0) {
          vm.activeLayer = 7;
          vm.inactiveLayer = 8;

          PBAuto.assignResource(2, vm.activeLayer, vm.media[vm.activeRowIndex].dmxFolder, vm.media[vm.activeRowIndex].dmxFile, false, false);
          //PBAuto.setParamInt(2, vm.activeLayer, 'Opacity', 255, false, false, false);
          console.log("Assigned to 2." + vm.activeLayer);
        }
        // If opacity of layer 2.7 equals 255, assign to 2.8
        else {
          vm.activeLayer = 8;
          vm.inactiveLayer = 7;

          PBAuto.assignResource(2, vm.activeLayer, vm.media[vm.activeRowIndex].dmxFolder, vm.media[vm.activeRowIndex].dmxFile, false, false);
          //PBAuto.setParamInt(2, vm.inactiveLayer, 'Opacity', 255, false, false, false);
          console.log("Assigned to 2." + vm.activeLayer);
        }
        
        // Increment DmxFileId
        //dmxFileId = dmxFileId + 1;

        console.log("Folder Id: " + vm.media[vm.activeRowIndex].dmxFolder + ", FileId: " + vm.media[vm.activeRowIndex].dmxFile);


        clearSize();

        // Set transport mode to play
        PBAuto.setSequenceTransportMode(2, 1, false); 

        // Save all changes
        PBAuto.storeActiveToTime(2, 0, 0, 5, 0, false); 

      });
      }

      function clearSize() {
          PBAuto.setParamInt(2,vm.inactiveLayer, "X Scale", 1000, false, false, false);
          PBAuto.setParamInt(2,vm.inactiveLayer,"Y Scale", 1000, false, false, false);
      }

      vm.nextRow = function(activeRowIndex) {
        if(activeRowIndex < vm.media.length-1) {
          vm.activeRowIndex++;
          vm.selectedRow++;
        }
        else {
          vm.activeRowIndex = 0;
          vm.selectedRow = 0;
        }
      }
}]);
 


