var MapCreatures = function MapCreatures(viewport){
	this.creatureClasses = {};
	this.viewport = viewport;
}

MapCreatures.prototype.tileColor = function(color){
	switch (color) {
		case 1:
			return 'yellow';
			break;
		case 2:
		default:
			return 'red';
			break;
	}
};


/* 
 * Add a creature to the internal store of classes and display its information
 * in the sidebar
 */
MapCreatures.prototype.addCreatureClass = function(creatureClass){
  this.creatureClasses[creatureClass.id] = creatureClass;
  $("#creature-classes").append("<li>" + creatureClass.name + "</li>");
};


MapCreatures.prototype.loadCreatureClassData = function(data){
	for(var i = 0, len = data.length; i < len; i++ ){
    this.addCreatureClass(data[i]);
	}
};

MapCreatures.prototype.loadCreatureData = function(data){
	for(var i in data){
		var creature = data[i];
		var creatureImage = new Kinetic.Circle({
			x: creature.x*TILE_SIZE,
			y: creature.y*TILE_SIZE,
			radius: TILE_SIZE,
			fill: this.tileColor(data[i].class)
		});
		this.viewport.add(creatureImage);
	}
	this.viewport.draw();
}
