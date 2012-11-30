
var mapGroup = new Kinetic.Group();
var map = new Map(mapGroup);

/*
 * Client game entry point. Initializes game resources and loads
 * the initial game world with data from the server.
 */
function initGame(data) {
	// Create a map with the provided tile data
	map.loadTileData(data.map);
	viewport.draw();
}


/*
 * Create a websocket to the server and request
 * the game state when loading the window.
 */
window.onload = function() {
	//TODO: send websockets request to server API
	//  to get the initail game state (send to initGame)
}
