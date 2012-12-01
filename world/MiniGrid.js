function MiniGrid(tiles){
    this.tiles = tiles;
}

MiniGrid.prototype.getAllCreatures = function(){
    var creaturesList = [];
    for(var i =0; i < this.tiles.length; i++){
        try{
            parseInt(this.tiles[i].occupant);
            creaturesList[length + 1] = this.tiles[i];
        }catch(err){

        }
    }
    return creaturesList;
}

MiniGrid.prototype.getAllImpassableObjects = function(){
    var impassableList = [];
    for(var i =0; i < this.tiles.length; i++){
        if(tiles[i].passable == false){
               impassableList[length + 1] = this.tiles[i];
        }
    }
    return impassableList;
}