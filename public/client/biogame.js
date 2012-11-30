
var BioGame = function BioGame(stage) {
	this.stage = stage;
	this.viewport = new Viewport(stage);

	this.mapGroup = new Kinetic.Group();
	this.map = new Map(this.mapGroup);
}


/*
 * Client game entry point. Initializes game resources and loads
 * the initial game world with data from the server.
 */
BioGame.prototype.initGame = function(data) {
	// Create a map with the provided tile data
	this.map.loadTileData(data.map);
	this.viewport.draw();
}


/*
 * Create a websocket to the server and request
 * the game state when loading the window.
 */
window.onload = function() {
	//TODO: send websockets request to server API
	//  to get the initail game state (send to initGame)

    var wid = 1000;
    var stage = new Kinetic.Stage({
        container: 'biogame',
        width: wid,
        height: 600
    });

    var biogame = new BioGame(stage);

    // Test tile loading
    biogame.initGame({
		"map": [
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
		]
	});
}
