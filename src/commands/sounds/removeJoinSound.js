const { SlashCommandBuilder } = require('discord.js');
const SoundService = require("../../services/sound.service");

const _soundService = new SoundService();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removejoinsound')
        .setDescription('Remove seu áudio atual de entrava em canal de voz.'),

    async execute(interaction) {
        _soundService.removeAudio(interaction.user.id);
        interaction.reply("Áudio removido!");
    }

}