var Player = require("./player");
var setMatcher = require("./matcher");
var setSetter = require("./setter");
    
var generatePlayers = function(playerAmt){
    var players = [];
        for(var i = 0; i < playerAmt; i++){
            var player = new Player(i+1);
            players.push(player);
        }
    return players;
    };

var goesFirst = function(playerAmt){
    return Math.floor((Math.random()*playerAmt));
};

var Game = function(playerAmt){
    var self= this;
    this.playerAmt = playerAmt;
    this.players = generatePlayers(playerAmt);
    this.displayPlayers = 
        function(){
        console.log("\nPlayers remaining:")
        for(var i = 0; i < this.players.length; i++){
            console.log(`\n${this.players[i].name}\n${this.players[i].letters}`);
        };
    };
    this.setter = setSetter(this.players);
    this.matcher = setMatcher(this.players, this.setter);
    this.tricksLanded =[];
    this.trickSet = "";
    this.setLanded = false;
    this.matchLanded = false;
    this.addLetter = function(player){
        var skate = "SKATE";
        player.letters.push(skate[player.letters.length]);
    };
    this.removePlayer = function(player){
        console.log(`\n${player.name} is out of the game!`);
        var loser = self.players.splice(self.players.indexOf(player), 1);
    }
}

module.exports = Game;