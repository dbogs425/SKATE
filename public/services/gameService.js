angular.module("skateApp")

.service("gameService", ["$http", function ($http) {
    var self = this;
    this.users = [];
    this.skate = "S.K.A.T.E.";
    this.tricksLanded = [];

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
    self.generatePlayers = function () {
        for (var i = 0; i < this.users.length; i++) {
            users[i].lettercount = 0;
            users[i].letters = this.skate.substring(0, (users[i].lettercount * 2));
            users[i].tricksLanded = [];
        }
        return this.users;
    }
    var setSetter = function (players) {
        var randomizer = Math.floor((Math.random() * players.length));
        return players[randomizer];
    };
    var setMatcher = function (players, setter) {
        //pick out the setter, splice it, and randomly assign matcher to leftover array, and push setter back.
        var setter = players.splice(players.indexOf(setter), 1);
        var randomizer = Math.floor(Math.random() * players.length);
        players.push(setter[0]);
        return players[randomizer];
    };
    var toggleSetter = function(setter){
        setter.isSetting = true;
    }
    var toggleMatcher = function(matcher){
        matcher.isMatching = true;
    }
    this.Game = function () {
        var gameSelf = this;
        this.players = self.generatePlayers();
        this.setter = setSetter(this.players);
        this.toggleSetter = toggleSetter(this.setter);
        this.matcher = setMatcher(this.players, this.setter);
        this.toggleMatcher = toggleMatcher(this.matcher);
        this.tricksLanded = [];
        this.trickSet = "";
        this.setLanded = false;
        this.matchLanded = false;
        this.addLetter = function (player) {
            player.letters = this.skate.slice(0, (player.lettercount * 2));
        };
        this.removePlayer = function (player) {
            var loser = self.players.splice(self.players.indexOf(player), 1);
        }
    }
/*function start(){
    var isGameRunning = true;
    while (isGameRunning) {
        var isTrickRepeated = true;
        while (isTrickRepeated) {
            currentGame.trickSet = rs.question(`\n${currentGame.setter.name}, What trick will you set?`);
            if (currentGame.tricksLanded.indexOf(currentGame.trickSet) !== -1) {
                console.log(`\n${currentGame.trickSet} has already been set and landed before! Set a new trick.`);
            } else {
                isTrickRepeated = !isTrickRepeated;
            };
        };
        currentGame.setLanded = rs.keyInYN("\nDid you land it???");
        //if setter succeeds ---> matcher attempts trick, push trick to landed in game object
        if (currentGame.setLanded) {
            currentGame.tricksLanded.push(currentGame.trickSet);
            console.log(`\n${prompt.genPositive()}! ${currentGame.matcher.name}, it's your turn to match!\n`);
            currentGame.matchLanded = rs.keyInYN("\nDid you land it???");
            //if matcher succeeds---> then setter must try again, new matcher is determined
            if (currentGame.matchLanded) {
                console.log(`\n${prompt.genPositive()}, ${currentGame.matcher.name}!\n`);
                currentGame.matcher = setMatcher(currentGame.players, currentGame.setter);
                currentGame.displayPlayers();
                isTrickRepeated = !isTrickRepeated;
            } else {
                //if matcher fails, then matcher gets a letter, check for win/lose con, and new matcher is randomly determined
                console.log(`\n${prompt.genNegative()}! ${currentGame.matcher.name} gets a letter!`);
                currentGame.addLetter(currentGame.matcher);
                console.log(currentGame.matcher.letters.toString());
                if (currentGame.matcher.letters.length == 5) {
                    currentGame.removePlayer(currentGame.matcher);
                    if (currentGame.players.length === 1) {
                        currentGame.displayPlayers();
                        console.log(`\n${currentGame.setter.name} wins!\n`);
                        isGameRunning = !isGameRunning;
                        break;
                    };
                };
                currentGame.matcher = setMatcher(currentGame.players, currentGame.setter);
                currentGame.displayPlayers();
                isTrickRepeated = !isTrickRepeated;
            };
        } else {
            //if setter fails---> matcher becomes setter, setter loses setter status, and new matcher is determined
            console.log(`\n${prompt.genNegative()}! ${currentGame.matcher.name} gets to attempt the next trick.\n`);
            currentGame.setter = currentGame.matcher;
            currentGame.matcher = setMatcher(currentGame.players, currentGame.setter);
            currentGame.setLanded = false;
            isTrickRepeated = !isTrickRepeated;
        };

    };
};*/
}]);