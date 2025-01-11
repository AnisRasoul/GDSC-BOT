const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    deleted: false,
    data: new SlashCommandBuilder()
            .setName('about')
            .setDescription('get to know us 🤩'),
    run: ({interaction, client, handler}) => {
        interaction.reply({
            content: `Hey there, ${interaction.user.globalName }! Welcome to your GDGC Batna-2 guide, your gateway to the vibrant tech community! gdgc or Google Developer Group on Campus, is all about innovation, connections, and endless possibilities. But guess what? There's so much more to explore! Keep chatting with the bot to uncover all the exciting details and join us on this tech adventure! 🚀🪄`,
            ephemeral: true 
        });
    }
}