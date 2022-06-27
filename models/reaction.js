const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reactionSchema = new Schema({
	role: { type: String, required: true },
	unicode: { type: [Number], required: true},
	message: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message',
		required: true,
	},
    guild: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Guild',
		required: true,
	},
});

module.exports = mongoose.model('Reaction', reactionSchema);