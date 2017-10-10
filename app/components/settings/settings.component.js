(function(){
  'use strict';
  var pandora = angular.module('pandora');

  pandora.component('menuBar', {
    // defines a two way binding in and out of the component
    bindings: {
      brand:'<'
     },
    // Load the template
    templateUrl: '/app/components/settings/settingsView.html',
    controller: function () {
    // A list of menus
      this.menu = [{
        name: "Home",
        component: "home"
      }, {
        name: "About",
        component: "about"
      }, {
        name: "Contact",
        component: "contact"
      }];
    }
  });
})();