

TILE_SIZE = 64;

/**
 * Initializes a Map object, the map terrain layer
 * @param {Kinetic.Layer} viewport - The Kinetic layer in which to draw the terrain
 */
function Map(viewport) {
	this.viewport = viewport;
	this.tiles = [];
};

/**
 * Populates the tiles array with Objects containing Kinetic Images, the node
 * IDs, and the tile types, adds the Images to the viewport, and tells the
 * viewport to draw.
 * @param {Array<Array<String>>} tileData - Each map tile's type in the grid
 */
Map.prototype.loadTileData = function(tileData) {
	this.tiles = [];

	// Draw the tiles to the map layer
	for (var row in tileData) {
		this.tiles[row] = [];

		for (var col in tileData[row]) {
			// Create a rectangle to represent the tile
			var imgObj = new Image();
			imgObj.src = "assets/images/tiles/" + tileData[row][col] + ".png";
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
};
