const fs = require("fs");
const { createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const config = require('../config.json')
const request = require("request");

class soundService {
    constructor() {
        this.path = config.soundsPath;
    }

    hasSound(name){
        let hasSound = false;
        let files = fs.readdirSync(this.path, {withFileTypes: true});
        files.forEach(file =>{
                if(file?.name.startsWith(name)){
                    hasSound = true;
                }
        });
        return hasSound;
    }
    playAudio(name, client){
        const path = this.path + name + '.mp3';
        const player = createAudioPlayer();
        let resource = createAudioResource(path);
        player.play(resource);
        const subscription = client.connection.subscribe(player);
    }
    
    addAudio(name, attachment){
        const path = this.path + name + '.mp3';
        request.get(attachment.url)
            .on('error',console.error)
            .pipe(fs.createWriteStream(path));
    }
    
    removeAudio(name){
        fs.unlinkSync(this.path + name + '.mp3');
    }
}

module.exports = soundService;