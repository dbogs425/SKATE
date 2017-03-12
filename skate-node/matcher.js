

var setMatcher = function(players, setter){
    //pick out the setter, splice it, and randomly assign matcher to leftover array, and push setter back.
    var setter = players.splice(players.indexOf(setter), 1);
    var randomizer = Math.floor(Math.random()*players.length);
            players.push(setter[0]);
    return players[randomizer];
};

module.exports = setMatcher;
