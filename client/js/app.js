var app = angular.module('ProgWeb', ['ngRoute']);

app.config(function ($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: "view/home.html"
        })

        .when('/login', {
            templateUrl: "view/login.html"
        })
        .when('/registrazione', {
            templateUrl: "view/registration.html",
            controller:"RegStudentCtrl"
        })

        .otherwise({ redirectTo: '/' })

})


.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
      if (!AuthService.isAuthenticated()) {
        if (next.name !== '/' ) {
          event.preventDefault();
          $state.go('/');
        }
      }
    });
  });