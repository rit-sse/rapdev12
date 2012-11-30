//Creature.js

//Creature class
function Creature(name, speed, pos) {
  this.name = name;
  this.speed = speed;
  this.pos = pos;
  this.alive = false;
  this.canMove = false;
}

Creature.prototype.Move = function(){
  if (canMove){
    //move
    }
  else{
    console.log("The creature cant move (bool canMove = false)");
  }
};

Creature.prototype.canIMoveWorld = function(){

};

Creature.prototype.setCanMove = function(state){
  this.canMove = state;
};

Creature.prototype.isAlive = function(){
  return this.alive;
};

Creature.prototype.Stop = function(){
  
};
