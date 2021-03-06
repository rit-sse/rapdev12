/**
 * Represents a tile in the world and miniGrid
 *
 * @param occupant
 * @param terrain
 * @param row
 * @param column
 * @constructor
 */
function Tile(occupant,terrain,row,column){
    this.occupant = occupant;
    this.terrain = terrain;
    this.row = row;
    this.col = column;

    this.toString = function() {
        return "row: " + this.row + " col: " + this.col;
    }
};

exports.Tile = Tile;