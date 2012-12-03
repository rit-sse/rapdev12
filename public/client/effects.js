
function effect() {
    //#Yacht
    
}
TILE_SIZE = 64;

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


effect.Attack1 = function(stage,x,y) {
    var efct = new Kinetic.Sprite({
        x: x*TILE_SIZE,
        y: y*TILE_SIZE,
        width: TILE_SIZE,
        height: TILE_SIZE,
        image: preloadImage("/assets/images/misc_animations/attack1.png"),
        animations: attack1_anim,
        animation: 'all'
    });
    console.log(attack1_anim);
    var spriteLayer = new Kinetic.Layer()
    spriteLayer.add(efct);
    efct.start();
    
    stage.add(spriteLayer);
    setTimeout(function() {spriteLayer.remove()},1000);
}

effect.Death1 = function(stage,x,y) {
    var efct = new Kinetic.Sprite({
        x: x*TILE_SIZE,
        y: y*TILE_SIZE,
        width: TILE_SIZE,
        height: TILE_SIZE,
        image: preloadImage("/assets/images/misc_animations/death1.png"),
        animations: adeath1_anim,
        animation: 'all'
    });
    var spriteLayer = new Kinetic.Layer()
    spriteLayer.add(efct);
    efct.start();
    
    stage.add(spriteLayer);
    setTimeout(function() {spriteLayer.remove()},1000);
}

effect.Effect01 = function(stage,x,y) {
    var efct = new Kinetic.Sprite({
        x: x*TILE_SIZE,
        y: y*TILE_SIZE,
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

effect.Effect2 = function(stage,x,y) {
    var efct = new Kinetic.Sprite({
        x: x*TILE_SIZE,
        y: y*TILE_SIZE,
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

effect.Sleep = function(stage,x,y) {
    var efct = new Kinetic.Sprite({
        x: x*TILE_SIZE,
        y: y*TILE_SIZE,
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