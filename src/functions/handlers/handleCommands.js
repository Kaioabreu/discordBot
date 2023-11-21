const { Guild } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const config = require('../../config.json');
require("dotenv").config();

module.exports = (client) => {
    client.handleCommands = async() => {
        console.log('iniciando handle');
        const commandFolder = fs.readdirSync('./src/commands');
        for (const folder of commandFolder) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith('.js'));

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                
                console.log(`Command: ${command.data.name} added`);
            }
        }
        const clientId = "1015656684166860921";

        const rest = new REST({ version: "9"}).setToken(process.env.TOKEN);
        
        // rest.put(Routes.applicationCommands(clientId), { body: [] })
        //     .then(() => console.log('Successfully deleted all application commands.'))
        //     .catch(console.error);
        
        try {
            console.log("Started refreshing application (/) commands.");

            await rest.put(Routes.applicationCommands(clientId), {
                body: client.commandArray,
            });

            console.log("Successfully reloaded application (/) commands.");
        } catch (error) {
            console.error(error);
        }
    }
}