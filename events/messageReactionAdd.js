const Tools = require('../tools/tools.js');
const { clientId } = require('../config.json');

module.exports = {
    name: 'messageReactionAdd',
    async execute(reaction, user) {

        if (user.id == clientId) return;

        const reactionEntry = await Tools.getReaction(reaction);

        if (!reactionEntry) {
            reaction.remove();
            return;
        } else if (reactionEntry == -1) {
            return;
        }

        const guild = reaction.message.guild;
        const guildRoles = guild.roles.cache;

		const desiredRole = 
            guildRoles.find(role => role.name == reactionEntry.role);

        if(desiredRole) {
            console.log(`Adding ${reactionEntry.role} to ${user.tag}`);
            guild.members.cache.get(user.id).roles.add(desiredRole.id);
        } else {
            console.log(`Could not find ${reactionEntry.role} to give to ${user.tag}`);
        }
    }
}

