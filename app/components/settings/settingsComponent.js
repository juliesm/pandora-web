'use strict';
  
angular.module('pandora')

  .component('settings', {
    // defines a two way binding in and out of the component
    bindings: {
      media:'=',
      activeRowIndex: '=',
      selectedRow: '=',
      size: '=',
      position: '=',
      extension: '='
     },
    // Load the template
    templateUrl: "app/components/settings/settingsView.html"
  });
