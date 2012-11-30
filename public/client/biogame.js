
/*
 * Create a websocket to the server and request
 * the game state when loading the window.
 */
window.onload = function() {
	//TODO: send websockets request to server API
	//  to get the initail game state (send to initGame)
    
    initGame({});
}


/*
 * Client game entry point. Initializes game resources and loads
 * the initial game world with data from the server.
 */
function initGame(data) {
    var stage = new Kinetic.Stage({
        container: 'biogame',
        width: 800,
        height: 600
    });
    
    var bg = new Kinetic.Layer();
    var wid = 1000;
    
    //A tile for the gradient background
    var bgTile = new Kinetic.Rect({
            width: wid,
            height: 600,
            fill: {
                start: {
                    x: wid/2,
                    y: 0,
                    radius: 0
                },
                end: {
                    x: wid/2,
                    y: 0,
                    radius: 600
                },
                colorStops: [0, '#99ddff', 1, '#004466']
            }
        });
        
    bg.add(bgTile);
    
    stage.add(bg);
}
