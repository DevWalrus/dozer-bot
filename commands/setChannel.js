const { SlashCommandBuilder } = require('@discordjs/builders');
const Tools = require('../tools/tools.js')

module.exports = {
    data: new SlashCommandBuilder()
		.setName('setchannel')
		.setDescription('Set one of the setup channels')
		.setDefaultMemberPermissions(0)
        .addStringOption ( option => 
            option.setName('type')
            .setDescription('The type of the channel to set')
            .addChoices(
                { name: 'welcome', value: 'welcome' },
                { name: 'rules', value: 'rules' },
                { name: 'roles', value: 'roles' },
                { name: 'log', value: 'log' })
            .setRequired(true))
        .addChannelOption( option => 
            option.setName('channel')
                .setDescription('The channel to set')
                .setRequired(true)),
	async execute(interaction) {
        const type = interaction.options.getString('type');
        const channel = interaction.options.getChannel('channel');
        if (!channel.isText()) {
            await interaction.reply(
                { 
                    content: 'A text channel must be provided', 
                    ephemeral: true 
                });
        } else {
            await Tools.setChannel(type, channel);
            await interaction.reply(
                {
                    content: `${channel.name}#${channel.id} has been set to ${type}`,
                    ephemeral: true
                });
        }
    }
}