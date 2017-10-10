'use strict';
  
angular.module('pandora')

  .component('live', {
    // defines a two way binding in and out of the component
    bindings: {
      media: '='
     },
    // Load the template
    templateUrl: "app/components/load/loadView.html",
    controller: 'LoadController'
  })


  .controller('LoadController', [function () {
       //Live Controller goes here
}]);