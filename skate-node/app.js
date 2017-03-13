var rs = require("readline-sync");
var Game = require("./game");
var setMatcher = require("./matcher");
var setSetter = require("./setter");
var prompt = require("./prompts");

var intro = rs.question("\nWelcome to SKATE.node! Hit 'Enter' to begin\n");
var playerAmt = rs.question("\nHow many players?\n");
var currentGame = new Game(playerAmt);

console.log(`\n${currentGame.setter.name} goes first!`);
console.log(`\n${currentGame.matcher.name} will match!\n`);

var isGameRunning = true;
while (isGameRunning) {
    var isTrickRepeated = true;
    while (isTrickRepeated){
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
