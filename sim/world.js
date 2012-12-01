var tile = require('./tile')
module.exports = {
  World: World
}

function World() {
  this.size = 10;
  this.tiles = make2DArray(this.size);
  for(i in this.tiles){
    for(j = 0; j < this.size; j++){
      this.tiles[i][j] = new tile.Tile();
    }
  }
  this.creatures = {};
  this.uid_curr = 0;
}

World.prototype.getUIDs = function() {
  var uids = [];
  for(var uid in this) if (this.hasOwnProperty(uid)) {
    keys.push(uid);
  }
  return uids;
};

World.prototype.generateUID = function() {
	this.uid_curr++;
  return this.uid_curr;
};

World.prototype.addCreature = function(creature) {
	this.creatures[this.generateUID()] = creature;
};

World.prototype.getCreature = function(id) {
	return this.creatures[id];
};

World.prototype.destroyCreature = function(id) {
	delete this.creatures[id];
};

World.prototype.creatureGrid = function() {
  var grid = make2DArray(this.size);
  for(var i in grid){
    for(var j = 0; j < this.size; j++){
      grid[i][j] = null;
    }
  }

  for(var i in this.creatures){
    var creature = this.creatures[i];
    grid[creature.x][creature.y] = creature;
  }
  return grid;
}

//See http://stackoverflow.com/a/6495274/406249
function make2DArray(size) {
  size = size > 0 ? size : 0;
  var arr = [];

  while(size--) {
    arr.push([]);
  }

  return arr;
};

World.prototype.to_string = function(){
  var str_rep = "";
  var creature_grid = this.creatureGrid();
  for(i in this.tiles){
    for(j in this.tiles[i]){
      if(creature_grid[i][j]){
        str_rep += "c";
      } else {
        str_rep += this.tiles[i][j].to_string();
      }
    }
    str_rep += "\n";
  }
  return str_rep;
};