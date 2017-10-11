// create the module and name it scotchApp
var pwApp = angular.module('pwApp');


 // create the controller and inject Angular's $scope
  pwApp.controller('aboutController', function($scope) 
    {
        console.log('ciao sono il aboutController');
        // create a message to display in our view
        $scope.message = 'questo è il corso di Programmazione Web';
    });