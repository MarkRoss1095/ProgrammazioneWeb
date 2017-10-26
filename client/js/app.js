var app = angular.module('ProgWeb', ['ngRoute']);

app .config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.when('/',{
    templateUrl: "view/home.html"
})

.when('/login',{
    templateUrl: "view/login.html"
})
.when('/registrazione',{
    templateUrl: "view/registration.html"
})

.otherwise({redirectTo: '/'})

})