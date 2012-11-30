
var Map = function Map(mapGroup) {
	this.mapGroup = mapGroup;

	this.tileGroup = new KineticGroup();
	mapGroup.add(this.tileGroup);
}


Map.prototype.loadTileData(tileData) {
	this.tiles = tileData;

	// Draw the tiles to the map layer

}
