const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('credits')
        .setDescription('credits'),
	async execute(interaction) {
		return interaction.reply('Gemaakt door Sentinel met veel hulp van Foxite, TheEpicBlock_TEB, MichaHere, Walcraft22 & Zorian');
	},
};