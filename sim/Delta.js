/**
 * Constructor for the Delta object
 * @param {Array<Operation>} [operations] The operations needed to bring the client to the current game state
 */
function Delta(operations) {
	// Store a UNIX timestamp for when the delta was created
	this.timestamp = (new Date()).getTime();
	if(operations) {
		this.operations = operations;
	} else {
		this.operations = [];
	}
}

exports.Delta = Delta;
