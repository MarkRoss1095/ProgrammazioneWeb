var pwApp = angular.module('pwApp');




pwApp.service('CurrentUserService', ['$q','$http', function ($q, $http) 
  {   // initialization
    console.log('ciao sono il CurrentUserService');
    var self = this;
    this.utenteLoggato;  // conterrà l'utente loggato


 
 
/* ========================================
    FUNCTIONS
================================================*/
    
   
   
   
    this.login = function(name, psw)
	    {
         var deferred = $q.defer(); 
        
         $http.post('http://localhost:8080/api/authenticate',
                    {'name':name, 'password':psw})
             .success(function(data) 
                 {
                  self.utenteLoggato = data;      // mi salvo l'utente corrente
                  deferred.resolve(data);
                 })
             .error(function(err, code) 
                 {  
                  self.utenteLoggato = undefined; // resetto l'utente
                  deferred.reject(err);
                 });
        return deferred.promise; 
        }      
    
    
    /* quando dovrò fare richieste, e mi serve il token dell'utente,
     lo riprendo con: self.utenteLoggato.token    */
        
        
    
  }])

.run(function(CurrentUserService) {});