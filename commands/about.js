// slash command that gives small general information about gdsc

const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    deleted: false,
    data: new SlashCommandBuilder()
            .setName('about')
            .setDescription('tells you information about gdsc us !'),
    run: ({interaction, client, handler}) => {
        interaction.reply(`Hi,. the gdsc univ-batna 2 🥳 club is the best club in batna `);
    }
}