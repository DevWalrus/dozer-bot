const { SlashCommandBuilder } = require('@discordjs/builders');
const Channel = require('../models/channel.js');
const Guild = require('../models/guild.js');
const Tools = require('../tools/tools.js')

module.exports = {
    data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Creates the utility messages')
		.setDefaultMemberPermissions(0),
	async execute(interaction) {

		console.log(`Setting up: ${interaction.guild.name}`);

		const guildEntry = await Guild.findOne({name: interaction.guild.name});

		const rulesChannelEntry = 
			await Channel.findOne({ type: 'rules', guild: guildEntry._id });
		const rolesChannelEntry = 
			await Channel.findOne({ type: 'roles', guild: guildEntry._id });
		const rulesChannel = 
			await interaction.guild.channels.cache
				.find(channel => channel.id == rulesChannelEntry.discordId);
		const rolesChannel = 
			await interaction.guild.channels.cache
				.find(channel => channel.id == rolesChannelEntry.discordId);

        await rolesChannel.bulkDelete(3, true).catch(console.warn);
        await rulesChannel.bulkDelete(1, true).catch(console.warn);

		const guildRoles = interaction.guild.roles.cache;

		const notifEmbed = require('../embeds/notif.js').execute(guildRoles);
		const rulesEmbed = require('../embeds/rules.js');
		const specialEmbed = require('../embeds/special.js').execute(guildRoles);
		const subTeamEmbed = require('../embeds/subTeam.js').execute(guildRoles);

        if (rulesChannel) {
		    var rulesMessage = await rulesChannel.send({embeds: [rulesEmbed]});
        } else {
            await interaction.reply(
            { 
                content: 'There is no Rules channel setup yet.', 
                ephemeral: true 
            });
            return;
        }
        if (rolesChannel) {
            var subTeamMessage = await rolesChannel.send({embeds: [subTeamEmbed]});
            var specialMessage = await rolesChannel.send({embeds: [specialEmbed]});
            var notifMessage = await rolesChannel.send({embeds: [notifEmbed]});
        } else {
            await interaction.reply(
            { 
                content: 'There is no Roles channel setup yet.', 
                ephemeral: true 
            });
            return;
        }

		rulesMessageEntry = 
            await Tools.updateMessageEntry(
                'rules', 
                rulesChannelEntry, 
                rulesMessage
            );
		subTeamMessageEntry = 
            await Tools.updateMessageEntry(
                'subTeam', 
                rolesChannelEntry, 
                subTeamMessage
            );
		specialMessageEntry = 
            await Tools.updateMessageEntry(
                'special', 
                rolesChannelEntry, 
                specialMessage
            );
		notifMessageEntry = 
            await Tools.updateMessageEntry(
                'notif', 
                rolesChannelEntry, 
                notifMessage
            );

        subTeamReactions = new Map([
            [
                'Drive Team', 
                [
                    parseInt ('1F3CE', 16), 
                    parseInt('FE0F', 16)
                ]
            ],
            [
                'Programming', 
                [
                    parseInt('1F4BB', 16)
                ]
            ],
            [
                'Build', 
                [
                    parseInt('1F6E0', 16), 
                    parseInt('FE0F', 16)
                ]
            ],
            [
                'Design', 
                [
                    parseInt('1F4D0', 16)
                ]
            ],
            [
                'Electrical', 
                [
                    parseInt('1F50C', 16)
                ]
            ],
            [
                'Business', 
                [
                    parseInt('1F516', 16)
                ]
            ]
        ]);

        specialReactions = new Map([
            [
                'Mentor', 
                [
                    parseInt ('1F469', 16), 
                    parseInt ('200D', 16), 
                    parseInt ('1F3EB', 16)
                ]
            ],
            [
                'Alumni', 
                [
                    parseInt ('1F468', 16), 
                    parseInt ('200D', 16), 
                    parseInt ('1F393', 16)
                ],
            ],
            [
                'Drive Coach', 
                [
                    parseInt ('1F3CE', 16), 
                    parseInt('FE0F', 16)
                ]
            ],
            [
                'Programming Lead', 
                [
                    parseInt('1F4BB', 16)
                ]
            ],
            [
                'Build Lead', 
                [
                    parseInt('1F6E0', 16), 
                    parseInt('FE0F', 16)
                ]
            ],
            [
                'Design Lead', 
                [
                    parseInt('1F4D0', 16)
                ]
            ],
            [
                'Electrical Lead', 
                [
                    parseInt('1F50C', 16)
                ]
            ],
            [
                'Business Lead', 
                [
                    parseInt('1F516', 16)
                ]
            ]
        ]);

        notifReactions = new Map([
            [
                'FIRST Notifications', 
                [
                    parseInt('1F947', 16)
                ]
            ],
            [
                'Team Notifications', 
                [
                    parseInt('1F1F9', 16)
                ]
            ],
            [
                'Game Night Notifications', 
                [
                    parseInt('1F3AE', 16)
                ]
            ]
        ]);
        
        await Tools.reactAll(subTeamReactions, guildEntry, subTeamMessageEntry, subTeamMessage);
        await Tools.reactAll(specialReactions, guildEntry, specialMessageEntry, specialMessage);
        await Tools.reactAll(notifReactions, guildEntry, notifMessageEntry, notifMessage);

        await Tools.react(
            'Team Member', 
            [
                parseInt('2705', 16)
            ], 
            guildEntry, 
            rulesMessageEntry, 
            rulesMessage
        );
	},
};
