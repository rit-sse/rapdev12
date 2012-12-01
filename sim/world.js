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
}

World.prototype.getUIDs = function() {
  var uids = [];
  for(var uid in this) if (this.hasOwnProperty(uid)) {
    keys.push(uid);
  }
  return uids;
};

World.prototype.generateUID = function() {
	var uids = this.getUIDs;
	var uid = 0;
	while(uids.indexOf(uid) > -1) {
		uid++;
	}
	return uid;
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
  for(i in this.tiles){
    for(j in this.tiles[i]){
      str_rep += this.tiles[i][j].to_string();
    }
    str_rep += "\n";
  }
  return str_rep;
};