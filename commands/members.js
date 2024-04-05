// slash command that gives you a select list that gives you departments as opations when clicking on
// that specefic departemnt it returns the members of that latter
// anis
const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder,ComponentType } = require('discord.js');


module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder()
    .setName('members')
    .setDescription('Gives you a list about our gdsc members !'),
run: async ({ interaction, client, handler }) =>  {
    const members = [
        {
            label: 'SM',
            description: 'Social media team',
            value: 'chaima',
        },
        {
            label: 'Dev',
            description: 'Development team',
            value: 'anis dhia',
        },
        {
            label: 'DM',
            description: 'Digital maketing team',
            value: 'DM',
        },
        {
            label: 'Design',
            description: 'Design team',
            value: 'Design',
        },
        {
            label: 'QC',
            description: 'Quality control team',
            value: 'qc',
        },
        {
            label: 'Content',
            description: 'Content team',
            value: 'cont',
        }
    ];

    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(interaction.id)
        .setPlaceholder('Select a team')
        .setMinValues(0)
        .addOptions(
            members.map(member =>
                new StringSelectMenuOptionBuilder()
                    .setLabel(member.label)
                    .setDescription(member.description)
                    .setValue(member.value)
            )
        );
        const actionRow = new ActionRowBuilder().addComponents(selectMenu);
        const reply = await interaction.reply({
            content: 'Select a team to get its members',
            components: [actionRow]
        })
        const collector = reply.createMessageComponentCollector({
            ComponentType: ComponentType.StringSelect,
            filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
            time: 60_000,
        })
        collector.on('collect', (interaction) => {
            console.log(interaction.value);
        })
    
}
}