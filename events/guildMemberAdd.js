const Channel = require('../models/channel.js');
const Guild = require('../models/guild.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(user) {

        const guildEntry = await Guild.findOne({name: user.guild.name});

        const welcomeChannelEntry = 
			await Channel.findOne({ type: 'welcome', guild: guildEntry._id });
        const rulesChannelEntry = 
			await Channel.findOne({ type: 'rules', guild: guildEntry._id });
		const rolesChannelEntry = 
			await Channel.findOne({ type: 'roles', guild: guildEntry._id });
        const logChannelEntry = 
            await Channel.findOne({ type: 'log', guild: guildEntry._id });
        const welcomeChannel = await user.guild.channels.cache
		    .find(channel => channel.id == welcomeChannelEntry.discordId);
		const rulesChannel = await user.guild.channels.cache
            .find(channel => channel.id == rulesChannelEntry.discordId);
		const rolesChannel = await user.guild.channels.cache
            .find(channel => channel.id == rolesChannelEntry.discordId);
        const logChannel = await user.guild.channels.cache
            .find(channel => channel.id == logChannelEntry.discordId);

        console.log("Sending Welcome Message...");
        if (welcomeChannel) {
            welcomeChannel.send(`Welcome ${user}! Please make sure to read the rules found in ${rulesChannel} before continuing. Once you do that, you can chose your roles in ${rolesChannel}!`);
        } else {
            console.warn("Welcome channel not found.");
        }

        if (logChannel) {
            logChannel.send(`${user} joined the server.`);
        } else {
            console.warn("Log channel not found.");
        }
    }
}