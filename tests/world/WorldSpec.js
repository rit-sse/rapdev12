var World = require('../../world/world.js').World;
var Creature = require('../../creature/Creature.js').Creature;
var Tile = require('../../world/Tile.js').Tile;

describe( "world.js suite", function() {

  // ----------------------------------------------------------------------
  // --------------------  Set up test data  ------------------------------
  // ----------------------------------------------------------------------
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

  // ----------------------------------------------------------------------
  // ------------------------------  Tests   ------------------------------
  // ----------------------------------------------------------------------

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

      validTiles = (tile.occupant == null) || tile.terrain.passable;
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
    world.addCreature( aCreature );

    expect( world.getCreatureById( aCreature.id ).name )
      .toEqual( aCreature.name );
  });

  it( "correctly gets a creature's position", function() {
    world.creatures.push( aCreature );
    aCreature.setId( 0 );
    var tile = world.getRandomValidTile();
    tile.occupant = aCreature.getId();

    expect( world.getCreaturePosition( aCreature.getId() ) )
      .toEqual( tile );
  });

  it( "correctly represents the map for client", function() {
    var smallWorldMap = smallWorld.getMapForClient();

    expect( smallWorldMap ).toEqual( [["grass","grass"],["grass","grass"]] );
  });

  it( "correctly represents the creature classes for client", function() {
    var aDifferentCreature =
      new Creature( "Dorrene", "queen", smallWorld, 99, 99, 99 );
    smallWorld.addCreature( aCreature );
    smallWorld.addCreature( aDifferentCreature );
    var smallWorldCreatureClasses = smallWorld.getCreatureClassesForClient();

    expect( smallWorldCreatureClasses ).toEqual( [
    {
      "id": aCreature.classId,
      "name": aCreature.name,
      "speed": aCreature.speed,
      "attack": aCreature.attack
    },
    {
      "id": aDifferentCreature.classId,
      "name": aDifferentCreature.name,
      "speed": aDifferentCreature.speed,
      "attack": aDifferentCreature.attack
    }
    ]);
  });

  it( "correctly represents the creatures for client", function() {
    var aDifferentCreature =
      new Creature( "Dorrene", "queen", smallWorld, 99, 99, 99 );
    smallWorld.addCreature( aCreature );
    smallWorld.addCreature( aDifferentCreature );
    var smallWorldCreatures = smallWorld.getCreaturesForClient();
    var aCreatureTile = smallWorld.getCreaturePosition( aCreature.getId() );
    var aDifferentCreatureTile =
      smallWorld.getCreaturePosition( aDifferentCreature.getId() );

    expect( smallWorldCreatures ).toEqual( [
    {
      "id": aCreature.getId(),
      "class": aCreature.classId,
      "name": aCreature.name,
      "row": aCreatureTile.row,
      "col": aCreatureTile.col
    },
    {
      "id": aDifferentCreature.getId(),
      "class": aDifferentCreature.classId,
      "name": aDifferentCreature.name,
      "row": aDifferentCreatureTile.row,
      "col": aDifferentCreatureTile.col
    }
    ]);
  });

  it( "correctly dumps to client-readable object", function() {
    smallWorld.addCreature( aCreature );
    var clientDump = smallWorld.toClientDump();
    var creatureTile = smallWorld.getCreaturePosition( aCreature.getId() );

    expect( clientDump ).toEqual( {
      "map": [ ["grass","grass"], ["grass","grass"] ],
      "creatureClasses": [ {
        "id": aCreature.classId,
        "name": aCreature.name,
        "speed": aCreature.speed,
        "attack": aCreature.attack
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
  
  it( "correctly places a creature in a given tile, Part1", function() {
    var tile = new Tile(null, world.terrain[0], 0, 0);
    var creTile = world.addCreature( aCreature, tile );
    wTile = world.getTile(tile.row, tile.col);
    expect(wTile).toEqual(creTile);
  });
  
  it( "correctly places a creature in a given tile, Part2", function() {
    var tile = new Tile(null, world.terrain[0], 0, 0);
    /* var creTile = */ world.addCreature( aCreature, tile );
    var comTile = world.getCreaturePosition( aCreature.id );
    var wTile = world.getTile(tile.row, tile.col);

    expect(wTile).toEqual(comTile);
  });
  
  it( "correctly places a creature in a random tile", function() {
    var creTile = world.addCreature( aCreature );
    var comTile = world.getCreaturePosition( aCreature.id );
    expect(creTile).toEqual(comTile);
    
  });

  it( "adds one creature class on duplicate creatures added", function() {
    world.addCreature( aCreature );
    world.addCreature( aCreature );
    var creatureClasses = world.getCreatureClassesForClient();

    expect( creatureClasses ).toEqual( [
      {
        "id": aCreature.classId,
        "name": aCreature.name,
        "speed": aCreature.speed,
        "attack": aCreature.attack
      }
    ]);
  });

} );
