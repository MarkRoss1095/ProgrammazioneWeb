var app = angular.module('ProgWeb', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    app.directive('back', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }]);

    $urlRouterProvider.otherwise('/');
    $locationProvider.hashPrefix('');

        $stateProvider
    
            // HOME STATES AND NESTED VIEWS ========================================
            .state('/', {
                url: '/',
                templateUrl: '../view/template/outside/home.html'
            })
           .state('/registrazione', {
                url: '/signup',
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
                templateUrl: '../view/template/outside/about.html',
                controller:'HomeCtrl'
            })
            .state('/outside_contact', {
                url: '/contact',
                templateUrl: '../view/template/outside/contact.html',
                controller:'HomeCtrl'
            })
            .state('/inside_home', {
                url: '/home',
                templateUrl: '../view/template/inside/home.html',
                controller:'HomeCtrl'
            })
            .state('/inside_about', {
                url: '/about',
                templateUrl: '../view/template/inside/about.html',
                controller:'HomeCtrl'
            })
            .state('/inside_contact', {
                url: '/contact',
                templateUrl: '../view/template/inside/contact.html',
                controller:'HomeCtrl',
            })
            .state('/profiloStudente', {
                url: '/student',
                templateUrl: '../view/template/inside/profiloStudente.html',
                controller:'profiloStudentCtrl'
            })
            .state('/profiloAdmin', {
                url: '/admin',
                templateUrl: '../view/template/inside/profiloAdmin.html',
                controller:'profiloAdminCtrl'
            })
            .state('/profiloProf', {
                url: '/prof',
                templateUrl: '../view/template/inside/profiloProf.html',
                controller:'profiloProfCtrl'
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
            .state('/inside_appelli', {
                url: '/Appelli',
                templateUrl: '../view/template/inside/appelli.html',
                controller:'AppCtrl'
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
            .state('editcorso', {
                url: '/editcorso',
                templateUrl: '../view/template/inside/editcorso.html',
                controller:'editCorsoCtrl'
            })
            .state('editAppello', {
                url: '/editAppello',
                templateUrl: '../view/template/inside/editAppello.html',
                controller:'EditAppCtrl'
            })
            .state('/inside_pianodistudi', {
                url: '/pianodistudi',
                templateUrl: '../view/template/inside/pianodistudi.html',
                controller:'PianoCtrl'
            })
            .state('/inside_ricerche', {
                url: '/ricerche',
                templateUrl: '../view/template/inside/ricerche.html',
                controller:'RicercheCtrl'
            })
            
            .state('/inside_appelli_stud', {
                url: '/AppelliStud',
                templateUrl: '../view/template/inside/appellistud.html',
                controller:'AppelliStudCtrl'
            })
            .state('/inside_edit_elenco', {
                url: '/EditIscritti',
                templateUrl: '../view/template/inside/editElenco.html',
                controller:'IscrittiCtrl'
            })
            .state('/inside_andamento', {
                url: '/andamento',
                templateUrl: '../view/template/inside/andamento.html',
                controller: 'AndamentoCtrl'
            })
            .state('/inside_addappelli', {
                url: '/AddAppelli',
                templateUrl: '../view/template/inside/AddAppello.html',
                controller:'AddAppCtrl'
            })
});

