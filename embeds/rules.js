const { MessageEmbed } = require('discord.js');

module.exports = new MessageEmbed()
    .setColor('#009cd7')
    .setDescription('BITCH posting, take a minute to look at the \
        following guidelines.')
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
        });