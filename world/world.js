// require:
// 	 utils/world-utils.js

var Terrain = require('../utils/world-utils').Terrain;
var Tile = require('../world/Tile.js').Tile;
var Direction = require('../utils/simulation-utils').Direction;
var fs = require('fs');
var MiniGrid = require('../world/MiniGrid.js').MiniGrid;


exports.World = World;
//Test

var comm;
exports.use_comm = function(c) {
  comm = c;
}

exports.client_hooks = {};
exports.updates = {};

/**
 * Creates the world based on the worldfile given
 *
 * @param worldfile
 * @constructor
 */
function World( worldfile ) {
    console.log("Wordfile " + worldfile)
    var jsonObject = require(worldfile);

	this.creatureClasses = [];


	//list of creatures
	this.creatures = [];
	
	//list of alive creatures
	this.activeCreatures = [];
	
	//list of terrain accessed via index
	this.terrain = jsonObject.terrain;
	
	this.map = [];
	var currentRow; var currentCol;

	for(var i=0; i<jsonObject.map.length; i++){
		currentRow = jsonObject.map[i];
		this.map.push([]);
		for(var j=0; j < currentRow.length; j++){
			var currentCol = currentRow[j];
			var currentTile = new Tile(null,(this.terrain[jsonObject.map[i][j]]),i,j);
			this.map[i].push(  currentTile  );
		};
	};
	
	this.items = [];
};

/* addCreature - puts a creature on the board
 * creature - creature instance that is being added
 * tile - OPTIONAL parameter which places the creature on the board
 * if tile is not included, it places the creature into a random valid tile
 *
 * returns the tile the creature was added to
 */
World.prototype.addCreature = function( creature, tile ) {
	if( ! this.creatureClassExists(creature.classId)){
        this.creatureClasses.push({
            "id":creature.classId,
            "name":creature.name,
            "speed":creature.speed,
            "offense":creature.offense
        })
    }
    this.creatures.push( creature );
	creature.setId( this.creatures.length - 1 );
	this.activeCreatures.push( creature );
	
	var creTile;
	if (arguments.length == 2 ){
		creTile = this.getTile(tile.row, tile.column);
	}
	else{
		creTile = this.getRandomValidTile();
	}
	creTile.occupant = creature.getId();

  /*var delta = {
    type: "creature", 
    action: "new", 
    data: {
      id: creature.id,
      x: creTile.col, 
      y: creTile.row,
      classId: creature.classId,
      name: creature.name
    }
  };
  comm.push_diff(delta);     */


	return creTile;
};


/**
 * Looks to see if the creatures class is on the board
 *
 * @param classId
 * @return {Boolean}
 */
World.prototype.creatureClassExists = function( classId ) {
	var classFoundFlag = false;
	for( var i = 0; i < this.creatureClasses.length && !classFoundFlag; i++ ) {
		if ( this.creatureClasses[i].id == classId ) {
			classFoundFlag = true;
		}
	}
	return classFoundFlag;
}

/**
 * Empty class TODO
 */
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
	nRow = tRow + modPos[1];
	nCol = tCol + modPos[0];

	return ( this.isOutOfBounds( [nRow,nCol] ) ) ? null : this.getTile(nRow, nCol);
};

/**
 * Returns true or false if the coordinates given are out of bounds
 *
 * @param coords
 * @return {Boolean}
 */
World.prototype.isOutOfBounds = function( coords ) {
	return ( nRow < 0 || nRow >= this.map.length ||
					 nCol < 0 || nCol >= this.map[0].length );
}

/**
 * Returns the terrain type ate the given location
 *
 * @param row
 * @param col
 * @return {*}
 */
World.prototype.getTerrainAtTile = function( row, col ) {
	return this.getTile(row, col).terrain;
};

/**
 * Returns weather a creature is on the tile or not
 *
 * @param row
 * @param col
 * @return {*}
 */
