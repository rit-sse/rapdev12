describe("Make a creature", function(){
	var creature1;
	var creature2;
	beforeEach(function() {
		creature1 = new Creature();
		creature2 = new Creature();
	});
	it('calls onDeath',function(){
		expect('You Died').toEqual(creature1.onDeath());
	});
});

