// slash command that gives you a select list that gives you departments as opations when clicking on
// that specefic departemnt it returns the members of that latter
const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder() // the slash commands's data here
            .setName('')
            .setDescription(''),
    run: ({interaction, client, handler}) => { // write the logic here
        
    }
}