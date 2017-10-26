angular.module('ProgWeb')

// DICHIARAZIONE DEI CONTROLLER

.controller('HomeCtrl', function($scope,$http,AuthService) {
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

  .controller('RegStudentCtrl', function($scope,$http,AuthService,$location,$window) {
    $scope.user = {
        username: '',
        password: '',
        email: '',
        name: '',
        surname: '',
        state: '',
        city: '',
        andress:'',
        bod:'',
        gender:'',
        matricola:'',
        codfacolta:'',
        phone:'',

     };
    
     $scope.addStudent = function() {    
        AuthService.registerstudent($scope.user).then(function(msg) {
            $location.path("home")
            $window.alert(msg)
        },function(errMsg) {
          $window.alert(errMsg)
          })
        
      }
    
    
    
  })