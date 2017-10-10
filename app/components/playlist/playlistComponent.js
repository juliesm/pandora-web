"use strict";

  angular.module('pandora')

  // Component Initialisation
 .component('playlist', {
    // Binds variables to the scope
    bindings: {
      size: '<',
      position: '<',
      selectedRow: '=',
      activeRowIndex: '=',
      media: '=',
      isDisabled1: '=',
      isDisabled2: '=',
      imagesArray: '<',
      updateMedia: '<'
    },
    // Loads the component template
    templateUrl: "app/components/playlist/playlistView.html",
    // Loads the component controller
    controller: 'PlaylistController'
  })

 // Component Controller
 .controller('PlaylistController', ["remoteService", "$http", "localMediaService", function (remoteService, $http, localMediaService) {
      var vm = this;

      vm.testSize = null;
      vm.testHello = null;

      vm.getMedia = function() {
         // remoteService.getCount().then( function() {
                  remoteService.getMedia().then(
        function(res) {
          vm.media = res;
          //console.log(res);
        });
      PBAuto.assignResource(2, 7, 1, 1, false, false);
      PBAuto.storeActiveToTime(2, 0, 0, 5, 0, false); 

         // });
      }

  
  /* From the uploaded images, get the path and add it to the media array */

  /* Uncomment - will be needed later!
  vm.path = 'http://10.45.114.39:4100/static/images/uploads/' + data[i].filename;
            console.log("Path: ", vm.path);

            // Iterate over media array
            for(var i=0; i < vm.media.length; i++) {
              // If the file name of one object is equal to the filename of the image
              // Add the images url as a new value to the object
              if(vm.media.name == data[i].filename) {
                vm.media.imageUrl = vm.path;
              }
            console.log("Media: ", vm.media);
            }
    */

    /*
      remoteService.getImages()
        .then(function(response) {
            console.log(response.data);
        });
        */
      

       /* remoteService.getMedia()
          .then(function(response) {
            vm.info = response.data;
          });
          */

          remoteService.getSize()
            .then(function(response) {
              vm.playlistSize = response.data;
            });
      
      vm.media = localMediaService.media;
      //vm.media = [];

      vm.selectedRow = null;
      // Highlight the clicked row
      vm.setClickedRow = function(index){
        vm.selectedRow = index;
      }

      vm.activeRowIndex = 0;
      // Set the index of the active row
      vm.setActiveRowIndex = function(index) {
        vm.activeRowIndex = index;
      }

      vm.extension = null;
      // Get extension of filename 
      vm.getExtension = function(filename) {
        return vm.extension = filename.split('.').pop();
      }
      // Return icon name depending on file extension
      vm.myExtension = function(extension) {
        if(extension == 'avi')
          return 'video-camera';
        if(extension == 'png')
          return 'picture-o';
        else 
          return 'television'  
      }

      // Remove a row on click
      vm.removeRow = function(selectedRow){        
        vm.media.splice(selectedRow, 1 );
        // Make Live buttons clickable again, after Live has been removed
        if(vm.media.indexOf({ type: "L", name: "Live In 1", dmxFolderId: 100, dmxFileId: 41}) == -1) {
          vm.isDisabled1 = false;
        }
        if(vm.media.indexOf({ type: "L", name: "Live In 2", dmxFolderId: 100, dmxFileId: 42}) == -1) {
          vm.isDisabled2 = false;
        }
      }


    vm.$onInit = function() {
        jQuery(function($) {
          var oldIndex;
          $('table.sortable').sortable({
            items: ".playlist",
            axis: "y",
            handle: ".fa-arrows",
            start: function(e, ui) {
               // puts the old positions into array before sorting
                oldIndex = ui.item.index();
            },
            stop: function(event, ui) {

             console.log("old: " + oldIndex);
            // new Index because the ui.item is the node and the visual element has been reordered
            var newIndex = ui.item.index();
            if(oldIndex > newIndex) {
              vm.media.splice(newIndex, 0, vm.media[oldIndex]);
              vm.media.splice(oldIndex+1, 1);
            }
            else {
              vm.media.splice(newIndex+1, 0, vm.media[oldIndex]);
              vm.media.splice(oldIndex, 1);
            }

            console.log("New: " + newIndex);

            //ui.item.effect('highlight');

          },
          update: function(event,ui) {
            
          }
        });
      });
      };



}]);
