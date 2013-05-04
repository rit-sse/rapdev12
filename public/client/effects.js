
function effect() {
    //#Yacht
    
}
TILE_SIZE = 64;

/**
 * Gets the different move animations for the creatures, is missing left
 *
 * @param image_loc
 * @return {Object}
 */
effect.getAnimations = function(image_loc) {
	
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
	$.ajax({
		url: "assets/images/"+image_loc+".txt",
		dataType: "text",
		async: true, 
		success: function (data) {
			// Create animation frames from the file
			var lines = data.split('\n');
			$.each(lines, function(n, line) {
				var values = line.split(' ');
				animations.all.push({
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

var attack1_anim    = effect.getAnimations("misc_animations/attack1");
var death1_anim     = effect.getAnimations("misc_animations/death1");
var effect01_anim   = effect.getAnimations("misc_animations/effect01");
var effect2_anim    = effect.getAnimations("misc_animations/effect2");
var zzz_anim        = effect.getAnimations("misc_animations/zzz");

/**
 * Effect that shows one of the attack animations
 * @param stage
 * @param x
 * @param y
 * @constructor
 */
effect.Attack1 = function(stage,x,y) {
    var xsc = x*TILE_SIZE
    var xcoord = xsc - biogame.viewport.getX();
    
    var ysc = y*TILE_SIZE
    var ycoord = ysc - biogame.viewport.getY();


    var efct = new Kinetic.Sprite({
        x: (xcoord),
        y: (ycoord),
        width: TILE_SIZE,
        height: TILE_SIZE,
        image: preloadImage("/assets/images/misc_animations/attack1.png"),
        animations: attack1_anim,
        animation: 'all'
    });
    var spriteLayer = new Kinetic.Layer()
    spriteLayer.add(efct);
    efct.start();
    
    stage.add(spriteLayer);
    setTimeout(function() {spriteLayer.remove()},1000);
}

/**
 * Effect that shows one of the death animations
 *
 * @param stage
 * @param x
 * @param y
 * @constructor
 */
effect.Death1 = function(stage,x,y) {
    var xsc = x*TILE_SIZE
    var xcoord = xsc - biogame.viewport.getX();
    
    var ysc = y*TILE_SIZE
    var ycoord = ysc - biogame.viewport.getY();


    var efct = new Kinetic.Sprite({
        x: xcoord,
        y: ycoord,
        width: TILE_SIZE,
        height: TILE_SIZE,
        image: preloadImage("/assets/images/misc_animations/death1.png"),
        animations: death1_anim,
        animation: 'all'
    });
    var spriteLayer = new Kinetic.Layer()
    spriteLayer.add(efct);
    efct.start();
    
    console.log("Effect Made")
    
    stage.add(spriteLayer);
    setTimeout(function() {spriteLayer.remove()},1000);
}

/**
 * Effect animation unknown what it is meant to be
 *
 * @param stage
 * @param x
 * @param y
 * @constructor
 */
effect.Effect01 = function(stage,x,y) {
    var xsc = x*TILE_SIZE
    var xcoord = xsc - biogame.viewport.getX();
    
    var ysc = y*TILE_SIZE
    var ycoord = ysc - biogame.viewport.getY();

    var efct = new Kinetic.Sprite({
        x: xcoord,
        y: ycoord,
        width: TILE_SIZE,
        height: TILE_SIZE,
        image: preloadImage("/assets/images/misc_animations/effect01.png"),
        animations: attack1_anim,
        animation: 'all'
    });
    var spriteLayer = new Kinetic.Layer()
    spriteLayer.add(efct);
    efct.start();
    
    stage.add(spriteLayer);
    setTimeout(function() {spriteLayer.remove()},1000);
}

/**
 * Effect animation, unknown what it is meant to be
 *
 * @param stage
 * @param x
 * @param y
 * @constructor
 */
effect.Effect2 = function(stage,x,y) {
    var xsc = x*TILE_SIZE
    var xcoord = xsc - biogame.viewport.getX();
    
    var ysc = y*TILE_SIZE
    var ycoord = ysc - biogame.viewport.getY();

    var efct = new Kinetic.Sprite({
        x: xcoord,
        y: ycoord,
        width: TILE_SIZE,
        height: TILE_SIZE,
        image: preloadImage("/assets/images/misc_animations/effect2.png"),
        animations: attack1_anim,
        animation: 'all'
    });
    var spriteLayer = new Kinetic.Layer()
    spriteLayer.add(efct);
    efct.start();
    
    stage.add(spriteLayer);
    setTimeout(function() {spriteLayer.remove()},1000);
}
/**
 * Animation that puts ZZZ on top of the creature
 *
 * @param stage
 * @param x
 * @param y
 * @constructor
 */
effect.Sleep = function(stage,x,y) {
    var xsc = x*TILE_SIZE
    var xcoord = xsc - biogame.viewport.getX();
    
    var ysc = y*TILE_SIZE
    var ycoord = ysc - biogame.viewport.getY();

    var efct = new Kinetic.Sprite({
        x: xcoord,
        y: ycoord,
        width: TILE_SIZE,
        height: TILE_SIZE,
        image: preloadImage("/assets/images/misc_animations/zzz.png"),
        animations: attack1_anim,
        animation: 'all'
    });
    var spriteLayer = new Kinetic.Layer()
    spriteLayer.add(efct);
    efct.start();
    
    stage.add(spriteLayer);
    setTimeout(function() {spriteLayer.remove()},1000);
}