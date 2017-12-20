angular.module('ProgWeb')

.service('AuthService', function($q, $http, API_ENDPOINT) {

    var LOCAL_TOKEN_KEY = 'test';
    var isAuthenticated = false;
    var authToken;
   
    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }
   
    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }
   
    function useCredentials(token) {
      isAuthenticated = true;
      authToken = token;
   
      // Set the token as header for your requests!
      $http.defaults.headers.common.Authorization = authToken;
    }
   
    function destroyUserCredentials() {
      authToken = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common.Authorization = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }


   // DA RIVEDERE//
   
   var registerAdmin = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/addAnotherAdmin', user).then(function(result) {
          if (result.data.success) {
            resolve(result.data.msg);
          } else {
            reject(result.data.msg);
          }
        });
      });
    }; 
  
    var registerstudent = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/addStudent', user).then(function(result) {
          if (result.data.success) {
            resolve(result.data.message);
          } else {
            reject(result.data.message);
          }
        });
      });
    };
  

        var registerprof = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/addProf', user).then(function(result) {
          if (result.data.success) {
            resolve(result.data.msg);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };
    

    var loginAdmin = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/loginAdmin', user).then(function(result) {
          if (result.data.success) {
            storeUserCredentials(result.data.token);
            resolve(result.data.success);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };

    var loginStudent = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/loginStudent', user).then(function(result) {
          if (result.data.success) {
            storeUserCredentials(result.data.token);
            resolve(result.data.success);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };

    var loginProf = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/loginProf', user).then(function(result) {
          if (result.data.success) {
            storeUserCredentials(result.data.token);
            resolve(result.data.success);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };
  
    var logout = function() {
      destroyUserCredentials();
    };

   /*  var back= function(){
      var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
      $location.path(prevUrl);
    } */
   
  
    loadUserCredentials();
  
    return {
      loginStudent: loginStudent,
      loginProf: loginProf,
      loginAdmin: loginAdmin,
      registerAdmin: registerAdmin,
      logout: logout,
      registerprof:registerprof,
      registerstudent:registerstudent,
      isAuthenticated: function() {return isAuthenticated;},
    };
  })
   
  .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })
   
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });