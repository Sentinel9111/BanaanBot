const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('solonggaybowser')
		.setDescription('So long, gay Bowser 😔'),
	async execute(interaction) {
		return interaction.reply('https://sentinel9111.github.io/SoLongGayBowser/');
	},
};