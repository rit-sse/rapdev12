//Creature.js

var name;
var speed;
var pos;
var canMove=false;

//Creature class
function Creature() {
  this.name = name;
  this.speed = speed;
  this.pos = pos;
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

Creature.prototype.Stop = function(){
  
};
