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
            .state('/inside_home', {
                url: '/home',
                templateUrl: '../view/template/inside/home.html',
                controller:'HomeCtrl'
            })
            .state('/inside_about', {
                url: '/about',
                templateUrl: '../view/template/inside/about.html'
            })
            .state('/inside_contact', {
                url: '/contact',
                templateUrl: '../view/template/inside/contact.html'
            })
            .state('/profiloStudente', {
                url: '/student',
                templateUrl: '../view/template/inside/profiloStudente.html',
                controller:''
            })
            .state('/profiloAdmin', {
                url: '/admin',
                templateUrl: '../view/template/inside/profiloAdmin.html',
                controller:'profiloAdminCtrl'
            })
            .state('/profiloProf', {
                url: '/prof',
                templateUrl: '../view/template/inside/profiloProf.html'
            })
            .state('/inside_mat', {
                url: '/corsoMatematica',
                templateUrl: '../view/template/inside/corsomat.html',
                controller:'corsoCtrl'
            })
            .state('/inside_info', {
                url: '/corsoInformatica',
                templateUrl: '../view/template/inside/corsoinfo.html',
                controller:'corsoCtrl'
            })
            .state('/inside_chim', {
                url: '/corsoChimica',
                templateUrl: '../view/template/inside/corsochim.html',
                controller:'corsoCtrl'
            })
            .state('newcorso', {
                url: '/newcorso',
                templateUrl: '../view/template/inside/nuovocorso.html',
                controller:'corsoCtrl'
            })



    });

/*     //da verificarne l'utilizzo

    app.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
        console.log(AuthService.isAuthenticated())
        $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
        
          if (!AuthService.isAuthenticated()) {
              console.log('2')
            if (next.name !== '/' && next.name !== '/login' && next.name !== '/registrazione' && next.name !== '/outside_about' && next.name !== '/outside_contact') {
              event.preventDefault();
              $state.go('/');
            }
          }
        });
      }); 
*/