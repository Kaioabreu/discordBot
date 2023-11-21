const { SlashCommandBuilder } = require("discord.js");
const AudioService = require('../../services/audio.service');
const ClientService =   require('../../services/client.service');

const _audioService = new AudioService();
const _clientService = new ClientService();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription("Toca áudio salvo anterioremente.")
        .addStringOption((option) => option.setName("nome").setDescription("nome do audio").setRequired(true)),

    async execute(interaction, client) {
        const audioName = interaction.options.get('nome').value;
        if (handlerErrors(interaction, audioName)) return;
        if(!(_clientService.isConnected(client) && _clientService.isInSameChannel(client, interaction.member.voice.channel.id))) 
            _clientService.connectVoiceChannel(interaction.member.voice.channel, client, interaction);
        _audioService.playAudio(audioName, client);
        const botReply= "Tocando o áudio " + audioName;
        interaction.reply(botReply);
    }
}

function handlerErrors(interaction, audioName) {
    if(!_audioService.hasSound(audioName))
    {
        interaction.reply("Não existe áudio com esse nome.");
        return true
    }
    if(interaction.member.voice.channel == null)
    {
        interaction.reply("Você deve estar em um canal de voz para utilizar esse comando.");
        return true;
    }
    return false;
}