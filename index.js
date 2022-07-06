const express = require('express');
const app = express();
const port = 3000;


app.get('/', function(request, response) { response.send(`Бот включен, удачи работяга  http://localhost:${port}`); });
app.listen(port, () => console.log());

const { Client, Intents, Collection } = require("discord.js"),
{ token, prefix, color, ownerId } = require("./settings.json"),
client = new Client( { intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES ] })


client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.aliases = new Collection();
client.settings = { prefix, color, ownerId }


for(let handler of  ["slash_command", "prefix_command", "event"]) require(`./handlers/${handler}`)(client);

client.on("ready", async () => {
    console.log(`Бот включен`);
    client.user
      .setActivity(`команды экстаза`, { type: "LISTENING" })
  });

console.log("Бот запущен");
client.login(token)
