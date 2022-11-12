const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('braadworstspring')
		.setDescription('Sends a link to braadworst spring.'),
	async execute(interaction) {
		return interaction.reply('https://theepicblock.nl/braadworstspring');
	},
};