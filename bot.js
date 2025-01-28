require('dotenv').config()
const {Client,IntentsBitField} = require("discord.js")
const {CommandHandler} = require('djs-commander')
const path = require('path')
const express = require('express')

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent, 
        IntentsBitField.Flags.GuildMessageReactions 
    ],
});

new CommandHandler({
    client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
});

client.login(process.env.TOKEN)

// Express server to handle API calls to keep the bot alive
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

