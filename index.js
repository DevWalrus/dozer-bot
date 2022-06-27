const fs = require('node:fs');
const path = require('node:path');
const mongoose = require('mongoose');
const { 
	Client, 
	Collection, 
	Intents 
} = require('discord.js');

const { 
	token
 } = require('./config.json');

// Create a new client instance
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS, 
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	],
	partials: [
		'MESSAGE', 
		'CHANNEL', 
		'REACTION'
	],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

mongoose.connection.on("connected", () => {
    console.log("Mongoose has successfully connected!");
  });
  // send msg if successfull connection to mongodb
  mongoose.connection.on("err", err => {
    console.error(`Mongoose connection error: \n${err.stack}`);
  });
  // send msg if error on connection
  mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose connection lost");
  });

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Login to Discord with your client's token
client.login(token);
