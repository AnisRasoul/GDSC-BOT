// slash command that gives you list about each region when clicking it send an embed about gdsc chapters in that latter
// ikram
const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder() // the slash commands's data here
            .setName('')
            .setDescription(''),
    run: ({interaction, client, handler}) => { // write the logic here
        
    }
}