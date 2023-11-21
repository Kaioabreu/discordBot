const Discord = require("discord.js")
const fs = require('fs')
const request = require('request')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joinsound')
        .setDescription('Adiciona um som que será reproduzido ao entrar em uma chamada de voz.')
        .addAttachmentOption((option) => option.setDescription("Arquivo de áudio").setName("audio").setRequired(true)),

    async execute(interaction) {

        const file = interaction.options.get('audio');
        if(file.attachment.name.endsWith('.mp3')){
        let str = './src/sounds/' + interaction.user.id + '.mp3';
        request.get(file.attachment.url)
        .on('error',console.error)
        .pipe(fs.createWriteStream(str));
        interaction.reply("Áudio adicionado!");
        }
        else interaction.reply("O Arquivo deve ser em formato mp3.");
    
    }
}