module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (interaction.isCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
                await interaction.reply(
                    {
                        content: 'Setup successful!',
                        ephemeral: true
                    });
            } catch (error) {
                console.error(error);
                await interaction.reply(
                    {
                        content: 'There was an error while executing this command!',
                        ephemeral: true
                    });
            }
        } else if (interaction.isButton()) {
            console.log(interaction);
        } else {
            return;
        }
    }
}