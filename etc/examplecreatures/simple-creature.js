var monster = new Creature(null, 100, 100, 100);

monster.act = function() {
    this.move(Direction.NORTH);
};

