// Version: 2.6.1

require("dotenv").config();
const { Client, Intents } = require('discord.js');
const { autocorrect, disableAutocorrect } = require("./autocorrect.js");

const token = process.env.BOT_TOKEN;
const commandPrefix = process.env.COMMAND_PREFIX;

// Create a new client instance
const client = new Client({
	intents: [
		//Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGES,
 		//Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
 		//Intents.FLAGS.DIRECT_MESSAGE_TYPING,
 		Intents.FLAGS.GUILDS,
 		//Intents.FLAGS.GUILD_BANS,
 		//Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
 		//Intents.FLAGS.GUILD_INTEGRATIONS,
 		//Intents.FLAGS.GUILD_INVITES,
 		//Intents.FLAGS.GUILD_MEMBERS,
 		//Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
 		//Intents.FLAGS.GUILD_MESSAGE_TYPING,
 		//Intents.FLAGS.GUILD_PRESENCES,
 		//Intents.FLAGS.GUILD_VOICE_STATES,
 		//Intents.FLAGS.GUILD_WEBHOOKS
	]
});

client.once('ready', () => {
	console.log('Ready!');
});

const commands = {
	"help": help,
	"dictionary": dictionary,
	"solonggaybowser": gaybowser,
	"slgb": gaybowser,
	"braadworstspring": skeerogame,
	"bws": skeerogame,
	//"walcrack": walcrack,
	//"walcoin": walcrack,
	"credits": credit,
}

function help(msg) {
	let ret = "Lijst van commands:";
	for (const command in commands) {
		ret += "\n- " + commandPrefix + command;
	}
	ret += "\n\nVoor meer hulp, ga naar: https://sentinel9111.github.io/BanaanBotWebsite/ of DM/ping Sentinel#3827 voor suggesties."
	return ret;
}

function gaybowser(msg) {
	return "https://sentinel9111.github.io/SoLongGayBowser/";
}

function dictionary(msg) {
	return "https://sentinel9111.github.io/BanaanBotWebsite/";
}

function skeerogame(msg) {
	return "https://theepicblock.nl/braadworstspring";
}

/*
function walcrack(msg) {
	return "http://matsw.tk/www/Discord/WalCrack.html";
}
*/

function credit(msg) {
	return "Gemaakt door Sentinel met veel hulp van TheEpicBlock_TEB, MichaHere, Walcraft22, Foxite, Zorian & SK"
}

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
				await msg.reply("Bedoelde je: " + autocorrectResult + "?");
			}
		}
	} catch (e) {
		console.error("Unexpected error: ", e)
	}
});

client.login(token);


/*
Known bugs:

Plans:
-Dockerize bot inside of Pterodactyl.
-The bot should send a better help menu inside of Discord.
-The bot should replace your message with a webhook.
-The bot should change the corrected message back to the original message if you reply with "Nee" or "No".
-You should be able to enable or disable certain features or words per server.
-A leveling system which gives XP if you use words from the Kase language should be added.
-Banaanbot hater role.
*/
