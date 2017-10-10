'use strict';
  
angular.module('pandora')

  .component('install', {
    // defines a one way binding input
    bindings: {
    },
    // Load the template
    templateUrl: "app/components/install/installView.html",
    controller: function( ) {
      /* TODO
      --------- 
      Add the function to start and shutdown PB and for a havarie scenario
      */

      var vm = this;

      vm.showMain = function() {
        $('#main-menu').addClass('show-menu');
        $('install').removeClass('show-menu');
      }

    }
  });