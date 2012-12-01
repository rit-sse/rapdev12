var c_class = require("./cricle_creature");

var c1 = c_class.CircleCreature();
var c2 = c_class.CircleCreature();

for (var i=0; i<10; i++){
	console.log("Turn %d", i)
	c1.act();
	c2.act();
}

console.log("End Simulation");