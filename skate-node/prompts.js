var goodSlang = [
    "Dope",
    "Rad",
    "Awesome",
    "Sick, bro",
    "Stellar",
    "Wicked",
    "Epic"
];
var badSlang = [
    "Bummer",
    "Shit, son",
    "Damn dude",
    "Damn bro",
    "Shitty",
    "Ugh, so close",
    "Noooooo!",
    "Balls",
    "Why God, why?",
    "Come on, wtf",
    "WTF",
    "Dammit"
];



var slang = {
    genPositive: function () {
        var randomizer = Math.floor(Math.random() * goodSlang.length);
        return goodSlang[randomizer]
    },
    genNegative: function () {
        var randomizer = Math.floor(Math.random() * badSlang.length);
        return badSlang[randomizer]
    }
}

module.exports = slang;