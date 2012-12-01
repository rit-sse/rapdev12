/**
 * Constructor for the Operation object
 * @param {String} type The type of operation (e.g., creature, terrain)
 * @param {String} action
 * @param {Object} data
 */
function Operation(type, action, data) {
	this.type = type;
	this.action = action;
	this.data = data;
}

exports.Operation = Operation;
