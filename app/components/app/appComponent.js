'use strict';
  
angular.module('pandora')

  .component('app', {
    // defines a two way binding in and out of the component
    bindings: {
      media: '=',
      name: '=',
      myName: '='
     },
      // Load the template
    templateUrl: "app/components/app/appView.html",
    controller: 'AppController'
  })


  .controller('AppController', [function () {
}]);