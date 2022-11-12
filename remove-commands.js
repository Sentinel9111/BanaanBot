require("dotenv").config();
const { REST, Routes } = require('discord.js');
const token = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const fs = require('node:fs');

const rest = new REST({ version: '10' }).setToken(token);

//for specific global commands (input a commandId)
rest.delete(Routes.applicationCommand(clientId, 'commandId'))
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error);

// for all global commands
/*rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);*/