World.prototype.getInhabitantAtTile = function( row, col ){
	return this.creatures[ this.getTile(row, col).occupant ];
};
/**
 * Returns the item that is on the given tile
 *
 * @param row
 * @param col
 * @return {*|Function|*|*|*}
 */
World.prototype.getItemAtTile = function( row, col ) {
	return this.getTile(row, col).item;
};

/**
 * Returns a random valid tile for a creature to be on
 *
 * @return {*}
 */
World.prototype.getRandomValidTile = function() {
	var validTiles = this.findInTiles( function( tile ) {
        console.log(tile)
		return tile.terrain.passable && tile.occupant === null;
	});
	return this.randomElement( validTiles );
};

/**
 * Returns a tile that does not have an item on it
 *
 * @return {*}
 */
World.prototype.getRandomItemlessTile = function() {
	var validTiles = this.findInTiles( function( tile ) {
		return tile.item == null;
	});
	return this.randomElement( validTiles );
}

/**
 * Finds all locations where a condition is on a tile
 * @param condition
 * @return {Array}
 */
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
        console.log(this.creatures[attackerId].name+" is attacking to the " + direction + "!");
        var attackDelta = {
        	type: "creature",
        	action: "attack",
        	data: {
        		row: locationToAttack.row,
        		col: locationToAttack.col
        	}
        };
        comm.push_diff( attackDelta );
		if (occupant){
            console.log(occupant + " was hit!");
            var attacker = this.getCreaturePosition(attackerId).occupant;
            this.creatures[occupant].hit(attacker.offense);
			this.creatures[occupant].onHit();
        } else {
            console.log("Creature tried to attack an empty location (location " + locationToAttack + ").");
        }
    }
}

/**
 * Moves a creature around the world
 * @param id
 * @param direction
 * @return {*|Boolean}
 */
World.prototype.moveCreature = function( id, direction ) {
    var creaturePosition = this.getCreaturePosition(id);
    var nextTile = this.getAdjacentTile(creaturePosition, direction);

    if ( nextTile == null ){
        console.log( "Creature with id " + id + " tried to move out of bounds." );
        this.creatures[id].onCollision();
        return false;
    }


	var newPos = [nextTile.row, nextTile.col]
	
	var desiredTile = this.getTile( newPos[0], newPos[1] );
	var tileCheck = desiredTile.terrain.passable && desiredTile.occupant == null;
	if ( tileCheck ) {
		this.getTile(creaturePosition.row, creaturePosition.col).occupant = null;
		this.getTile(newPos[0], newPos[1]).occupant = id;
		console.log( "Creature has moved to: row " + newPos[0] + ", col " + newPos[1] );
		delta = {
			type: "creature",
			action: "move",
			data: {
				id: id,
				x: newPos[0],
				y: newPos[1]
			}
		};
		comm.push_diff(delta);
	}
	else {
		this.creatures[id].onCollision();
	}
	return tileCheck;
}

World.prototype.createMiniGrid = function(creatureId){
    var miniGrid = new MiniGrid();
    var creatureLocation = this.getCreaturePosition(creatureId);
    for(var i = -2; i <= 2; i++){
        for(var j = -2; j <= 2; j++){
            if(creatureLocation != null){
                var tile = this.getTile(creatureLocation.row + i, creatureLocation.col + j);
                if(tile == null){
                    tile = new Tile(null,null,creatureLocation.row + i, creatureLocation.col + j);
                }

                miniGrid.addTile(tile);
            }
        }
    }
    console.log("looked around");
    return miniGrid;

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
var worldFromJSON = JSON.parse( fs.readFileSync( 'world/world.json' ) );
// fs.readFileSync( 'world/world.json', function( err, data ) {
// 	if (err) {
// 		console.log( "ERROR READING world.json" );
// 	} else {
// 		console.log( data );
// 		worldFromJSON = JSON.parse( data );
// 	}
// });

exports.worldFromJSON = worldFromJSON;
exports.World = World;

