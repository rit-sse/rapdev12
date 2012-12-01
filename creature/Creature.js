//The Creature API

function Creature(id,world,attack,defence,speed){
	this.world = world;
	this.health = 100;
	this.energy = 100;
	this.attack = attack;
	this.defence = defence;
	this.speed = speed;
};

Creature.prototype.move = function(direction){
	if (direction == Direction.NORTH){
		return 'north';
	}else if (direction == Direction.SOUTH){
		return 'south';
	}else if (direction == Direction.EAST){
		return 'east';
	}else if (direction == Direction.WEST){
		return 'west';
	}else if (direction == Direction.NORTHWEST){
		return 'northwest';
	}else if (direction == Direction.NORTHEAST){
		return 'northeast';
	}else if (direction == Direction.SOUTHWEST){
		return 'southwest';
	}else if (direction == Direction.SOUTHEAST){
		return 'southeast';
	}
};

Creature.prototype.sprint = function(direction){

};

Creature.prototype.attack = function(direction){

};

Creature.prototype.lookAround = function(){
};

Creature.prototype.sleepFor = function(time){
};

Creature.prototype.act = function(){
};

Creature.prototype.onCollision = function(object){
};

Creature.prototype.onHit = function(direction){
};

Creature.prototype.onWakeUp = function(reason){
};

Creature.prototype.onDeath = function(){
	return 'You Died';
};

Creature.prototype.onSleepTurn = function(){
};

Creature.prototype.onNoEnergy = function(){
};

Creature.prototype.setId = function(id){
	this.id = id;
}
