//CreatureCore.js

//Normal cardinal movement directions
var NORTH = [0, 1];
var SOUTH = [0, -1];
var EAST = [1, 0];
var WEST = [-1, 0];

//Node exports
module.exports ={
  CreatureCore: CreatureCore
}

//CreatureCore Class
//@param x (int) : x coordinate of the creature
//@param y (int) : y coordinate of the creature 
function CreatureCore(x, y) {
  this.x = x;
  this.y = y;
}

//Changes position based on given list of movements
//@param direction (array) : number of movements in the x and y directions
CreatureCore.prototype.move = function(direction) {
  x = x + direction[0];
  y = y + direction[1];
};

//Returns whether or not the creature is able to move in the given direction
//@param world (World) : the world the creature is in
//@param direction (array) : number of movements in the x and y direction
//
//@return boolean
CreatureCore.prototype.canMove = function(world, direction) {
  if(typeof world.tiles[y+direction[1]] == 'undefined') {
  	return false
  }
  else if(typeof world.tiles[y[x+direction[0]]] == 'undefined'){
  	return false
  }
  else {
  	return true
  }
};
