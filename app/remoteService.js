"use strict";

angular.module('pandora')

.factory('remoteService', ['$http', '$q', function($http, $q) {


var remoteService = {};

        
        remoteService.getSize = function() {
        	return $http.get('http://10.45.114.39:4100/size');
        };

        remoteService.getPosition = function() {
        	return $http.get('http://10.45.114.39:4100/position');
        };

        
        remoteService.getImage = function() {
        	return $http.get('http://10.45.114.39:4100/image');
        };

        remoteService.setPlay = function() {
        	return $http.get('http://10.45.114.39:4100/play');
        }

        
        remoteService.upload = function() {
        	return $http.get('http://10.45.114.39:4100/load');
        }
        

        remoteService.assignMedia = function() {
        	return $http.get('http://10.45.114.39:4100/play2');
        }

        // Retrieve data from Python
        remoteService.getMedia = function() {
                var deferred = $q.defer();
                $http.get('http://10.45.114.39:4100/info').then(
                        function(res) {
                                console.log("Worked!!!!!", res);
                                // Convert received data into an array of objects
                                var mediaArray = res.data.split("\n");
                                var media = [];
                                for (var i=0; i<mediaArray.length; i++) {
                                // To prevent error from last, empty object
                                        if(mediaArray[i] != []) {
                                                // Parse each object to JSON
                                                var mediaObj = JSON.parse(mediaArray[i]);
                                                var mediaUrl = 'http://10.45.114.39:4100/static/images/uploads/' + mediaObj.resourceName;
                                                // Push dmxIDs, resource names and file extensions to the overall media array
                                                media.push({imageUrl: mediaUrl, dmxFolder: mediaObj.dmxFileId, dmxFile: mediaObj.dmxFolderId, name: mediaObj.resourceName}); 
                                        }
                                }
                                console.log(media);
                                deferred.resolve(media);
                        },
                        function(res) {
                                console.log("Nopyy.", res);
                        });
                        return deferred.promise;
        }

        // Get images from folder public/static/images
        remoteService.getImages = function() {
                return $http.get('http://10.45.114.39:4100/upload');
        }

        // GET count
        remoteService.getCount = function(data) {
            return $http.get('http://10.45.114.39:4100/count?count='+data, {"count:": data})
                    .then(function(res) {
                        console.log("Success!!");
                    },
                    function(error) {
                        console.log("Error", error);
                    });
        }
        
        // Upload (POST) images 
        remoteService.sendImages = function(files) {
                var deferred = $q.defer();
                var data = {};

                var fd = new FormData();

                for (var i=0; i<files.length; i++) {
                        fd.append('file', files[i]);
                }

                $http({
                        method: 'POST',
                        url: 'http://10.45.114.39:4100/upload',
                        headers: {'Content-Type': undefined},
                        data: fd,
                                transformRequest: function(data, headersGetterFunction) {
                                        return data;
                        }
                }).success(function(data, status) {
                        console.log('Worked :-)', data, status);
                        deferred.resolve(data); // send response data back to component controller
                })
                .error(function(data, status) {
                        console.log("Nope.", data, status);
                });
                return deferred.promise;
        }

        

return remoteService;

}]);