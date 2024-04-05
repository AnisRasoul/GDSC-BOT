// slash command that gives a text that talks about gdsc's history
// bouthaina
const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder() // the slash commands's data here
            .setName('history')
            .setDescription('boutaina fill this'),
    run: ({interaction, client, handler}) => { // write the logic here
        
    }
}