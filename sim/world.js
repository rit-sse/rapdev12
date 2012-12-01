function World() {
  this.size = 9001;
  this.tiles = make2DArray(this.size);
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
}