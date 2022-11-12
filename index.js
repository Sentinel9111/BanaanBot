require("dotenv").config();
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { autocorrect, disableAutocorrect } = require("./autocorrect.js");
const fs = require('node:fs');
const path = require('node:path');

const token = process.env.BOT_TOKEN;
const commandPrefix = process.env.COMMAND_PREFIX;

// Create a new client instance
const client = new Client({
	intents: [
		 GatewayIntentBits.Guilds,
		 GatewayIntentBits.GuildMessages,
		 GatewayIntentBits.MessageContent,
		//  GatewayIntentBits.GuildMembers,
	]
});

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async (msg) => {
	// if message author is a bot, don't send message
	if (msg.author.bot) {
		return;
	}

	if (msg.reference) {
		const reference = await msg.fetchReference();
		if (reference.author.id === msg.client.user.id && msg.content === "bek houwe") {
			disableAutocorrect(msg.channelId);

			return;
		}
	}

	try {
		if (msg.content.startsWith(commandPrefix)) {
			const command = msg.content.toLowerCase().substring(commandPrefix.length);
			const commandFunction = commands[command];
			// If the command is not recognized, don't respond
			if (commandFunction) {
				const result = commandFunction(msg);
				if (!result) {
					console.error("trying to send null or empty string");
				} else if (result.length >= 2000) {
					console.error("trying to send message over 2000 characters");
				} else {
					await msg.reply(result);
				}
			}
		} else {
			const autocorrectResult = autocorrect(msg);
			if (autocorrectResult) {
				if (autocorrectResult.length >= 2000) {
					const sobEmoji = "😭"; // It's there, I promise. Your IDE's font may not be able to render it.
					await msg.reply("Stop pesten " + sobEmoji);
				} else {
					await msg.reply({
						content: "Bedoelde je: " + autocorrectResult + "?",
						allowedMentions: {
							parse: [],
							users: [],
							roles: [],
							repliedUser: false
						}
					});
				}
			}
		}
	} catch (e) {
		console.error("Unexpected error: ", e)
	}
});
// slash commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);