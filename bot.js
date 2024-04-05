require('dotenv').config()
const {Client,IntentsBitField} = require("discord.js")
const {CommandHandler} = require('djs-commander')
const path = require('path')

const client = new Client({ // client = our bot
    intents: [ // permissions that our bot has
        IntentsBitField.Flags.Guilds, // guilds = servers
        IntentsBitField.Flags.GuildMembers, // serverMembers
        IntentsBitField.Flags.GuildMessages, // serverMessages
        IntentsBitField.Flags.MessageContent, //MessageContent
    ],
});

new CommandHandler({
    client,
    commandsPath: path.join(__dirname, 'commands'), // path to commands folder : create commands here
    eventsPath: path.join(__dirname, 'events'), // path to events folder : create events here
    testServer: process.env.GUILD_ID
});
client.login(process.env.TOKEN)

