const {SlashCommandBuilder} = require("discord.js");
const AudioService = require("../../services/audio.service");

_audioService = new AudioService();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sounds')
        .setDescription('Veja todos os áudios já criados'),

    async execute(interaction) {
        interaction.reply({embeds: [_audioService.listAudios()]});
    }

}