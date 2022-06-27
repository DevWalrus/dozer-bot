const mongoose = require('mongoose');
const { uri } = require('../config.json');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        await mongoose.connect(`${uri}`);
        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
}