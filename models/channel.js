const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var channelSchema = new Schema({
	type: { type: String, required: true },
	guild: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Guild',
		required: true,
	},
	discordId: { type: String, required: true },
});

module.exports = mongoose.model('Channel', channelSchema);