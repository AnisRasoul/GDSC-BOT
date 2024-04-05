// slash command that gives small general information about gdsc
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    deleted: true,
    data: new SlashCommandBuilder()
            .setName('about')
            .setDescription('tells you information about gdsc us !'),
    run: ({interaction, client, handler}) => {
        interaction.reply({
            content: `Hi, ${interaction.user.globalName}. the gdsc univ-batna 2 🥳 club is the best club in batna`,
            ephemeral: true 
        });
    }
}