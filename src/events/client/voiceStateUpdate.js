const SoundService = require('../../services/sound.service');
const ClientService =   require('../../services/client.service');

const _soundService = new SoundService();
const _clientService = new ClientService();

module.exports = {
    name: "voiceStateUpdate",
    async execute(oldState, newState, client) {
        if(newState.channelId == null){
            if(_clientService.stayedAlone(oldState, client)) _clientService.disconnect(client);
        }
        else{
            if(newState.channelId != oldState.channelId && _soundService.hasSound(newState.member.id)) 
            {
                _clientService.connectVoiceChannel(newState.channel, client);
                _soundService.playAudio(newState.member.id, client);
            }
        }
    } 
}
