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
				"item":null,
				"row":i,
				"col":j
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
	this.creatures.push( creature );
    this.activeCreatures.push( creature );
	var randTile = this.getRandomValidTile()
	randTile.inhabitant = this.creatures.length - 1;
	creature.setId( this.creatures.length - 1 );
	//save position into creature
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
	var validTiles = this.findInTiles( function( tile ) {
		return tile.terrain.passable && tile.inhabitant === null;
	});
	return this.randomElement( validTiles );
};

World.prototype.getRandomItemlessTile = function() {
	var validTiles = this.findInTiles( function( tile ) {
		return tile.item == null;
	});
	return this.randomElement( validTiles );
}

World.prototype.findInTiles = function( condition ) {
	var valid = [];
	for ( var row = 0; row < this.map.length; row++ ) {
		for ( var col = 0; col < this.map[0].length; col++ ) {
			if ( condition( this.getTile( row, col ) ) ) {
				valid.push( currentTile );
			}
		}
	}
	return valid;
}

World.prototype.moveCreature = function( id, direction ) {
	var newPos;
	if (direction == Direction.NORTH){
		newPos = [0,-1];
	}else if (direction == Direction.SOUTH){
		newPos = [0,+1];
	}else if (direction == Direction.EAST){
		newPos = [+1,0];
	}else if (direction == Direction.WEST){
		newPos = [-1,0];
	}else if (direction == Direction.NORTHWEST){
		newPos = [-1,-1];
	}else if (direction == Direction.NORTHEAST){
		newPos = [+1,-1];
	}else if (direction == Direction.SOUTHWEST){
		newPos = [-1,+1];
	}else if (direction == Direction.SOUTHEAST){
		newPos = [+1,+1];
	}
	
	creaturePostion = [0,0] // Grab position!
	// modify newPos by creaturePosition
	tileCheck = this.getTerrainAtTile(newPos[0],newPos[1]).passable == true
							&& this.getInhabitantAtTile(newPos[0],newPos[1]);
	if (tileCheck) {
		//move creature to new position
	}
	else {
		this.creatures.onCollision();
	}
	return tileCheck
}

World.prototype.randomElement = function( someArray ) {
	return someArray[ Math.floor( Math.random()*someArray.length ) ];
}

World.prototype.getCreatureById = function( creatureID ) {
	return this.isValidCreatureId( creatureID ) ?
		this.creatures[ creatureID ] : null;
}

World.prototype.isValidCreatureId = function( creatureID ) {
	return creatureID < this.creatures.length;
}

World.prototype.getCreaturePosition = function( creatureID ) {
	// TODO: This is an O(N) operation. Can it be made faster with some ease?
	if ( this.isValidCreatureId( creatureID ) ) {
		var tile = this.findInTiles( function( tile ) {
			return tile.inhabitant == creatureID;
		})[0];
		return { "row": tile.row, "col": tile.col };
	} else {
		return null;
	}
}



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
