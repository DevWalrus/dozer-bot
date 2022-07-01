const { SlashCommandBuilder } = require('@discordjs/builders');
const Tools = require('../tools/tools.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('refresh')
		.setDescription('Refreshes the utility messages')
		.setDefaultMemberPermissions(0),
	async execute(interaction) {

        const guildRoles = interaction.guild.roles.cache;

        delete require.cache[require.resolve('../embeds/notif.js')];
        delete require.cache[require.resolve('../embeds/rules.js')];
        delete require.cache[require.resolve('../embeds/subTeam.js')];
        delete require.cache[require.resolve('../embeds/special.js')];

        const rulesEmbed = require('../embeds/rules.js');
		const subTeamEmbed = require('../embeds/subTeam.js').execute(guildRoles);
		const specialEmbed = require('../embeds/special.js').execute(guildRoles);
        const notifEmbed = await require('../embeds/notif.js').execute(guildRoles);

        const rulesMessage = await Tools.findMessage(interaction.guild, 'rules', 'rules');
        const subTeamMessage = await Tools.findMessage(interaction.guild, 'roles', 'subTeam');
        const specialMessage = await Tools.findMessage(interaction.guild, 'roles', 'special');
        const notifMessage = await Tools.findMessage(interaction.guild, 'roles', 'notif');
        
        await rulesMessage.edit({embeds: [rulesEmbed]});
        await subTeamMessage.edit({embeds: [subTeamEmbed]});
        await specialMessage.edit({embeds: [specialEmbed]});
        await notifMessage.edit({embeds: [notifEmbed]});
        
        await interaction.reply(
            { 
                content: 'Refresh Complete', 
                ephemeral: true 
            });
    }
}