const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder()
            .setName('teamms')
            .setDescription('Description of the command'),
    async run({ interaction, client, handler }) {
        const row = {
            type: 1, // 1 represents an action row
            components: [
                {
                    type: 2, // 2 represents a button
                    style: 1, // 1 represents PRIMARY style
                    label: 'Department 1',
                    custom_id: 'dep1'
                },
                {
                    type: 2, // 2 represents a button
                    style: 1, // 1 represents PRIMARY style
                    label: 'Department 2',
                    custom_id: 'dep2'
                },
                {
                    type: 2, // 2 represents a button
                    style: 1, // 1 represents PRIMARY style
                    label: 'Department 3',
                    custom_id: 'dep3'
                },
                {
                    type: 2, // 2 represents a button
                    style: 1, // 1 represents PRIMARY style
                    label: 'Department 4',
                    custom_id: 'dep4'
                },
                {
                    type: 2, // 2 represents a button
                    style: 1, // 1 represents PRIMARY style
                    label: 'Department 5',
                    custom_id: 'dep5'
                }
            ]
        };
        await interaction.reply({ content: 'Please select a department:', components: [row] });

        // Listen for button interactions
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