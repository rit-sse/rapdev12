describe("Make a creature", function(){
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
	var creature1;
	var creature2;
	beforeEach(function() {
		world = new World(testWorldJSON);
		creature1 = new Creature(world,100,100,100);
		creature2 = new Creature(world,100,100,100);
	});
	it('calls onDeath',function(){
		expect('You Died').toEqual(creature1.onDeath());
	});
	it('calls move', function(){
		expect('north').toEqual(creature1.move(Direction.NORTH));
		expect('south').toEqual(creature1.move(Direction.SOUTH));
	});
});

