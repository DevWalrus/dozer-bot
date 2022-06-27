const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
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

		const dtRole = guildRoles.find(role => role.name == 'Drive Team');
		const pRole = guildRoles.find(role => role.name == 'Programming');
		const buRole = guildRoles.find(role => role.name == 'Build');
		const dRole = guildRoles.find(role => role.name == 'Design');
		const eRole = guildRoles.find(role => role.name == 'Electrical');
		const bRole = guildRoles.find(role => role.name == 'Business');
		const mentorRole = guildRoles.find(role => role.name == 'Mentor');
		const alumRole = guildRoles.find(role => role.name == 'Alumni');
		const dtlRole = guildRoles.find(role => role.name == 'Drive Coach');
		const plRole = guildRoles.find(role => role.name == 'Programming Lead');
		const bulRole = guildRoles.find(role => role.name == 'Build Lead');
		const dlRole = guildRoles.find(role => role.name == 'Design Lead');
		const elRole = guildRoles.find(role => role.name == 'Electrical Lead');
		const blRole = guildRoles.find(role => role.name == 'Business Lead');
		const firstRole = guildRoles.find(role => role.name == 'FIRST Notifications');
		const teamRole = guildRoles.find(role => role.name == 'Team Notifications');
		const GNRole = guildRoles.find(role => role.name == 'Game Night Notifications');

		const rulesEmbed = new MessageEmbed()
			.setColor('#009cd7')
			.setDescription('Before posting, take a minute to look at the \
				following guidelines.\n\
				**test**')
			.setTitle('Rules')
			.addFields(
				{
					name: '0. Please change your nickname in the server to your preferred name.', 
					value: '\u200b'
				},
				{
					name: '1. Maintain respect toward others and the opinions of others.', 
					value: '\
					- Treat others as you\'d like to be treated.\n\
					- No racism or hate speech targeted towards any group or \
					person.\n\
					- Limit discussions of polarizing topics, such as politics \
					or religion.' 
				},
				{
					name: '2. Be mindful of the individual channels & their usage.',
					value: '\u200b'
				},
				{
					name: '3. Do not excessively ping or spam.',
					value: '\u200b'
				},
				{
					name: '4. "Not Safe For Work" (NSFW) and/or illegal content is not permitted.',
					value: '\u200b'
				},
				{
					name: '5. Listen to Mods, Admins, and especially Mentors, what they say is final.',
					value:'\
					- If you think someone is abusing their power, please talk \
					to another Mentor or Mod in private after.'
				},
				{
					name: '6. Use some common sense',
					value:'\
					- We are still related to the school, so abide by school\
					policy. \n\
					- That includes keeping things like profanity to a minimum'
				},
				{
					name: 'React with :white_check_mark: to this message to be granted access to the server',
					value: '\u200b'
				},
			);
		const subTeamEmbed = new MessageEmbed()
			.setColor('#009cd7')
			.setDescription('You must be in the role of your Sub Team in order \
				to talk in the Sub Team focused channels. Once you make your \
				selection(s), the applicable channels should show up in the\
				channels section of the server.')
			.setTitle('Role Menu: Sub-Team')
			.addFields(
				{ 
					name: 'Drive Team', 
					value: 
						`:race_car:: ${dtRole ? `${dtRole}` : "role not found"}` 
				},
				{
					name: 'Programming',
					value:
						`:computer:: ${pRole ? `${pRole}` : "role not found"}`
				},
				{
					name: 'Build',
					value:
						`:tools:: ${buRole ? `${buRole}` : "role not found"}`
				},
				{
					name: 'Design',
					value:
						`:triangular_ruler:: ${dRole ? `${dRole}` : "role not found"}`
				},
				{
					name: 'Electrical',
					value:
						`:electric_plug:: ${eRole ? `${eRole}` : "role not found"}`
				},
				{
					name: 'Business',
					value:
						`:bookmark:: ${bRole ? `${bRole}` : "role not found"}`
				},
			);
		const specialEmbed = new MessageEmbed()
			.setColor('#009cd7')
			.setDescription('These rolls allow for a bit more accessibility, \
				such as inviting people to the direct channels, and seeing all \
				of the Sub Team channels. You must be in a Sub Team, the \
				previous message, in order to register as the Sub Team Lead.')
			.setTitle('Role Menu: Special Roles')
			.addFields(
				{ 
					name: 'Mentor', 
					value: 
						`:woman_teacher:: ${mentorRole ? `${mentorRole}` : "role not found"}` 
				},
				{ 
					name: 'Alumni', 
					value: 
						`:man_student:: ${alumRole ? `${alumRole}` : "role not found"}` 
				},
				{ 
					name: 'Drive Team Lead', 
					value: 
						`:race_car:: ${dtlRole ? `${dtlRole}` : "role not found"}` 
				},
				{
					name: 'Programming Lead',
					value:
						`:computer:: ${plRole ? `${plRole}` : "role not found"}`
				},
				{
					name: 'Build Lead',
					value:
						`:tools:: ${bulRole ? `${bulRole}` : "role not found"}`
				},
				{
					name: 'Design Lead',
					value:
						`:triangular_ruler:: ${dlRole ? `${dlRole}` : "role not found"}`
				},
				{
					name: 'Electrical Lead',
					value:
						`:electric_plug:: ${elRole ? `${elRole}` : "role not found"}`
				},
				{
					name: 'Business Lead',
					value:
						`:bookmark:: ${blRole ? `${blRole}` : "role not found"}`
				},
			);
		const notifEmbed = new MessageEmbed()
			.setColor('#009cd7')
			.setDescription('These are not at all required, but if you would \
				like to be pinged whenever there is a meeting or whenever a \
				FIRST blog is posted, and its TLDR, you can register here.\n \
				If you join the Game Night Notifications, you will also have \
				access to the Game Night Channel.')
			.setTitle('Role Menu: Notification Settings')
			.addFields(
				{ 
					name: 
						'First Notifications (Comp. Updates, Blog Posts, Etc.)', 
					value: 
						`:first_place:: ${firstRole ? `${firstRole}` : "role not found"}` 
				},
				{ 
					name: 
						'Team Notifications (Team Meetings, Outreach Reminders, Etc.)', 
					value: 
						`:regional_indicator_t:: ${teamRole ? `${teamRole}` : "role not found"}` 
				},
				{ 
					name: 
						`Game Night Notifications`, 
					value: 
						`:video_game:: ${GNRole ? `${GNRole}` : "role not found"}` 
				},
			);

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
