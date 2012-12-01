

TILE_SIZE = 32;

function tileColor(color) {
	switch (color) {
		case 1:
			return 'blue';
			break;
		case 2:
		default:
			return 'white';
			break;
	}
}


var Map = function Map(viewport) {
	this.viewport = viewport;
}


Map.prototype.loadTileData = function(tileData) {
	this.tiles = [];

	// Draw the tiles to the map layer
	for (var row in tileData) {
		this.tiles[row] = [];

		for (var col in tileData[row]) {
			// Create a rectangle to represent the tile
			var rect = new Kinetic.Rect({
				x: col * TILE_SIZE,
				y: row * TILE_SIZE,
				width: TILE_SIZE,
				height: TILE_SIZE,
				fill: tileColor(tileData[row][col])
			});

			// Add the tile image to the tile group
			var nodeID = this.viewport.add(rect);

			// Save the tile for later reference
			this.tiles[row][col] = {
				'type': tileData[row][col],
				'image': rect,
				'node': nodeID
			};
		}
	}

	this.viewport.draw();
}
