'use strict';
  
angular.module('pandora')

  .component('preview', {
    // defines a one way binding input
    bindings: {
      media:'<',
      activeRowIndex:'<'
     },
    // Load the template
    templateUrl: "app/components/settings/previewView.html",
    controller: function( ) {
    }
  });