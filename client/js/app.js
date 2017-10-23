var app = angular.module('ProgWeb', ['ngRoute']);

app .config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.when('/',{
    templateUrl: "view/home.html"
})
.when('/about',{
    templateUrl: "view/about.html"
})
.when('/contact',{
    templateUrl: "view/contact.html"
})
.when('/login',{
    templateUrl: "view/login.html"
})
.when('/registration',{
    templateUrl: "view/registration.html"
})
.when('/homeStudent',{
    templateUrl: "view/PaginaStudente.html"
})

.otherwise({redirectTo: '/'})

})