function MapCreatures(viewport) {
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
	var image = new Image();
	image.src = "../assets/images/" + creatureClass.id + ".png";
	image.height = TILE_SIZE;
	image.width = TILE_SIZE;
	this.creatureClasses[creatureClass.id] = creatureClass;
	this.creatureClasses[creatureClass.id].assets.image = image;
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
			image: this.creatureClasses[data[i].class].assets.image,
			animations: animations,
			animation: 'idle'
		});
		this.viewport.add(creatureImage);
	
}
	this.viewport.draw();
}
