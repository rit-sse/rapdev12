/*
Represents a tile that  is on the world or in the miniGrid
 */
function Tile(occupant,terrain,row,column){
    this.occupant = occupant;
    this.terrain = terrain;
    this.row = row;
    this.col = column;
};

exports.Tile = Tile;