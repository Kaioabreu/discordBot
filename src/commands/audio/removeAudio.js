const {SlashCommandBuilder} = require("discord.js");
const AudioService = require("../../services/audio.service");

_audioService = new AudioService();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removeaudio')
        .setDescription('Remove um áudio ja salvo no bot.')
        .addStringOption((option) => option.setName("nome").setDescription("nome do audio").setRequired(true)),

    async execute(interaction) {
        _audioService.removeAudio(interaction.options.get('nome').value);
        interaction.reply("Áudio removido!");
    }

}