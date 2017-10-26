angular.module('ProgWeb')

// DICHIARAZIONE DEI CONTROLLER

.controller('homeCtrl', function($scope,$http,AuthService) {
    $scope.user = {
      username: '',
      password: ''
    };
    
    $scope.login = function() {
        AuthService.login($scope.user).then(function(msg) {
            console.log(msg)}
            ,function(errmsg){
                console.log(errmsg)
            })
        
    }
    
  })