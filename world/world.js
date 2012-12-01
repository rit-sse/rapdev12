function World( jsonObject ) {
	
	
	this.creatures = [];
	
	this.activeCreatures = [];
	
	this.terrain = jsonObject.terrain;
	
	this.passableTiles = [];
	
	this.map = [];
	for(var i=0; i<jsonObject.map.length; i++){
		currentRow = jsonObject.map[i];
		this.map.push([]);
		for(var j=0; j < currentRow.length; j++){
			currentCol = currentRow[j];
			currentTile = {
				"inhabitant":null,
				"terrain":this.terrain[jsonObject.map[i][j]],
				"item":null
			};
			this.map[i].push(  currentTile  );
			if (currentTile.passable == true){
				this.passableTiles.push( currentTile )
			};
		};
	};
	
	this.items = [];
	
};

World.prototype.addCreature = function( creature ){
	this.getRandomValidTile().inhabitant = creature;
};

World.prototype.populateWithItems = function(){
	
};

World.prototype.getTile = function( row, col ){
	return this.map[row][col];
};

World.prototype.getTerrainAtTile = function( row, col ){
	return this.getTile(row, col).terrain;
};

World.prototype.getInhabitantAtTile = function( row, col ){
	return this.getTile(row, col).inhabitant;
};

World.prototype.getItemAtTile = function( row, col ){
	return this.getTile(row, col).item;
};

World.prototype.getRandomValidTile = function() {
	// TODO: Make sure the tile is valid before returning
	// "valid" tile is passable and has no inhabitant
	return this.getTile( Math.floor(Math.random()*this.map[0].length),
											 Math.floor(Math.random()*this.map.length) );
};

// TODO: Make this read from world.json instead of hardcoding it
var worldjson = {
  "terrain": [
    {
      "name": "grass",
      "passable": true
    },
    {
      "name": "water",
      "passable": false
    },
    {
      "name": "rock",
      "passable": false
    }
  ],
  "map": [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  ]
}

var world = new World( worldjson );
