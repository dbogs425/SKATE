angular.module("skateApp")

.service("gameService", ["$http", function ($http) {
    var self = this;
    this.users = [];
    this.skate = "S.K.A.T.E.";
    this.currentTrick = "";

    this.setUsers = function (set) {
        var players = Number(set.numPlayers);
        users = [];
        for (var x = 0; x < players; x++) {
            users.push({
                playerNumber: x
            })
        }
        return users;
    }
    this.verify = function (users) {
        this.users = users;
        for (var x = 0; x < users.length; x++) {
            if (!users[x].name) {
                return false;
            }
        }
        return true;
    }
    this.getReady = function () {

        var setter = Math.floor((Math.random() * users.length));
        users[setter].setTrick = true;
        users[setter].enterTrick = true;
        return users;
    }
    this.generatePlayers = function () {
        for (var i = 0; i < this.users.length; i++) {
            users[i].lettercount = 0;
            users[i].letters = this.skate.substring(0, (users[i].lettercount * 2));
            users[i].tricksLanded = [];
        }
        return this.users;
    }
    var setSetter = function (players) {
        var randomizer = Math.floor((Math.random() * players.length));
        players[randomizer].isSetting = true;
        return players[randomizer];
    };
    var setMatcher = function (players, setter) {
        //pick out the setter, splice it, and randomly assign matcher to leftover array, and push setter back.
        var x = players.indexOf(setter);
        var i = true;
        while (i) {
            var randomizer = Math.floor(Math.random() * players.length);
            if (randomizer !== x) {
                i = false;
            }
        }
        players[randomizer].isMatching = true;
        return players[randomizer];
    };
    this.Game = function () {
        var gameSelf = this;
        this.players = self.generatePlayers();
        this.setter = setSetter(this.players);
        this.matcher = setMatcher(this.players, this.setter);
        this.up = false;
        this.tricksLanded = ["hey", ""];
        this.trickSet = "";
        this.setLanded = false;
        this.matchLanded = false;
        this.trick = "";
        this.trickMessage = "";
        this.trickChecked = false;
        this.over = false;
        this.addLetter = function (player) {
            player.letters = this.skate.slice(0, (player.lettercount * 2));
        };
        this.removePlayer = function (player) {
            var loser = gameSelf.players.splice(gameSelf.players.indexOf(player), 1);
            if(gameSelf.players.length == 1){
                gameSelf.over = true;
            }
        }
        this.checkTrick = function (trick, index) {
            for (var i = 0; i < gameSelf.tricksLanded.length; i++) {
                if (gameSelf.tricksLanded[i] == trick) {
                    gameSelf.players[index].trickChecked = false;
                    gameSelf.players[index].trickMessage = "Shits been done son";
                    return false;
                }
            }
            gameSelf.players[index].trickSet = true;
            gameSelf.players[index].trickChecked = true;
            gameSelf.players[index].trickMessage = "";
            self.currentTrick = trick;
            return true;
        }
        this.toggleSetter = function (newSetter) {
            newSetter.isSetting = true;
            gameSelf.setter = newSetter;
        }
        this.toggleMatcher = function (matcher) {
            matcher.isMatching = true;
            gameSelf.matcher = matcher;
        }
        this.getUsers = function () {
            return gameSelf.players;
        }
        this.landed = function (index, trick) {
            gameSelf.players[index].trickChecked = false;
            gameSelf.players[index].tricksLanded.push(trick);
            console.log(trick);
            gameSelf.tricksLanded.push(trick);
            var matchNum = gameSelf.matcher.playerNumber;
            for (var i = 0; i < gameSelf.players.length; i++) {
                if (gameSelf.players[i].playerNumber == matchNum) {
                    gameSelf.players[i].up = true;
                }
            }
        }
        this.notLanded = function (index) {
            gameSelf.players[index].isSetting = false;
            gameSelf.players[index].trickChecked = false;
            gameSelf.setter = gameSelf.toggleSetter(gameSelf.matcher);
            var matchNum = gameSelf.matcher.playerNumber;
            for (var i = 0; i < gameSelf.players.length; i++) {
                if (gameSelf.players[i].playerNumber == matchNum) {
                    gameSelf.players[i].isMatching = false;
                }
            }
            gameSelf.matcher = setMatcher(gameSelf.players, gameSelf.matcher);
        }
        this.matchLanded = function (index) {
            gameSelf.players[gameSelf.setter.playerNumber].trickSet = false;
            gameSelf.players[index].up = false;
            var setNum = gameSelf.setter.playerNumber;
            console.log(setNum);
            for (var i = 0; i < gameSelf.players.length; i++) {
                if (gameSelf.players[i].playerNumber == setNum) {
                    gameSelf.players[i].isSetting = true;
                }
            }
            console.log(gameSelf.players);
            gameSelf.matcher = setMatcher(gameSelf.players, gameSelf.setter);
        }
        this.matchNotLanded = function (index) {
            gameSelf.players[gameSelf.setter.playerNumber].trickSet = false;
            gameSelf.players[index].lettercount++;
            if (gameSelf.players[index].lettercount <= 4) {
                gameSelf.players[index].letters = self.skate.slice(0, gameSelf.players[index].lettercount * 2);
                gameSelf.players[index].up = false;
                gameSelf.players[index].isMatching = false;
                gameSelf.matcher = setMatcher(gameSelf.players, gameSelf.setter);
            } else{
                gameSelf.removePlayer(gameSelf.players[index]);
            }
        }
    }
    this.makeGame = function () {
        self.game = new self.Game();
    }
}]);