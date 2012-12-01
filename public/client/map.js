

TILE_SIZE = 64;

function tileType(id) {
	switch (id) {
		case 1:
			return 'sand';
			break;
		case 2:
		default:
			return 'sand';
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
			var imgObj = new Image();
			imgObj.src = "assets/images/tiles/" + tileType(tileData[row][col]) + ".png";
			var image = new Kinetic.Image({
				x: col * TILE_SIZE,
				y: row * TILE_SIZE,
				width: TILE_SIZE,
				height: TILE_SIZE,
				image: imgObj
			});

			// Add the tile image to the tile group
			var nodeID = this.viewport.add(image);

			// Save the tile for later reference
			this.tiles[row][col] = {
				'type': tileData[row][col],
				'image': image,
				'node': nodeID
			};
		}
	}

	this.viewport.draw();
}
