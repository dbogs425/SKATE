var rs = require("readline-sync");

var PlayerConstr = function(playerNum){
    this.name = rs.question(`\nPlease enter name of player ${playerNum}\n`);
    this.letters = [];
    this.tricksLanded = [];
};

module.exports = PlayerConstr;