function World() {
  this.size = 9001;
  this.tiles = make2DArray(this.size);
}

//See http://stackoverflow.com/a/6495274/406249
function make2DArray(size) {
  size = size > 0 ? size : 0;
  var arr = [];

  while(size--) {
    arr.push([]);
  }

  return arr;
}
