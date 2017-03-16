angular.module("skateApp")

.controller("skateController", ["$scope", "gameService", "$location", function ($scope, gameService, $location) {
    $scope.game = gameService.game;
    $scope.users = gameService.users;
    $scope.currentTrick = gameService.currentTrick;

    $scope.setUsers = function (set) {
        $scope.users = gameService.setUsers(set);
    }
   /* gameService.getUsers.then(function(response) {
        $scope.users = response.data;
    }); */
    $scope.verify = function () {
        $scope.game = [];
        var noice = gameService.verify($scope.users);
        if (noice == false) {
            $scope.message = "Please enter info for all players";
        } else {
            $scope.message = "";
            $location.path("/skate/start");
            $scope.game = gameService.makeGame();
        }
    }
    $scope.checkTrick = function (trick, index) {
        $scope.users[index].trickChecked = gameService.game.checkTrick(trick.trick, index);
    }
    $scope.landed = function(index){
        console.log($scope.currentTrick);
        gameService.game.landed(index, $scope.currentTrick);
    }
    $scope.notLanded = function(index){
        gameService.game.notLanded(index);
        console.log($scope.game);
    }
    $scope.matchLanded = function(index){
        gameService.game.matchLanded(index);
    }
    $scope.matchNotLanded = function(index){
        gameService.game.matchNotLanded(index);
    }
}]);