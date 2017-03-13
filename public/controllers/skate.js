angular.module("skateApp")

.controller("skateController", ["$scope", "gameService", "$location", function ($scope, gameService, $location) {

    $scope.users = gameService.users;
    
    $scope.setUsers = function (set) {
        $scope.users = gameService.setUsers(set);
    }
    $scope.verify = function () {
        $scope.game = [];
        var noice = gameService.verify($scope.users);
        if (noice == false) {
            $scope.message = "Please enter info for all players";
        } else {
            $scope.message = "";
            $location.path("/skate/start");
            $scope.game = new gameService.Game();
            console.log($scope.game);
            $scope.users = $scope.game.players;
            console.log($scope.users);
            $scope.run();
        }
    }
    $scope.run = function(){
        console.log("hi");
    }
}]);