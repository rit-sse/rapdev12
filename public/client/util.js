
//Javascript way of making Array.randomVal() into a function on all arrays            
Array.prototype.randomVal = function() {
    return this[Math.floor(Math.random()*this.length)]
}