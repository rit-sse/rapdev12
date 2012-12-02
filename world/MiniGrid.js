/*
Initiates the MiniGrid by making an empty list of tiles.
 */
function MiniGrid(){
    this.tiles = [];
}

/*
Gives back all of the tiles that have creatures on them that the miniGrid has
 */
MiniGrid.prototype.getAllCreatures = function(){
    var creaturesList = [];
    for(var i =0; i < this.tiles.length; i++){
        if(this.tiles[i].occupant != null){
                creaturesList[creaturesList.length] = this.tiles[i];
        }

    }
    return creaturesList;
}

/*
Gives back all impassable objects on the miniGrid
 */
MiniGrid.prototype.getAllImpassableObjects = function(){
    var impassableList = [];
    for(var i =0; i < this.tiles.length; i++){
        if(tiles[i].terrain == null){
            impassableList[impassableList.length] = this.tiles[i];
        }else if(tiles[i].terrain.passable == false){
            impassableList[impassableList.length] = this.tiles[i];
        }
    }
    return impassableList;
}

/*
Adds a single tile to the miniGrid
 */
MiniGrid.prototype.addTile = function(tile){
    this.tiles[this.tiles.length] = tile;
}

exports.MiniGrid = MiniGrid;