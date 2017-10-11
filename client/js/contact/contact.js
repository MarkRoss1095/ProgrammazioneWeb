// create the module and name it scotchApp
var pwApp = angular.module('pwApp');


 // create the controller and inject Angular's $scope
  pwApp.controller('contactController', function($scope) 
    {

        // create a message to display in our view
        $scope.message = 'daniele.fani@unicam.it';
    });