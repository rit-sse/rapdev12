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
			if (currentTile.terrain.passable == true){
				this.passableTiles.push( [i,j] )
			};
		};
	};
	
	this.items = [];
	
};

World.prototype.addCreature = function( creature ) {
	this.creatures.append( creature );
	this.getRandomValidTile().inhabitant = this.creatures.length - 1;
};

World.prototype.populateWithItems = function() {
	
};

World.prototype.getTile = function( row, col ) {
	return this.map[row][col];
};

World.prototype.getTerrainAtTile = function( row, col ) {
	return this.getTile(row, col).terrain;
};

World.prototype.getInhabitantAtTile = function( row, col ){
	return this.creatures[ this.getTile(row, col).inhabitant ];
};

World.prototype.getItemAtTile = function( row, col ) {
	return this.getTile(row, col).item;
};

World.prototype.getRandomValidTile = function() {
	var valid = [];
	for ( var row = 0; row < this.map.length; row++ ) {
		for ( var col = 0; col < this.map[0].length; col++ ) {
			currentTile = this.getTile( row, col );
			if ( currentTile.terrain.passable && currentTile.inhabitant == null ) {
				valid.push( currentTile );
			}
		}
	}
	return valid[ Math.floor( Math.random()*valid.length ) ];
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
