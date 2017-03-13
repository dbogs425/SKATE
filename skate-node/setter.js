var setSetter = function(players){
    var randomizer = Math.floor((Math.random()*players.length));
    return players[randomizer];
};
 module.exports = setSetter;