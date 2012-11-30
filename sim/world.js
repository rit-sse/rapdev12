function World() {
  this.size = 9001;
  this.tiles = make2DArray(this.size);
  this.creatures = {};
}

World.prototype.addCreature = function(creature) {
	this.creatures[this.generateID()] = creature;
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
}
