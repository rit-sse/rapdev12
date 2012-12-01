//CircleCreature.js

var c_class = require("./creature_class.js")

module.exports = {
  CircleCreature : CircleCreature
}

function CircleCreature(name, speed, pos) {
  CreatureClass.call(this, name, speed, pos);
}

CircleCreature.inherits(c_class);


