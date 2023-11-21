const { joinVoiceChannel } = require('@discordjs/voice');

class ClientService {
    constructor() {}

    stayedAlone(oldState, client){
        return client.channel != null && oldState.channelId == client.channel.id && client.channel.members.size == 1;
    }

    connectVoiceChannel(channel, client){
        client.connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guildId,
            adapterCreator: channel.guild.voiceAdapterCreator
        });
        client.channel = channel;
    }

    isConnected(client){
        return !!client.channel;
    }

    isInSameChannel(client, channelId){
        return client.channel == null || client.channel.id == channelId;
    }

    disconnect(client){
        client.connection.destroy();
        client.channel = null;
    }
}

module.exports = ClientService;