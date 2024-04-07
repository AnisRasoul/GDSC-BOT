const { SlashCommandBuilder,ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require('discord.js');
const departments = require('./departments');

module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder()
            .setName('socialmedia')
            .setDescription('Display GDSC social media links'),
    run: async ({ interaction, client, handler }) => {
        
        const Departments = [
            {
            custom_id: 'dep1',
              label: 'Department 1',
            },
            {
             custom_id: 'dep2',
              label: 'Department 2',
            },
            {
              custom_id: 'dep3',
              label: 'Department 3',
            },
          ];
        // Creating action row with buttons
        const row = new ActionRowBuilder();

        Departments.forEach((department) => {
          row.components.push(
            new ButtonBuilder()
              .setCustomId(department.custom_id)
              .setLabel(department.label)
              .setStyle(ButtonStyle.Primary)
          );
        });

        // Replying with message and buttons
        await interaction.reply({ content: 'Here are our social media links:', components: [row] });
        const filter = (i) => i.isButton() && i.customId.startsWith('dep');
        const collector = interaction.channel.createMessageComponentCollector({ filter });
        collector.on('collect', async (buttonInteraction) => {
            // Handle button click
            let departmentInfo = '';

            switch (buttonInteraction.customId) {
                case 'dep1':
                    departmentInfo = 'Information about Department 1.';
                    break;
                case 'dep2':
                    departmentInfo = 'Information about Department 2.';
                    break;
                case 'dep3':
                    departmentInfo = 'Information about Department 3.';
                    break;
                case 'dep4':
                    departmentInfo = 'Information about Department 4.';
                    break;
                case 'dep5':
                    departmentInfo = 'Information about Department 5.';
                    break;
                default:
                    departmentInfo = 'Sorry, no information available for this department.';
                    break;
            }

            await buttonInteraction.reply(departmentInfo);
        });
    }

};