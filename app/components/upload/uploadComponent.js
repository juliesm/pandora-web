"use strict";

  angular.module('pandora')

  // Component Initialisation
 .component('upload', {
    // Binds variables to the scope
    bindings: {
      imagesArray: '=',
      media: '='
    },
    // Loads the component template
    templateUrl: "app/components/upload/uploadView.html",
    // Loads the component controller
    controller: 'UploadController'
  })

 // Component Controller
 .controller('UploadController', ['$scope', 'remoteService', function ($scope, remoteService) {
      var vm = this;
      vm.imageCount = 1;
      vm.videoCount = 1;

      $scope.uploadFiles = function(element){

        var files = element.files;
        vm.filenames=[];
        vm.completeFiles=[];

        for (var i=0; i<files.length; i++){
            vm.filenames.push(files[i].name);   
            vm.completeFiles.push(files[i]);        
        }

        //console.log(vm.filenames);
        console.log("Uploaded Files: ", vm.completeFiles);  

      };
     

    vm.upload = function() {
        /*
        * Upload files to Pandoras Box
        * If file extension is png asign to picture, else to video folder
        */
        for (var i = 0; i<vm.filenames.length; i++){
          vm.extension = vm.filenames[i].split('.').pop();
            
            if(vm.extension == 'png') {
              PBAuto.addContentFromLocalNodeToPath("C:\\coolux\\content\\Brennpunkt\\ID01 Grafiken\\"+vm.filenames[i], "ID01 Grafiken", 1, vm.imageCount, false);
              console.log("Uploaded with Id: ", vm.imageCount);
              vm.imageCount++;
            }   
            else {
              PBAuto.addContentFromLocalNodeToPath("C:\\coolux\\content\\Brennpunkt\\ID04 Video\\"+vm.filenames[i], "ID04 Video", 4, vm.videoCount, false);
              console.log("Uploaded with Id: ", vm.videoCount);
              vm.videoCount++;
            } 
        }
        console.log("Image Count: ", vm.imageCount);
        //remoteService.getCount(vm.imageCount);
       
        // Show update button
        vm.uploaded = true;
        // Hide upload button
        vm.toUpload = false;

        var data = vm.imageCount;
        remoteService.getCount(data);

        /*
        * Upload Images to NodeJS Server to retrieve thumbnails
        */
        remoteService.sendImages(vm.completeFiles);


        //console.log("i = ", i);
        //console.log("count = ", count);
      }

      

      vm.modalVisible = false;

      vm.showModal = function() {
        vm.modalVisible = true;
      }


      // Hide update button
      vm.uploaded = false;
      // Show upload button
      vm.toUpload = true;


      /*
      * Hides popup box and retrieves media files from Manager
      */
      vm.update = function() {
        /* Get Media from remoteService */
          remoteService.getMedia().then(
            function(res) {
            vm.media = res;
            //console.log(res);
          });
        
        // Hide Popup
        vm.modalVisible = false;
        // Clear filename list
        vm.filenames = [];
        // Clear input
        document.getElementById("upload").value = "";
        // Set buttons back to default
        vm.uploaded = false;
        vm.toUpload = true;

      }

      // Popup Closing function
      vm.close = function() {
        vm.modalVisible = false;
      }


}]);
