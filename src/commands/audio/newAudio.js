const { SlashCommandBuilder } = require("discord.js");
const AudioService = require('../../services/audio.service');
const ClientService =   require('../../services/client.service');

const _audioService = new AudioService();
const _clientService = new ClientService();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newaudio')
        .setDescription("Cria um novo áudio para ser utilizado com a função /play.")
        .addAttachmentOption((option) => option.setDescription("Arquivo de áudio").setName("audio").setRequired(true))
        .addStringOption((option) => option.setName("nome").setDescription("nome do audio").setRequired(true)),

    async execute(interaction) {
        console.log(interaction.options.get('audio'));
        const attachment = interaction.options.get('audio').attachment;
        const audioName = interaction.options.get('nome').value;
        if(attachment.name.endsWith('.mp3')) {
            _audioService.addAudio(audioName, attachment);
            interaction.reply("Áudio adicionado!");
        }
        else interaction.reply("O Arquivo deve ser em formato mp3.");
    }
}