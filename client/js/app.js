var app = angular.module('ProgWeb', ['ngRoute']);

app.config(function($routeProvider){
$routeProvider.when("/",{
    templateUrl: "view/home.html"
})
.when("/about",{
    templateUrl: "view/about.html"
})
.when("/contact",{
    templateUrl: "view/contact.html"
})
.when("/login",{
    templateUrl: "view/login.html"
})
.otherwise({redirectTo: '/'})
})