// a slash command that has many subcommands when you click on one it send an embed of that specefic event
// bouthaina
const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    deleted: true, 
    data: new SlashCommandBuilder() // the slash commands's data here
            .setName('highlights')
            .setDescription('  bouthaina fill this'),
    run: ({interaction, client, handler}) => { // write the logic here
        
    }
}