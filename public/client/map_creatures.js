
function MapCreatures(viewport) {
	this.creatureClasses = {};
	this.viewport = viewport;
	this.creatures = {};
}


MapCreatures.prototype.getAnimations = function(classId) {
	var animations = {
		// Default to an idle animation of the first frame
		idle: [{
			x: 0,
			y: 0,
			width: TILE_SIZE,
			height: TILE_SIZE
		}],

		walk: []
	}

	// Load the walk animation from the appropriate sprite sheet
	$.ajax({
		url: "assets/images/creatures/walk-" + classId + ".txt",
		dataType: "text",
		async: false,
		success: function (data) {
			// Create animation frames from the file
			var lines = data.split('\n');
			$.each(lines, function(n, line) {
				var values = line.split(' ');
				animations.walk.push({
					x: values[2],
					y: values[3],
					width: values[4],
					height: values[5]
				});
			});
		}
	});

	return animations;
}


/*
 * Add a creature to the internal store of classes and display its information
 * in the sidebar
 */
MapCreatures.prototype.addCreatureClass = function(creatureClass) {
	// Load the class assets
	var image = new Image();
	image.src = "/assets/images/creatures/creature-" + creatureClass.id + ".png";
	image.height = TILE_SIZE;
	image.width = TILE_SIZE;

	this.creatureClasses[creatureClass.id] = creatureClass;
	this.creatureClasses[creatureClass.id].image = image;
	this.creatureClasses[creatureClass.id].animations = this.getAnimations(creatureClass.id);

	// Add the creature to the side bar
	$("#creature-classes").append("<li>" + creatureClass.name + "</li>");
};


MapCreatures.prototype.loadCreatureClassData = function(data) {
	for(var i = 0, len = data.length; i < len; i++ ){
    	this.addCreatureClass(data[i]);
	}
};


MapCreatures.prototype.loadCreatureData = function(data) {
	for (var i in data) {
		var creature = data[i];

		// Create the sprite and add it to the viewport
		var sprite = new Kinetic.Sprite({
			x: creature.x * TILE_SIZE,
			y: creature.y * TILE_SIZE,
			height: TILE_SIZE,
			width: TILE_SIZE,
			image: this.creatureClasses[creature.class].image,
			animations: this.creatureClasses[creature.class].animations,
			animation: 'idle'
		});
		this.viewport.add(sprite);
		sprite.start();

		// Save the creature for later reference
		creature.sprite = sprite;
		this.creatures[creature.id] = creature;
	}

	this.viewport.draw();
}


MapCreatures.prototype.moveCreature = function(creatureId, x, y) {
	var sprite = this.creatures[creatureId].sprite;
	sprite.setX(x * TILE_SIZE);
	sprite.setY(y * TILE_SIZE);

	this.viewport.draw();
}


MapCreatures.prototype.applyOperation = function(action, data) {
	if (action == "move") {
		this.moveCreature(data.id, data.x, data.y);
	}
}
