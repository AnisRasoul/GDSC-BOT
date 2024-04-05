// slash command that gives you list about each region when clicking it send an embed about gdsc chapters in that latter
// ikram
const { SlashCommandBuilder , StringSelectMenuBuilder , ActionRowBuilder , StringSelectMenuOptionBuilder } = require('discord.js');


module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder() // the slash commands's data here
            .setName('explore')
            .setDescription('This shows you some GDSC world s chapters'),
    run: ({ interaction , client , handler }) => { // write the logic here
        async ({ interaction }) =>  {
            const regions = [
                {
                    label: 'Algeria',
                    description: 'Algeria chapters',
                    Emoji: ':flag_dz:'
                     // value: embed 
                },
                {
                    label: 'North America',
                    description: 'North America chapters',
                    Emoji: '🌎'
                    // value:  embed , 
                },
        
                {
                    label: 'Europe',
                    description: 'Europe chapters',
                    Emoji: '🌍' 
                    // value: embed ,
                },
                {
                    label: 'Africa',
                    description: 'Africa chapters',
                    Emoji : '🌍'
                    // value: embed ,
                },
                {
                    label: 'Asia',
                    description: 'Asia chapters ',
                    Emoji: '🌏'
                    // value: embed ,
                },
                
                {
                    label: 'Middle East',
                    description: 'Middle East chapters',
                    Emoji: '🌍',
                    // value: embed  
                },
            
            

            ];
            const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(interaction.id)
        .setPlaceholder('Select a Region...')
        .setMinValues(0)
        .addOptions(
            regions.map( (region) =>
                new StringSelectMenuOptionBuilder()
                    .setLabel(region.label)
                    .setDescription(region.description)
                    .setValue(region.value)
            )
        );
        const actionRow = new ActionRowBuilder().addComponents(selectMenu);
        const reply = await interaction.reply({
            
            components: [actionRow]
        })

    }
    
}
};
