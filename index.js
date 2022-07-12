// Version: 2.5.1

require("dotenv").config();
const { Client, Intents } = require('discord.js');
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
	return "Gemaakt door Sentinel met behulp van TheEpicBlock_TEB, MichaHere, Walcraft22 & Foxite"
}

// source: Woordenboek K - Nederlands (https://docs.google.com/document/d/1lavyuSKmQSTa-GWlmRY5kel-iEe6wuf5_VkqlgXtA7M/mobilebasic)
function autocorrect(msg) { //all replacements
	const replacements = {
		"nice": "🤧",
		"ja": "🧅",
		"een dom persoon": "aardappel",
		"een oude computer": "aardappel",
		"het antwoord op alles": "ankergetal",
		"kromme fruitsoort": "banaan",
		"geweldig": "banaan",
		"schiet op jij slome slak!": "besta sneller",
		"kan letterlijk elk werkwoord betekenen aan de hand van de context": "consumeren", // too specific
		"though": "deeg",
		"kan letterlijk elk woord betekenen": "deur", // too specific
		"doei": "kom met me mee",
		"de deur dicht, maar niet op slot doen": "door de deur de deur dicht doen",
		"scramblen": "door de midden halen",
		"frans": "flut",
		"no offence": "geen uit-hek",
		"geluiden": "geluiten",
		"graphic": "graphic",
		"hersenen": "grote roze hoofd-spons",
		"hoofdingang": "head-in-hallway",
		"heel erg": "heg",
		"hoe laat is het": "hoe tijd is het",
		"hey": "ga weg",
		"hoi": "I wish you a merry x-mas, I wish you a merry x-mas, I wish you a merry x-mas and a happy new year",
		"jep": "Jeb",
		"jou": "jij",
		"de taal k": "Kaas",
		"kapot": "kapto",
		"leven": "leverpastei",
		"blijheid": "Llanfair­pwllgwyngyll­gogery­chwyrn­drobwll­llan­tysilio­gogo­goch",
		"ghast": "Marshmallow",
		"ster": "meester",
		"maandag die flut is": "mehndag", // perhaps too specific
		"steve jobs": "Minecraft-hoofdpersonage Banen",
		"natuurkunde": "NASK",
		"natoerkunde": "NASK min SK",
		"no-lifer": "olijfer",
		"o&o": "oooo",
		"de wortel van iets berekenen": "ergens een wortel op pleuren", //perhaps too specific
		"updaten": "omhoogdatumen",
		"pdof": "Portable Document... Oh, and it's a Format",
		"presentatie": "presnentation",
		"appeltaart": "rabbeldebabsquiche",
		"appel": "rabbeldebabski",
		"dingen die random zijn": "randomerigheden",
		"kieran": "Randomerigheden",
		"rasp": "raps",
		"reageert": "rea-Gert",
		"bill gates": "Rekening Poorten",
		"mensen uit groep acht": "rivieren",
		"de lichtelijke irritatie van iemand die lichtelijk geïrriteerd is": "superieure kracht van de woede van de aandachtige Juno door de woede",
		"woede": "**LLANFAIRPWLLGWYNGYLLGOGERYCHWYRNDROBWLLLLANTYSILIOGOGOGOCH!!!**",
		"endportal gateway": "TicTac Endportal",
		"flut": "tomaat",
		"mensen uit klassen hoger dan die van jou": "tunnels", // too specific
		"laptop": "uit de kluiten gewassen klaptelefoon",
		"wat is dit": "wat is these",
		"wat zijn de specs": "wat voor laptop zit er in", // too specific
		"wesp": "weps",
		"hond": "woef",
		"slapen": "z'tjes consumeren",
		// end of dictionary K - Nederlands
		"bedoelde je: aardappel?": "Aardappel",
		"worst case": "worst kaas",
		"patat": "friet",
		"friet": "patat",
		"oof": "🥚",
		"belgie": "Benederland",
		"belgië": "Benederland",
		"madagaskar": "Mad at gas car",
		"helaas": "gekaasfondued",
		"gtw": "Gouden Thierry Wagen",
		"link": "Golden Mario",
		"verwijderd": "verweitert",
		"wordt": "wort",
		"word": "wort",
		//"o": "OwO", //
		//"u": "UwU", //
		//"t": "TwT", //
	};

	// Lowercase version of the message. We search this string for the terms, but if we don't find a term somewhere,
	// we keep the character from the original version.
	const msgLowercase = msg.content.toLowerCase();
	let changed = false;
	let result = "";
	searchString:
	for (let i = 0; i < msgLowercase.length; i++) {
		searchTerms:
		// for..in iterates over keys. term is the key in the dictionary above.
		for (const term in replacements) {
			// Check if the term matches msgLowercase at i
			let j = 0;
			for (; j < term.length && i + j < msgLowercase.length; j++) {
				if (term[j] !== msgLowercase[i + j]) {
					// If the character in the term does not match msgLowercase, move on to the next term.
					continue searchTerms;
				}
			}
			if (j < term.length) {
				// we broke out of the loop because we reached the end of the message, not because the word is a match
				continue searchTerms;
			}
			// If we got here, it means we broke out of the loop because we reached the end of the term, and so the term is at msgLowercase[i].
			// Stop searching for more terms, and increase i by the length of the term we added.
			const replacement = replacements[term];
			result += replacement;
			changed = true;
			i += term.length - 1; // -1 because the for loop increases it by 1
			continue searchString;
		}
		// If we got here, it means there is no term at msgLowercase[i].
		result += msg.content[i];
	}

	if (changed) {
		result = "Bedoelde je: " + result + "?";	// Bedoelde je: ?

		if (result.length >= 2000) { // if message is too long, send something else
			msg.reply("Stop pesten 😭");
		} else if (result !== msg.content) { // otherwise send the message
			msg.reply(result);
		}
	}
}

client.on('messageCreate', (msg) => { // if message author is a bot, don't send message
    if(msg.author.bot){
        return;
    }

    if (msg.content.startsWith(commandPrefix)) {
        const command = msg.content.toLowerCase().substring(commandPrefix.length);
        try{
            const commandFunction = commands[command];
			// If the command is not recognized, don't respond
			if (commandFunction) {
				const result = commandFunction(msg);
				if (!result) {
					console.error("trying to send null or empty string");
				} else if (result.length >= 2000) {
					console.error("trying to send message over 2000 characters");
				} else {
					msg.reply(result);
				}
			}
        }catch(e){
            console.log("Unexpected error: "+e)
        }
    } else {
        autocorrect(msg);
    }
});

client.login(token);


/*
Known bugs:

Plans:
-Automatic Bot updates on rpi
-The bot should send a better help menu inside of Discord.
-The bot should replace your message with a webhook.
-The bot should change the corrected message back to the original message if you reply with "Nee" or "No".
-You should be able to enable or disable certain features or words per server.
-A leveling system which gives XP if you use words from the Kase language should be added.
-Banaanbot hater role.
*/
