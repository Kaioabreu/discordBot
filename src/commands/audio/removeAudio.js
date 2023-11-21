const {SlashCommandBuilder} = require("discord.js");
const AudioService = require("../../services/audio.service");

_audioService = new AudioService();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removeaudio')
        .setDescription('Remove um áudio ja salvo no bot.')
        .addStringOption((option) => option.setName("nome").setDescription("nome do audio").setRequired(true)),

    async execute(interaction) {
        const audioName = interaction.options.get('nome').value;
        if(_audioService.hasSound(audioName))
        {
            _audioService.removeAudio(audioName);
            interaction.reply("Áudio removido!");
        }
        else 
        {
            interaction.reply("Áudio não encontrado!");
        }
    }

}