
var Map = function Map(mapGroup) {
	this.mapGroup = mapGroup;

	this.tileGroup = new Kinetic.Group();
	mapGroup.add(this.tileGroup);
}


Map.prototype.loadTileData = function(tileData) {
	this.tiles = tileData;

	// Draw the tiles to the map layer

}
