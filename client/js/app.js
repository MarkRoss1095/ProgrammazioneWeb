var app = angular.module('ProgWeb', ['ngRoute'],);

//STO DEFINENDO LE ROUTE PER ANGULAR //
app.config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.when('/',{
    templateUrl: "view/home.html",
    controller: "homeCtrl"
}) 

.when('/about',{
    templateUrl: "view/about.html"
})
.when('/contact',{
    templateUrl: "view/contact.html"
})
.when('/login',{
    templateUrl: "view/login.html",
    controller:"homeCtrl"
})
.when('/registration',{
    templateUrl: "view/registration.html"
})
.when('/homestudente',{
    templateUrl: "view/PaginaStudente.html"
})
.otherwise({redirectTo: '/'})

})


  