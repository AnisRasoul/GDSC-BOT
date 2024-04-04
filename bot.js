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
        IntentsBitField.Flags.GuildMessageReactions //noufa added it for button
    ],
});

new CommandHandler({
    client,
    commandsPath: path.join(__dirname, 'commands'), // path to commands folder : create commands here
    eventsPath: path.join(__dirname, 'events'), // path to events folder : create events here
    /*validationsPath: path.join(__dirname, 'validations'), // path to validations folder : create validations here */
    testServer: process.env.GUILD_ID
});


//noufa added for button 
/*client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
  });
  
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() && !interaction.isButton()) return;
  
    try {
      if (interaction.isCommand()) {
        await handler.handleCommand(interaction); // Handle slash commands
      } else if (interaction.isButton()) {
        await handler.handleButtonInteraction(interaction); // Handle button interactions
      }
    } catch (error) {
      console.error('Error handling interaction:', error);
    }
  });
  //*/
client.login(process.env.TOKEN)

