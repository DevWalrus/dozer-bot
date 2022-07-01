
const { MessageEmbed } = require('discord.js');

module.exports = { 
    execute(guildRoles) {
        const firstRole = guildRoles.find(role => role.name == 'FIRST Notifications');
        const teamRole = guildRoles.find(role => role.name == 'Team Notifications');
        const GNRole = guildRoles.find(role => role.name == 'Game Night Notifications');

        return new MessageEmbed()
            .setColor('#009cd7')
            .setDescription('These are not at all required, but if you would \
                like to be pinged whenever there is a meeting or whenever a \
                FIRST blog is posted, and its TLDR, you can register here.\n \
                If you join the Game Night Notifications, you will also have \
                access to the Game Night Channel.')
            .setTitle('Bithc')//.setTitle('Role Menu: Notification Settings')
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
                });
    }
}