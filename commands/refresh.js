const { SlashCommandBuilder } = require('@discordjs/builders');
const Tools = require('../tools/tools.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('refresh')
		.setDescription('Refreshes the utility messages')
		.setDefaultMemberPermissions(0),
	async execute(interaction) {

        const guildRoles = interaction.guild.roles.cache;

		//const rulesEmbed = require('../embeds/rules.js');
		//const subTeamEmbed = require('../embeds/subTeam.js').execute(guildRoles);
		//const specialEmbed = require('../embeds/special.js').execute(guildRoles);
        const notifEmbed = require('../embeds/notif.js').execute(guildRoles);

        //const rulesMessage = await Tools.findMessage(interaction.guild, 'rules', 'rules');
        //const subTeamMessage = await Tools.findMessage(interaction.guild, 'roles', 'subTeam');
        //const specialMessage = await Tools.findMessage(interaction.guild, 'roles', 'special');
        const notifMessage = await Tools.findMessage(interaction.guild, 'roles', 'notif');

        //await rulesMessage.edit(rulesEmbed);
        //await subTeamMessage.edit(subTeamEmbed);
        //await specialMessage.edit(specialEmbed);
        await notifMessage.edit(notifEmbed).then(console.log);
    }
}