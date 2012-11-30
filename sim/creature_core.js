var NORTH = [0, 1];
var SOUTH = [0, -1];
var EAST = [1, 0];
var WEST = [-1, 0];

function CreatureCore(x, y) {
  this.x = x;
  this.y = y;
}

<<<<<<< HEAD
CreatureCore.prototype.move = function(direction) {
  x = x + direction[0];
  y = y + direction[1];
};

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
=======
CreatureCore.prototype.move = function(direction){
  
};
>>>>>>> 5d25b2f0f39857dd4eb10dec6b9cce1227b1b88f
