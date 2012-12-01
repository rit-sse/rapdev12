describe( "world.js suite", function() {
  var testWorldJSON = {
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
  var world;

  beforeEach( function() {
    world = new World( testWorldJSON );
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
  })

  it( "ten randomly chosen 'valid' tiles are actually valid" , function() {
    for( var i = 0; i < 10; i++ ) {
      var tile = world.getRandomValidTile();

      expect( tile.inhabitant ).toEqual( null );
      expect( tile.terrain.passable ).toBe( true );
    }
  });

} );