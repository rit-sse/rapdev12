function MiniGrid(){
    this.tiles = null;
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

MiniGrid.prototype.addTile = function(tile){
    if(this.tiles == null){
        this.tiles[0] = tile;
    } else {
        this.tiles[this.tiles.length] = tile;
    }
}