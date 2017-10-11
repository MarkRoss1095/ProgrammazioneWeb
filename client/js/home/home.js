// create the module and name it scotchApp
var pwApp = angular.module('pwApp');


 // create the controller and inject Angular's $scope
  pwApp.controller('mainController', ['$scope', 'CurrentUserService', function($scope, CurrentUserService) 
    {
     $scope.username;
     $scope.password;
        
     $scope.login = function()
       {
        CurrentUserService.login($scope.username, $scope.password)
           .then(function(data)
                {
                 console.log(data);
                 alert('utente loggato '+JSON.stringify(data));
                })
           .catch(function(err)
                 {
                  //vedo il codice d'errore sulla documentazione del server
                  // in base all'errore, lo gestisco
                  if (err.code == 'ERR_API_WRONG_PSW') 
                    { alert('password errata'); }
                  else if (err.code == 'ERR_API_NOT_FOUND') 
                    { alert('utente non trovato'); }           
                  else
                    { alert(err.message);}
            
                  // resetto (pulisco) le caselle di input
                  $scope.username=undefined;
                  $scope.password=undefined;
                 });
       }
        
        // create a message to display in our view
        $scope.message = 'Prova a cambiare questo messaggio';
    }]);