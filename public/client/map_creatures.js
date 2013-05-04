
function MapCreatures(viewport) {
	this.creatureClasses = {};
	this.viewport = viewport;
	this.creatures = [];
}

/**
 * Animation for the creatures moving around, is missing left
 * @param classId
 * @return {Object}
 */
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
    $('<article class="creature-class clearfix" id="creature-class-'
        + creatureClass.id + '" data-classId="' + creatureClass.id + '" draggable="true">' +
      '<img src="' + creatureClass.image.src +
        '" alt="' + creatureClass.name +
        '" class="creature-preview" draggable="false" />' +
      '<h1>' + creatureClass.name + '</h1>' +
      '<dl>' +
        '<dt>Attack</dt><dd>' + creatureClass.attack + '</dd>' +
        '<dt>Speed</dt><dd>' + creatureClass.speed + '</dd>' +
      '</dl>' +
    '</article>');

	$("#creature-classes").append(content);

}


/* Loads all creature classes into the client
 */
MapCreatures.prototype.loadCreatureClassData = function(data) {
	for(var i in data){
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


//MapCreatures.prototype.addCreature = function(creatureId, xTile, yTile, classId){
//
//    var creature = {}
//
//		// Create the sprite and add it to the viewport
//		var sprite = new Kinetic.Sprite({
//			x: xTile * TILE_SIZE,
//			y: yTile * TILE_SIZE,
//			height: TILE_SIZE,
//			width: TILE_SIZE,
//			image: this.creatureClasses[classId].image,
//			animations: this.creatureClasses[classId].animations,
//			animation: 'idle'
//		});
//		this.viewport.add(sprite);
//		sprite.start();
//
//		// Save the creature for later reference
//		creature.sprite = sprite;
//    creature.x = xTile;
//    creature.y = yTile;
//    creature.loaded = false;
//		this.creatures[creatureId] = creature;
//}


MapCreatures.prototype.moveCreature = function(creatureId, x, y) {


    if (this.creatureClasses[(this.creatures[creatureId].class)].loaded) {

        var sprite = this.creatures[creatureId].sprite;
        var lastx = sprite.getX()/TILE_SIZE;
        var lasty = sprite.getY()/TILE_SIZE;

        console.log(lastx + " : " + lasty + " :: " + x + " : " + y)
        //Test effect
        //effect.Death1(window.stage,x,y)
        if (y>lasty) {
            sprite.setAnimation('walk');
        } else if (lasty>y) {
            sprite.setAnimation('back');
        } else if (lastx>x) {
            sprite.setAnimation('right');
        } else {
            sprite.setAnimation('walk');
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

    sprite.transitionTo({

        x: (x * TILE_SIZE),
        y: (y * TILE_SIZE),
        duration: 0.75,
        callback: function() {
            //console.log("=======================================================");
            sprite.setIndex(0);
            sprite.setAnimation('idle');
        }
    });


}

MapCreatures.prototype.doAttackAnim = function(x,y) {
    effect.Attack1(window.stage,x,y);
}


MapCreatures.prototype.applyOperation = function(action, data) {
	if (action == "move") {
		this.moveCreature(data.id, data.x, data.y);
  } else if(action == "attack"){
        this.doAttackAnim(data.row,data.col);
  } else if(action == "new"){
    this.loadCreatureData([{
      class: data.classId,
      id: data.id,
      col: data.x,
      row: data.y,
      name: data.name
    }]);
  }
}
