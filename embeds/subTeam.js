const { MessageEmbed } = require('discord.js');

module.exports = { 
    execute(guildRoles) {
        
        const dtRole = guildRoles.find(role => role.name == 'Drive Team');
        const pRole = guildRoles.find(role => role.name == 'Programming');
        const buRole = guildRoles.find(role => role.name == 'Build');
        const dRole = guildRoles.find(role => role.name == 'Design');
        const eRole = guildRoles.find(role => role.name == 'Electrical');
        const bRole = guildRoles.find(role => role.name == 'Business');

        return new MessageEmbed()
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
                });
    }
}