var MapCreatures = function MapCreatures(viewport){
	this.creatureClasses = {};
	this.viewport = viewport;
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
		var animations = {
			idle: [{
				x: 0,
				y: 0, 
				width: TILE_SIZE, 
				height: TILE_SIZE
			}], 
			walk: []
		}

		//Create the animation objects from the sprite map
		for(j = 0; j < 32; j++){
			animations.walk.push({
				x: 64*j,
				y: 0,
				width: TILE_SIZE,
				height: TILE_SIZE
			})
		}

		//Create the sprite and add it to the viewport
		var creatureImage = new Kinetic.Sprite({
			x: creature.x*TILE_SIZE,
			y: creature.y*TILE_SIZE,
			height: TILE_SIZE,
			width: TILE_SIZE,
			image: this.creatureClasses[data[i].class],
			animations: animations,
			animation: 'idle'
		});
		this.viewport.add(creatureImage);
	}
	this.viewport.draw();
}