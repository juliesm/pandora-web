'use strict';
  
angular.module('pandora')

  .component('nosettings', {
    // defines a two way binding in and out of the component
    bindings: {
      activeRowIndex: '<',
      selectedRow: '<',
      media:'<'
     },
    // Load the template
    templateUrl: "app/components/settings/noSettingsView.html"
  });
