// slash command that gives you buttons when you click on a button it send you a link of that sm
// douaa
const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder() // the slash commands's data here
            .setName('export')
            .setDescription('douaa fix this'),
    run: ({interaction, client, handler}) => { // write the logic here
        
    }
}