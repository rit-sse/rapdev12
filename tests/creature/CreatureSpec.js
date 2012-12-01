describe("Make a creature", function()){
	var creature;
	beforeEach(function() {
		creature = new Creature();
	});
	it('calls onDeath', function(){
		expect('You Died').toEqual(creature.onDeath());
	});
});
