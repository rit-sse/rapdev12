
SCROLL_SPEED = 10;

function BioGame(stage) {
	this.viewport = new Kinetic.Layer();
	this.viewport.setDraggable(true);
	stage.add(this.viewport);

    this.map = new Map(this.viewport);
    this.mapCreatures = new MapCreatures(this.viewport);
}


/*
 * Client game entry point. Initializes game resources and loads
 * the initial game world with data from the server.
 */
BioGame.prototype.initGame = function(data) {
    // Create a map with the provided tile data
    this.map.loadTileData(data.map);
    this.mapCreatures.loadCreatureClassData(data.creatureClasses);
    this.mapCreatures.loadCreatureData(data.creatures);
}

/*
 * Create a websocket to the server and request
 * the game state when loading the window.
 */
window.onload = function() {
  
  var wrapper = $("#biogame");
  window.stage = new Kinetic.Stage({
      container: 'biogame',
      width: wrapper.width(),
      height: wrapper.height()
  });

  biogame = new BioGame(stage);
  
  biogame.splash = new Splash(stage, function() {
    biogame.viewport.draw();
  });

  var socket = io.connect('http://localhost:3000');

  socket.on('connected', function(data) {
    biogame.initGame(data);
    biogame.splash.SetPercent(1);
  });

  // Test message
  socket.on('echo', function(data) {
    console.log(data);
  });

  socket.on('count', function(data) {
    console.log(data);
  });

  socket.on('push_diff', function(data){
    console.log(data);
    $("#output").html(data.name + "<br/>" + data.data.rand);
  });


  // Add keyboard input to the map
  $(document).keydown(function(e) {
    switch (e.keyCode) {
      case 87:	// w
      case 38: 	// up
        biogame.viewport.setY(biogame.viewport.getY() + SCROLL_SPEED);
        break;

      case 65:	// a
      case 37:	// left
        biogame.viewport.setX(biogame.viewport.getX() + SCROLL_SPEED);
        break;

      case 83:	// s
      case 40:	// down
        biogame.viewport.setY(biogame.viewport.getY() - SCROLL_SPEED);
        break;

      case 68:	// d
      case 39:	// right
        biogame.viewport.setX(biogame.viewport.getX() - SCROLL_SPEED);
        break;

      default:
        return;
    }

    biogame.viewport.draw();
    e.preventDefault();

  });
}
    


/* Updates the canvas's size when the window size changes
 */
$(window).resize(function () {
    waitForFinalEvent(function(){
      var canvas = $("#biogame");
      window.stage.setWidth(canvas.width());
      window.stage.setHeight(canvas.height());
    }, 50, "resize");
});


/* Adds delay to when the canvas is resized so that it doesn't constantly
 * redraw as the window changes
 */
var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();
