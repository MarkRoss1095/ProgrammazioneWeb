var app = angular.module('ProgWeb',['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider ,$locationProvider) {

    $urlRouterProvider.otherwise('/');
    $locationProvider.hashPrefix('');

        $stateProvider
    
            // HOME STATES AND NESTED VIEWS ========================================
            .state('/', {
                url: '/',
                templateUrl: '../view/template/outside/home.html'
            })
           .state('/registrazione', {
                url: '/singup',
                templateUrl: '../view/template/outside/registration.html',
                controller:'registrazioneCtrl'
            })
            .state('/login', {
                url: '/login',
                templateUrl: '../view/template/outside/login.html',
                controller:'loginCtrl'
            })
            .state('/outside_about', {
                url: '/about',
                templateUrl: '../view/template/outside/about.html'
            })
            .state('/outside_contact', {
                url: '/contact',
                templateUrl: '../view/template/outside/contact.html'
            })
            .state('/home', {
                url: '/home',
                templateUrl: '../view/template/home.html',
                controller:'homeCtrl'
            })
            



    });

    //da verificarne l'utilizzo

    app.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
        $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
          if (!AuthService.isAuthenticated()) {
            if (next.name !== '/' && next.name !== '/login' && next.name !== '/registrazione' && next.name !== '/about' && next.name !== '/contact') {
              event.preventDefault();
              $state.go('/');
            }
          }
        });
      });