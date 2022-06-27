const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var guildSchema = new Schema({
	name: { type: String, required: true },
	discordId: { type: String, required: true },
});

module.exports = mongoose.model('Guild', guildSchema);