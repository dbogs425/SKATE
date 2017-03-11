angular.module("skateApp", ["ngRoute"])

.config(function($routeProvider){
    $routeProvider.when("/home", {
        templateUrl: "./views/home.html",
        controller: "homeController"
    })
    .when("/leaderboard", {
        templateUrl: "./views/leaderboard.html",
        controller: "leaderboardController"
    })
    .when("/dashboard", {
        templateUrl: "./views/login.html",
        controller: "loginController"
    })
    .when("/signup", {
        templateUrl: "./views/signup.html",
        controller: "signupController"
    })
    .when("/skate", {
        templateUrl: "./views/skate.html",
        controller: "skateController"
    })
    .otherwise({
        redirectTo: "/home"
    })
    })


.controller("mainController", ["$scope", function($scope){
    
}]);