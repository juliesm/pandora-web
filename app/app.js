

(function() {

var pandora = angular.module('pandora', ['ngRoute', 'ui.slider']);


pandora.config(specifyRoutes);
        function specifyRoutes ($routeProvider) {
            $routeProvider
            	.when('/', {templateUrl: 'app/templates/start/start.html' })
                .when('/brennpunkt', {templateUrl: 'app/templates/brennpunkt/brennpunkt.html' })
                .when('/brextra', {templateUrl: 'app/templates/brennpunkt/brextra.html' })
                .when('/themenabend', {templateUrl: 'app/templates/brennpunkt/themenabend.html' })
                .when('/kontrovers', {templateUrl: 'app/templates/kontrovers/kontrovers.html' });
        }


})();

        



