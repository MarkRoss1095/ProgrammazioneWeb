var app = angular.module('ProgWeb',['ngRoute']);

app.config(function($routeProvider){
$routeProvider.when("/",{
    templateUrl: "./html/home.html"
})
.when("/about",{
    templateUrl: "./html/about.html"
})
.when("/contact",{
    templateUrl: "./html/contact.html"
})
.when("/login",{
    templateUrl: "./html/login.html"
})
.otherwise({redirectTo: '/'})
})