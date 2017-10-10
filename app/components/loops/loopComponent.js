'use strict';
  
angular.module('pandora')

  .component('loops', {
    // defines a two way binding in and out of the component
    bindings: {
     },
    // Load the template
    templateUrl: "app/components/loops/loopView.html",
    controller: function( ) {
      var vm = this;

      vm.activeLoop1 = false;
      vm.activeLoop2 = true;
      vm.activeLoop3 = false;

      vm.clickLeft = function() {
        vm.activeLoop1 = true; 
        vm.activeLoop2 = false; 
        vm.activeLoop3 = false;

        PBAuto.assignResource(2, 2, 10, 2, false);

        //PBAuto.setParamInt(2, 8, 'Opacity', 0, false, false, false);
        //PBAuto.setParamInt(2, 7, 'Opacity', 0, false, false, false);

        //PBAuto.setSequenceTransportMode(2, 1, false); 

        PBAuto.storeActiveToTime(2, 0, 0, 5, 0, false); 
      }  

      vm.clickCenter = function() {
        vm.activeLoop1 = false; 
        vm.activeLoop2 = true; 
        vm.activeLoop3 = false;

        PBAuto.assignResource(2, 2, 10, 1, false);

        //PBAuto.setParamInt(2, 8, 'Opacity', 0, false, false, false);
        //PBAuto.setParamInt(2, 7, 'Opacity', 0, false, false, false);

        //PBAuto.setSequenceTransportMode(2, 1, false); 

        PBAuto.storeActiveToTime(2, 0, 0, 5, 0, false); 
      }  

      vm.clickRight = function() {
        vm.activeLoop1 = false; 
        vm.activeLoop2 = false; 
        vm.activeLoop3 = true;

        PBAuto.assignResource(2, 2, 10, 3, false);

        //PBAuto.setParamInt(2, 8, 'Opacity', 0, false, false, false);
        //PBAuto.setParamInt(2, 7, 'Opacity', 0, false, false, false);

        //PBAuto.setSequenceTransportMode(2, 1, false); 

        PBAuto.storeActiveToTime(2, 0, 0, 5, 0, false); 
      }  

      vm.fadeOut = function() {
        vm.activeLoop1 = false; 
        vm.activeLoop2 = false; 
        vm.activeLoop3 = true;

        /* TODO
        -----------
        * Make other sequences (media) fade out
        * to only show the loop bg
        */
        PBAuto.assignResource(2, 7, 100, 50, false);
        PBAuto.assignResource(2, 8, 100, 50, false);

        PBAuto.assignResource(2, 2, 10, 3, false);

        //PBAuto.setParamInt(2, 8, 'Opacity', 0, false, false, false);
        //PBAuto.setParamInt(2, 7, 'Opacity', 0, false, false, false);

        //PBAuto.setSequenceTransportMode(2, 1, false); 

        PBAuto.storeActiveToTime(2, 0, 0, 5, 0, false); 
        console.log("Cleared");
      }  
      


    }
  });