// require:
// 	 utils/world-utils.js

var Terrain = require('../utils/world-utils').Terrain;
var Tile = require('../world/Tile.js').Tile;

exports.worldjson = worldjson;
exports.World = World;

var comm;
exports.use_comm = function(c) {
  comm = c;
}

exports.client_hooks = {};
exports.updates = {};

function World( jsonObject ) {

	//list of creatures
	this.creatures = [];
	
	//list of alive creatures
	this.activeCreatures = [];
	
	//list of terrain accessed via index
	this.terrain = jsonObject.terrain;
	
	//list of tiles that are passable
	this.passableTiles = [];
	
	this.map = [];
	var currentRow; var currentCol;
	for(var i=0; i<jsonObject.map.length; i++){
		currentRow = jsonObject.map[i];
		this.map.push([]);
		for(var j=0; j < currentRow.length; j++){
			var currentCol = currentRow[j];
			var currentTile = new Tile(null,(this.terrain[jsonObject.map[i][j]]),i,j);
			this.map[i].push(  currentTile  );
			if (currentTile.terrain.passable == true){
				this.passableTiles.push( [i,j] );
			};
		};
	};
	
	this.items = [];
};

World.prototype.addCreature = function( creature ) {
	this.creatures.push( creature );
  this.activeCreatures.push( creature );
	var randTile = this.getRandomValidTile();
	creature.setId( this.creatures.length - 1 );
	randTile.occupant = creature.getId();
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
	return this.creatures[ this.getTile(row, col).occupant ];
};

World.prototype.getItemAtTile = function( row, col ) {
	return this.getTile(row, col).item;
};

World.prototype.getRandomValidTile = function() {
	var validTiles = this.findInTiles( function( tile ) {
		return tile.terrain.passable && tile.occupant === null;
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
			var currentTile = this.getTile( row, col );
			if ( condition( currentTile ) ) {
				valid.push( currentTile );
			}
		}
	}
	return valid;
}

World.prototype.moveCreature = function( id, direction ) {
	var modPos;
	if (direction == Direction.NORTH){
		modPos = [0,-1];
	}else if (direction == Direction.SOUTH){
		modPos = [0,+1];
	}else if (direction == Direction.EAST){
		modPos = [+1,0];
	}else if (direction == Direction.WEST){
		modPos = [-1,0];
	}else if (direction == Direction.NORTHWEST){
		modPos = [-1,-1];
	}else if (direction == Direction.NORTHEAST){
		modPos = [+1,-1];
	}else if (direction == Direction.SOUTHWEST){
		modPos = [-1,+1];
	}else if (direction == Direction.SOUTHEAST){
		modPos = [+1,+1];
	}
	
	creaturePosition = this.getCreaturePosition(id);
	newPos = [creaturePosition.row + modPos[0], creaturePosition.col + modPos[1]];
	tileCheck = this.getTerrainAtTile(newPos[0],newPos[1]).passable == true
							&& this.getInhabitantAtTile(newPos[0],newPos[1]);
	if (tileCheck) {
		this.getTile(creaturePosition.row, creaturePosition.col).occupant = null;
		this.passableTiles.push(creaturePosition);
		this.getTile(newPos[0], newPos[1]).occupant = id;
	}
	else {
		this.creatures.onCollision();
	}
	return tileCheck;
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
		return this.findInTiles( function( tile ) {
			return tile.occupant == creatureID;
		})[0];
	} else {
		return null;
	}
}

/*
 * Returns all active creatures.
 */
World.prototype.getActiveCreatures = function() {
    return this.activeCreatures;
}

World.prototype.toJSON = function() {
	return JSON.stringify( {
		"map": this.getMapJSON(),
		"creatureClasses": this.getCreatureClassesJSON(),
		"creatures": this.getCreaturesJSON()
	});
}

World.prototype.getMapJSON = function() {
	var jsonMap = [];
	for ( var row = 0; row < this.map.length; row++ ) {
			jsonMap.push( [] );
		for ( var col = 0; col < this.map[0].length; col++ ) {
			jsonMap[row][col] = this.map[row][col].terrain.name;
		}
	}
	return JSON.stringify(jsonMap);
}

World.prototype.getCreatureClassesJSON = function() {
	return null;
}

World.prototype.getCreaturesJSON = function() {
	return null;
}

// TODO: Make this read from world.json instead of hardcoding it
var worldjson = {
  "terrain": [
    {
      "name": Terrain.GRASS,
      "passable": true
    },
    {
      "name": Terrain.WATER,
      "passable": false
    },
    {
      "name": Terrain.ROCK,
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

