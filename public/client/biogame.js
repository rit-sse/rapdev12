
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
 * Applies game state changes from the server to the client
 * @param {Object} operation - The operation received from the server
 */
BioGame.prototype.applyDelta = function(operation) {
	if (operation.type == "creature") {
		this.mapCreatures.applyOperation(operation.action, operation.data);
	} else if (operation.type == "creatureclass") {
		//TODO
	}
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
  biogame.socket = socket;
  
  socket.on('connected', function(data) {
    //biogame.splash.SetPercent(0.5);
  });

  // Test message
  socket.on('echo', function(data) {
    console.log(data);
  });

  socket.on('count', function(data) {
    console.log(data);
  });

  socket.on('push_diff', function(data){
    biogame.applyDelta(data);
  });

  socket.on('get_map', function(data){
    setTimeout(function() {biogame.initGame(data)},1000)
    biogame.splash.Disperse(1);
  });

  $('#sendRequest').click(function(){
    socket.emit('get_map');
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


  /* Cancel dragOver event so we can drop onto the canvas
   */
  $("#biogame canvas")[0].addEventListener("dragover", function(event){
    event.preventDefault();
  }, false);


  /* Drop a creature onto the canvas
   */
  $("#biogame canvas")[0].addEventListener("drop", function(event){
    event.preventDefault();

    var xcoord = event.clientX - biogame.viewport.getX();
    var x = Math.floor(xcoord/TILE_SIZE);

    var ycoord = event.clientY - biogame.viewport.getY();
    var y = Math.floor(ycoord/TILE_SIZE);

    console.log("(" + x + ", " + y + ")");

    socket.emit("add_creature", {
      classId: 1,//event.dataTransfer.getData("text"),
      x: x,
      y: y
    });

  }, false);

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
