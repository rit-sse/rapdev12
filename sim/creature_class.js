//CreatureClass.js

var c_core = require("./creature_core.js");
var util = require("util");

//CreatureClass
module.exports = {
  CreatureClass: CreatureClass
}


function CreatureClass(name, speed, pos) {
  this.name = name;
  this.speed = speed;
  this.pos = pos;
  this.alive = false;
  this.canMove = false;
}

util.inherits(CreatureClass, c_core.CreatureCore);


CreatureClass.prototype.act = function(){
  // ACT CODE GOES HERE
};
