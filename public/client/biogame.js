
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
    //TODO: send websockets request to server API
    //  to get the initail game state (send to initGame)
    //


    var wrapper = $("#biogame");

    window.stage = new Kinetic.Stage({
        container: 'biogame',
        width: wrapper.width(),
        height: wrapper.height()
    });

    biogame = new BioGame(stage);
    
    biogame.splash = new Splash(stage, function() {
        // Test tile loading
        biogame.initGame({
            "map": [
                [ "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass" ],
                [ "grass", "grass", "rock", "grass", "grass", "grass", "grass", "rock", "grass", "grass" ],
                [ "grass", "grass", "rock", "grass", "grass", "grass", "grass", "rock", "grass", "grass" ],
                [ "grass", "grass", "rock", "grass", "grass", "grass", "grass", "rock", "grass", "grass" ],
                [ "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass" ],
                [ "grass", "water", "grass", "grass", "grass", "grass", "grass", "grass", "water", "grass" ],
                [ "grass", "grass", "water", "grass", "grass", "grass", "grass", "water", "grass", "grass" ],
                [ "grass", "grass", "grass", "sand", "sand", "sand", "sand", "grass", "grass", "grass" ],
                [ "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass" ],
                [ "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass" ]
            ],
            "creatureClasses": [
        {
          "id": 1,
          "name": "Redshirt",
          "speed": 2,
          "strength": 1,
          "assets": {
            "color": "red",
          }
        },
        {
          "id": 2,
          "name": "Officer",
          "speed": 10,
          "strength": 10,
          "assets": {
            "color": "gold",
          }
        }
      ],
      "creatures": [
        {
          "id": 1,
          "class": 2,
          "name": "Kirk",
          "x": 5,
          "y": 5
        },
        {
          "id": 2,
          "class": 1,
          "name": "Bob",
          "x": 2,
          "y": 2
        },
        {
          "id": 3,
          "class": 1,
          "name": "Joe",
          "x": 7,
          "y": 2
        }
      ]
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
    });
    
    var per = 0.0;
    var slowness = 500;
    var fakeLoad = function() {
        per+=0.1;
        biogame.splash.SetPercent(per);
        if (biogame.splash && per <=1) {
            setTimeout(fakeLoad,slowness)
        }
    }
    fakeLoad();
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
