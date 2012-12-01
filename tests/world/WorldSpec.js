var World = require('../../world/world.js').World;
var Creature = require('../../creature/Creature.js').Creature;

describe( "world.js suite", function() {
  var testWorld = {
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
      [ 0, 0, 0, 1, 0, 0 ],
      [ 0, 2, 1, 0, 1, 0 ],
      [ 1, 2, 1, 0, 0, 1 ],
      [ 0, 2, 1, 0, 2, 0 ],
      [ 1, 2, 0, 1, 0, 0 ],
      [ 0, 1, 0, 0, 0, 2 ]
    ]
  }
  var smallTestWorld = {
    "terrain": [
      {
        "name": "grass",
        "passable": true
      }
    ],
    "map": [
      [ 0, 0 ],
      [ 0, 0 ]
    ]
  }
  var world;
  var smallWorld;
  var aCreature;

  beforeEach( function() {
    world = new World( testWorld );
    smallWorld = new World( smallTestWorld );
    aCreature = new Creature( "Frankenyacht", "yacht", smallWorld, 10, 10, 10 );
  });

  it( "loads the correct terrain", function() {
    expect( world.terrain[0] ).toEqual( {"name": "grass", "passable": true} );
    expect( world.terrain[1] ).toEqual( {"name": "water", "passable": false} );
    expect( world.terrain[2] ).toEqual( {"name": "rock", "passable": false} );
    
  });
  
  it( "returns the correct tile", function() {
    var tile = world.getTile( 5, 5 );

    expect( tile.inhabitant ).toEqual( null );
    expect( tile.terrain.passable ).toBe( false );
    expect( tile.terrain.name ).toEqual( "rock" );
    expect( tile.item ).toEqual( null );
  });
  
  it( "returns the correct passable tiles", function() {
    
    expect( world.getTerrainAtTile( 0, 3).passable ).toEqual( false )
    
    expect( world.passableTiles ).toEqual([
      [0,0],[0,1],[0,2],[0,4],[0,5],[1,0],[1,3],[1,5],
      [2,3],[2,4],[3,0],[3,3],[3,5],[4,2],[4,4],
      [4,5],[5,0],[5,2],[5,3],[5,4]
    ]);
  });
  
  it( "returns the correct terrain at a tile", function() {
    expect( world.getTerrainAtTile( 0, 0)).toEqual(
      {"name": "grass", "passable": true})
    expect( world.getTerrainAtTile( 1, 1)).toEqual(
      {"name": "rock", "passable": false})
    expect( world.getTerrainAtTile( 2, 2)).toEqual(
      {"name": "water", "passable": false})
  });

  it( "50 randomly chosen 'valid' tiles are actually valid" , function() {
    validTiles = true;
    for( var i = 0; i < 50 && validTiles; i++ ) {
      var tile = world.getRandomValidTile();

      validTiles = (tile.inhabitant == null) || tile.terrain.passable;
    }
    expect( validTiles ).toBe( true );
  });

  it( "gets the correct subset of tiles for a condition", function() {
    var subset = world.findInTiles( function( tile ) {
      return tile.terrain.name == "rock";
    } );
    expect( subset.length ).toEqual( 6 );
  });

  it( "gets a random element from an array", function() {
    var someArray = [ 0, 1, 2, 3 ];
    var someElement = world.randomElement( someArray );
    expect( someArray.indexOf( someElement ) != -1 ).toBe( true );
  });

  it( "correctly gets a creature by ID", function() {
    world.creatures.push( aCreature );

    expect( world.getCreatureById( aCreature.id ).name )
      .toEqual( aCreature.name );
  });

  it( "correctly gets a creature's position", function() {
    world.creatures.push( aCreature );
    var tile = world.getRandomValidTile();
    tile.inhabitant = aCreature.getId();

    var creatureTile = world.getCreaturePosition( aCreature.getId() );
    expect( creatureTile.row ).toEqual( tile.row );
    expect( creatureTile.col ).toEqual( tile.col );
  });

  it( "correctly represents the map in JSON", function() {
    var smallWorldMapJSON = smallWorld.getMapJSON();
    var smallWorldMap = JSON.parse( smallWorldMapJSON );

    expect( smallWorldMap ).toEqual( [["grass","grass"],["grass","grass"]] );
  });

  it( "correctly dumps to client-readable object", function() {
    var clientDump = smallWorld.toClientDump();
    smallWorld.addCreature( aCreature );
    var creatureTile = smallWorld.getCreaturePosition( aCreature.getId() );

    expect( clientDump ).toEqual( {
      "map": [ ["grass","grass"], ["grass","grass"] ],
      "creatureClasses": [ {
        "id": aCreature.classId,
        "name": "yacht",
        "speed": 10,
        "attack": 10
      }],
      "creatures": [ {
        "id": aCreature.getId(),
        "class": aCreature.classId,
        "name": aCreature.name,
        "row": creatureTile.row,
        "col": creatureTile.col
      }]
    });
  });

} );
