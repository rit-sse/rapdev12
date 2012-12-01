function World( jsonObject ) {
	
	
	this.creatures = {};
	
	this.activeCreatures = {};
	
	this.terrain = jsonObject.terrain;
	
	this.map = [];
	for(var i=0; i<jsonObject.map.length; i++){
		currentRow = jsonObject.map[i];
		this.map.push([]);
		for(var j=0; j < curretnRow.length; j++){
			currentCol = currentRow[j];
			this.map[i].push(  jsonObject.map[i][j]  );
		};
	};
	
	this.items = {};
	
};

World.prototype.addCreature = function( creature ){
	
};

World.prototype.populateWithItems = function(){
	
};

World.prototype.getTile = function(x, y){
	
};

World.prototype.getTerrainAtTile = function(x, y){
	
};

World.prototype.getInhabitantAtTile = function(x, y){
	
};

World.prototype.getItemAtTile = function(x, y){
	
};

var world = new World( /*my favorite json object*/ );