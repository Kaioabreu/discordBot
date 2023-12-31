require("dotenv").config();
const { GatewayIntentBits, Collection, Client } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]});
client.commands = new Collection();
client.commandArray = [];
client.connection = null;
client.channel = null;

const functionFolder = fs.readdirSync("./src/functions");
for (const folder of functionFolder) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./src/functions/${folder}/${file}`)(client);
}
client.handleEvents();
client.handleCommands();
client.login(process.env.TOKEN);
