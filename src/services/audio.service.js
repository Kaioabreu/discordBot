const soundService = require('./sound.service');
const config = require('../config.json');
const fs = require('fs');
const { EmbedBuilder } = require('discord.js');

class AudioService extends soundService {
    constructor() {
        super();
        this.path = config.audiosPath;
    } 
    
    listAudios() {
        let description = '';
        let files = fs.readdirSync(this.path, {withFileTypes: true});
        files.forEach(file =>{
            description += file?.name.slice(0,-4)+'\n';
        })
        return new EmbedBuilder()
            .setTitle('Áudios:')
            .setDescription(description);
    }
    
}

module.exports = AudioService