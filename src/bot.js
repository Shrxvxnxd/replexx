const {Client,Intents, WebhookClient, MessageEmbed, MessageActionRow, MessageButton, Collection} = require("discord.js");
const { readdirSync } = require("fs");
const express = require(`express`);
const Cluster = require('discord-hybrid-sharding');
const Discord = require('discord.js');
const app = express();
const Topgg = require("@top-gg/sdk")
const db = require('../src/schema/prefix.js');


const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/987977347355541524/vt3YMGFeYuzM-y9HNEqbKVYfpfloS1wIXb9gAWiMFPt5yw7VUczUxluI4ccp827Ldy3M' }); 

const client = new Client({
 
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    shards: Cluster.data.SHARD_LIST, 
    shardCount: Cluster.data.TOTAL_SHARDS, 
    presence: {
      status:'LISTENING',
      activities: [{
        name: 'a3help | /help', //#fd6260
        type: 'LISTENING',
        url: 'https://www.twitch.tv/alex_music37'
      }]
    },
    fetchAllMembers: false,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});



client.cluster = new Cluster.Client(client);
module.exports = client;
client.topgg = new Topgg.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5ODk0MTM5ODUzODE1ODA4MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjU0MTQzNjYwfQ.T_n7kQRuV65W7EdAiH9Fu3UvsxK4w0Cdehj0xwxubvg") 
client.commands = new Collection();
client.alex = new Collection();
client.sls = new Collection();
client.config = require(".././config.json");
client.owner = client.config.ownerID;
client.prefix = client.config.prefix;
client.embedColor = client.config.embedColor;
client.aliases = new Collection();
client.commands = new Collection();
client.cooldowns = new Collection(); 
client.logger = require("./utils/logger.js");
client.emoji = require("./utils/emoji.json");
client.serverhost = "138.197.6.18"
require("./handler/Client")(client);
require('events').EventEmitter.defaultMaxListeners = 1000;
process.setMaxListeners(1000);
client.login(client.config.token);



process.on('unhandledRejection', (error) => {
  web.send(`\`\`\`js\n${error.stack}\`\`\``)
});
process.on("uncaughtException", (err, origin) => {
  web.send(`\`\`\`js\n${err.stack}\`\`\``)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  web.send(`\`\`\`js\n${err.stack}\`\`\``)
});
process.on('beforeExit', (code) => {
  web.send(`\`\`\`js\n${code}\`\`\``)
});
process.on('exit', (code) => {
  web.send(`\`\`\`js\n${code}\`\`\``)
});
process.on('multipleResolves', (type, promise, reason) => {
});