// slash command that gives you buttons when clicking on departments it gives you info about each one of them
const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder() // the slash commands's data here
            .setName('')
            .setDescription(''),
    run: ({interaction, client, handler}) => { // write the logic here
        
    }
}