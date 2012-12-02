// require:
// 	 utils/world-utils.js

var Terrain = require('../utils/world-utils').Terrain;
var Tile = require('../world/Tile.js').Tile;
var Direction = require('../utils/simulation-utils').Direction;
var Delta = require('../sim/Delta').Delta;

exports.World = World;

var comm;
exports.use_comm = function(c) {
  comm = c;
}

exports.client_hooks = {};
exports.updates = {};

function World( jsonObject ) {
	this.creatureClasses = [];

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

/* addCreature - puts a creature on the board
 * creature - creature instance that is being added
 * tile - OPTIONAL parameter which places the creature on the board
 * if tile is null, it places the creature into a random valid tile
 *
 * returns the tile the creature was added to
 */
World.prototype.addCreature = function( creature ) {
	if ( ! this.creatureClassExists( creature.classId ) ) {
		this.creatureClasses.push( {
			"id": creature.classId,
			"name": creature.name,
			"speed": creature.speed,
			"attack": creature.attack
		} );
	}
	this.creatures.push( creature );
	creature.setId( this.creatures.length - 1 );
	this.activeCreatures.push( creature );
	
	var creTile;
	if (arguments.length == 2 ){
		creTile = tile;
	}
	else{
		creTile = this.getRandomValidTile();
	}
	creTile.occupant = creature.getId();
	return creTile;
};

World.prototype.creatureClassExists = function( classId ) {
	var classFoundFlag = false;
	for( var i = 0; i < this.creatureClasses.length && !classFoundFlag; i++ ) {
		if ( this.creatureClasses[i].id == classId ) {
			classFoundFlag = true;
		}
	}
	return classFoundFlag;
}

World.prototype.populateWithItems = function() {
	
};

/* getTile - returns a tile on the map
 * if outside the bounds of the board; returns null
 */
World.prototype.getTile = function( row, col ) {
	var resTile;
	if ( row < 0 || col < 0 ||
		row > this.map.length || col > this.map[0].length) {
		resTile = null
	}
	else {
		resTile = this.map[row][col]
	}
	return resTile;
};

/*
 * getAdjacentTile - returns an adjacent tile based on a direction
 *
 * tile - the initial tile
 * direction - which adjacent tile to look at [NORTH | SOUTH][EAST | WEST]
 * returns the given tile
 */
World.prototype.getAdjacentTile = function(tile, direction) {
	var tRow = tile.row;
  var tCol = tile.col;
  var modPos;

	if (direction == Direction.NORTH){
		modPos = [-1,0];
	}else if (direction == Direction.SOUTH){
		modPos = [1,0];
	}else if (direction == Direction.EAST){
		modPos = [0,1];
	}else if (direction == Direction.WEST){
		modPos = [0,-1];
	}else if (direction == Direction.NORTHWEST){
		modPos = [-1,-1];
	}else if (direction == Direction.NORTHEAST){
		modPos = [-1,1];
	}else if (direction == Direction.SOUTHWEST){
		modPos = [1,-1];
	}else if (direction == Direction.SOUTHEAST){
		modPos = [1,1];
	}
	nRow = tRow + modPos[0];
	nCol = tCol + modPos[1];

	return ( isOutOfBounds( [nRow,nCol] ) ) ? null : this.getTile(nRow, nCol);
};

World.prototype.isOutOfBounds( coords ) {
	return ( nRow < 0 || nRow >= this.map.length ||
					 nCol < 0 || nCol >= this.map[0].length );
}

World.prototype.getTerrainAtTile = function( row, col ) {
	console.log( "(" + row + ", " + col + ")" );
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

/*
* Enables a creature to attack another location. If a creature is at a location, then attack the creature.
* attackerId - The creature that is initiating the attack.
* direction - The direction that the initiating creature is attacking in.
*/
World.prototype.attackCreature = function(attackerId, direction) {
    var attackerPosition = this.getCreaturePosition(attackerId);
    console.log("attacker position " + attackerPosition);
    var locationToAttack = this.getAdjacentTile(attackerPosition, direction);

    //if this tile is valid, grab the occupant
    if (locationToAttack){
        var occupant = locationToAttack.occupant;
        if (occupant){
            occupant.onHit();
            console.log("Creature is attacking to the " + direction + "!");
        } else {
            console.log("Creature tried to attack an empty location (location " + locationToAttack + ").");
        }
    }
}


World.prototype.moveCreature = function( id, direction ) {
	var creaturePosition = this.getCreaturePosition(id);
	var nextTile = this.getAdjacentTile(creaturePosition, direction);
	
	var newPos = [nextTile.row, nextTile.col];
	if (newPos[0] < 0 || newPos[1] < 0 ||
		newPos[0] >= this.map.length || newPos[1] >= this.map[0].length){
		console.log( "Creature with id " + id + " tried to move out of bounds" );
		this.creatures[id].onCollision();
		return;
	}
	var desiredTile = this.getTile( newPos[0], newPos[1] );
	var tileCheck = desiredTile.terrain.passable && desiredTile.occupant == null;
	if ( tileCheck ) {
		this.getTile(creaturePosition.row, creaturePosition.col).occupant = null;
		this.passableTiles.push(creaturePosition);
		this.getTile(newPos[0], newPos[1]).occupant = id;
		console.log( "Creature has moved to: row " + newPos[0] + ", col " + newPos[1] );
		delta = new Delta([{type:"creature", action: "move", data: {id: id, x:newPos[0], y:newPos[1]}}]);
		comm.push_diff(delta);
	}
	else {
		this.creatures[id].onCollision();
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

World.prototype.toClientDump = function() {
	return {
		"map": this.getMapForClient(),
		"creatureClasses": this.getCreatureClassesForClient(),
		"creatures": this.getCreaturesForClient()
	};
}

World.prototype.getMapForClient = function() {
	var clientMap = [];
	for ( var row = 0; row < this.map.length; row++ ) {
			clientMap.push( [] );
		for ( var col = 0; col < this.map[0].length; col++ ) {
			clientMap[row][col] = this.map[row][col].terrain.name;
		}
	}
	return clientMap;
}

World.prototype.getCreatureClassesForClient = function() {
	return this.creatureClasses;
}

World.prototype.getCreaturesForClient = function() {
	var clientCreatures = [];
	for ( var i = 0; i < this.activeCreatures.length; i++ ) {
		var c = this.activeCreatures[i];
		var creatureTile = this.getCreaturePosition( c.getId() );
		clientCreatures.push( {
			"id": c.getId(),
			"class": c.classId,
			"name": c.name,
			"row": creatureTile.row,
			"col": creatureTile.col
		});
	}
	return clientCreatures;
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
exports.worldjson = worldjson;

