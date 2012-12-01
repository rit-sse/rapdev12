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
}

MapCreatures.prototype.loadCreatureClassData = function(data){
	for(var i in data){
		var creatureClass = data[i];
		var image = new Image();
		image.src = "../assets/images/" + creatureClass.id + ".png";
		image.height = TILE_SIZE;
		image.width = TILE_SIZE;
		this.creatureClasses[creatureClass.id] = image
	}
}

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