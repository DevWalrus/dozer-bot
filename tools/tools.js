const Reaction = require('../models/reaction.js');
const Message = require('../models/message.js');

module.exports.getReaction = async (reaction) => {

    let codePointArr = [];
    for (let codePoint of reaction.emoji.name) {
        codePointArr.push(codePoint.codePointAt(0));
    }

    const messageEntry = await Message.findOne(
        { discordId: reaction.message.id });

    if (!messageEntry) return -1;

    const reactionEntry = await Reaction.findOne(
        {
            unicode: codePointArr, 
            message: messageEntry._id,
        });

    return reactionEntry;

}

module.exports.updateMessageEntry = async (type, channelEntry, message) => {
    let messageEntry = 
        await Message.findOne(
            {type: type, channel: channelEntry._id});

    if (!messageEntry) {
        messageEntry = new Message({
            type: type,
            id: message.discordId,
            channel: channelEntry._id
        });
    } else {
        messageEntry.discordId = message.id;
    }
    messageEntry.save().catch( err => {
        console.warn(err);
    });

    return messageEntry;
}

module.exports.react = async (role, code, guildEntry, messageEntry, message) => {
    let reactionEntry = 
        await Reaction.findOne(
            {role: role, unicode: code, guild: guildEntry._id});

    if (!reactionEntry) {
        reactionEntry = new Reaction({
            role: role, 
            unicode: code,
            message: messageEntry._id,
            guild: guildEntry._id
        });
    } else {
        reactionEntry.message = messageEntry._id;
    }
    await reactionEntry.save().catch( err => {
        console.warn(err);
    });

    message.react(String.fromCodePoint(...code));

    return reactionEntry;
}

module.exports.reactAll = async (roles, guildEntry, messageEntry, message) => {
    for (const entry of roles) {
        await this.react(entry[0], entry[1], guildEntry, messageEntry, message);
    }
}