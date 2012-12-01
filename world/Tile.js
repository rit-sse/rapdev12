function Tile(occupant,terrain,inhabitable, row,column){
    this.occupant = occupant;
    this.terrain = terrain;
    this.row = row;
    this.column = column;
    this.inhabitable = inhabitable;
};

exports.Tile = Tile;