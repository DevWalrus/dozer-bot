const Channel = require('../models/channel.js');
const Guild = require('../models/guild.js');

module.exports = {
    name: 'guildMemberRemove',
    async execute(user) {

        const guildEntry = await Guild.findOne({name: user.guild.name});

        const logChannelEntry = 
			await Channel.findOne({ type: 'log', guild: guildEntry._id });
        const logChannel = await user.guild.channels.cache
		    .find(channel => channel.id == logChannelEntry.discordId);
        
        console.log("Sending Leaving Message...");
        if (logChannel) {
            logChannel.send(`${user} left the server.`);
        } else {
            console.warn("Channel not found.");
        }
    }
}