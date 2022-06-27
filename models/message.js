const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var messageSchema = new Schema({
	type: { type: String, required: true },
	discordId: { type: String, required: true },
	channel: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Channel',
		required: true,
	},
});

module.exports = mongoose.model('Message', messageSchema);