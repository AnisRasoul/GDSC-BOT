// slash command that gives you buttons when clicking on departments it gives you info about each one of them
// noufa

const { SlashCommandBuilder } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const { Command } = require('djs-commander');

module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder()
            .setName('departements')
            .setDescription('noufa fill this'),
    async run({ interaction, client, handler }) {   //async bfr run bch tmchi await 
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('dep1')
                    .setLabel('Department 1')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('dep2')
                    .setLabel('Department 2')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('dep3')
                    .setLabel('Department 3')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('dep4')
                    .setLabel('Department 4')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('dep5')
                    .setLabel('Department 5')
                    .setStyle('PRIMARY'),
            );

        await interaction.reply({ content: 'Please select a department:', components: [row] });
    },
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('dep1')
                    .setLabel('Department 1')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('dep2')
                    .setLabel('Department 2')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('dep3')
                    .setLabel('Department 3')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('dep4')
                    .setLabel('Department 4')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('dep5')
                    .setLabel('Department 5')
                    .setStyle('PRIMARY'),
            );

        await interaction.reply({ content: 'Please select a department:', components: [row] });
    }
};