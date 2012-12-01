
//OR, change it to this:

Object.defineProperty(Array.prototype, "randomVal", {
    value: function() {
		return this[Math.floor(Math.random() * this.length)];
	},
    writable: true, //Can be overwritten (security or something)
    enumerable: false, //Won't be itterated over (Not having this is why people don't advise prototyping)
    configurable: true //Relates to being delete-able
});