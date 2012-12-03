
function MapCreatures(viewport) {
	this.creatureClasses = {};
	this.viewport = viewport;
	this.creatures = [];
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
        
        all: [],

		walk: [],
        
        right: [],
        
        back: []
	}
    
    var yacht = this;

	// Load the walk animation from the appropriate sprite sheet
	$.ajax({ //You're aware we do this like 128 times, right?
		url: "assets/images/creatures/walk-" + classId + ".txt",
		dataType: "text",
		async: true, 
		success: function (data) {
			// Create animation frames from the file
			var lines = data.split('\n');
			$.each(lines, function(n, line) {
                yacht.creatureClasses[classId].loaded = true;
				var values = line.split(' ');
				animations.all.push({
					x: values[2],
					y: values[3],
					width: values[4],
					height: values[5]
				});
                animations.walk = animations.all.slice(0,32)
                animations.right = animations.all.slice(33,64)
                animations.back = animations.all.slice(65,96)
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
	var image = preloadImage("/assets/images/creatures/creature-" + creatureClass.id + ".png");

	this.creatureClasses[creatureClass.id] = creatureClass;
	this.creatureClasses[creatureClass.id].image = image;
    if (!this.creatureClasses[creatureClass.id].animations) {
        this.creatureClasses[creatureClass.id].animations = this.getAnimations(creatureClass.id);
    }

	this.creatureClasses[creatureClass.id] = creatureClass;
  this.addCreatureClassToSidebar(creatureClass);
};


/* Adds the creature class to the displayed list
 */
MapCreatures.prototype.addCreatureClassToSidebar = function(creatureClass){
  var content = 
    '<article class="creature-class" id="creature-class-' + creatureClass.id + '">' +
      '<img src="' + creatureClass.image.src +
        '" alt="' + creatureClass.name + '" class="creature-preview" />' +
      '<h1>' + creatureClass.name + '</h1>' +
      '<dl>' + 
        '<dt>Attack</dt><dd>' + creatureClass.attack + '</dd>' + 
        '<dt>Speed</dt><dd>' + creatureClass.speed + '</dd>' + 
      '</dl>' +
    '</article>';

	$("#creature-classes").append(content);
}


/* Loads all creature classes into the client
 */
MapCreatures.prototype.loadCreatureClassData = function(data) {
	for(var i = 0, len = data.length; i < len; i++ ){
    	this.addCreatureClass(data[i]);
	}
};


MapCreatures.prototype.loadCreatureData = function(data) {
    
    if (!this.loaded) {
        this.loaded = true;
    }
	for (var i=0;i<data.length;i++) {

		var creature = data[i];
        
		// Create the sprite and add it to the viewport
		var sprite = new Kinetic.Sprite({
			x: creature.row * TILE_SIZE,
			y: creature.col * TILE_SIZE, //these are backwards?
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
    
    if (this.creatureClasses[(this.creatures[creatureId].class)].loaded) {
        var lastx = sprite.getX()/TILE_SIZE;
        var lasty = sprite.getY()/TILE_SIZE;
        
        //Test effect
        //effect.Attack1(window.stage,x*TILE_SIZE,y*TILE_SIZE) 
        if (lasty>y) {
            sprite.setAnimation('back');
        } else if (lastx>=x) {
            sprite.setAnimation('right');
        } else {
            sprite.setAnimation('walk');
        }
    }
    sprite.transitionTo({
        x: (x * TILE_SIZE),
        y: (y * TILE_SIZE),
        duration: 0.75,
        callback: function() {
            sprite.setIndex(0);
            sprite.setAnimation('idle');
        }
    });

        this.viewport.draw();
    }
}


MapCreatures.prototype.applyOperation = function(action, data) {
	if (action == "move") {
		this.moveCreature(data.id, data.x, data.y);
	}
}
