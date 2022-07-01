const { MessageEmbed } = require('discord.js');

module.exports = { 
    execute(guildRoles) {
    
        const mentorRole = guildRoles.find(role => role.name == 'Mentor');
        const alumRole = guildRoles.find(role => role.name == 'Alumni');
        const dtlRole = guildRoles.find(role => role.name == 'Drive Coach');
        const plRole = guildRoles.find(role => role.name == 'Programming Lead');
        const bulRole = guildRoles.find(role => role.name == 'Build Lead');
        const dlRole = guildRoles.find(role => role.name == 'Design Lead');
        const elRole = guildRoles.find(role => role.name == 'Electrical Lead');
        const blRole = guildRoles.find(role => role.name == 'Business Lead');

        return new MessageEmbed()
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
                });
    }
}