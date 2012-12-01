//SquareCreature.js

var c_class = require("./creature_class.js");

module.exports = { 
    SquareCreature: SquareCreature
}  

function SquareCreature(name, speed, pos){
    CreatureClass.call(this, name, speed, pos);
}

SquareCreature.inherits(c_class);

SquareCreature.prototype.act = function(){

//Act code goes here

}
