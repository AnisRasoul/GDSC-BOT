const { SlashCommandBuilder , StringSelectMenuBuilder , ActionRowBuilder , StringSelectMenuOptionBuilder, ComponentType } = require('discord.js');
module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder()
            .setName('explore')
            .setDescription('This shows you some GDSC world\'s chapters'),

     run: async ({ interaction , client , handler }) => { 
        const regionsData = {
            Algeria: [
                {

                    university: "**_ESI - SBA_**\n",
                    country: "(22) sidi bel abbes\n"
                    
                },
                {
                    university:"**_USTO_**\n",
                    country: "(31) Oran\n"
                },
                {
                    university: "**_University of Boumerdes_**\n",
                    country: "(35) Boumerdes\n"
                },
                {
                    university: "**_USTHB_**\n",
                    country: "(16) Algiers\n"
                },
                {
                    university: "**_ENSB_**\n",
                    country: "(25) Constantine\n"
                },
               
            ],
            NorthAmerica: [
                {
                    university: "**_University of British Columbia - Vancouver_** \n",
                    country: "🇨🇦 Canada\n"
                },
                {
                    university: "**_Carleton University_**\n",
                    country: "🇨🇦 Canada\n"
                },
                {
                    university: "**_Louisiana State University - Baton Rouge_**\n",
                    country: "🇺🇸 U.S.A\n"
                },
                {
                    university: "**_California State Polytechnic University_**\n",
                    country: "🇺🇸 U.S.A\n"
                },
                {
                    university: "**_New Jersey Institute of Technology_**\n",
                    country: "🇺🇸 U.S.A"
                },
               
            ],
            Europe: [
                {

                    university: "**_Imperial College of Science, Technology and Medicine_**\n",
                    country: "🇬🇧 U.K\n"
                },
                {
                    university: "**_Epoka University_**\n",
                    country: "🇦🇱 Albania\n"
                },
                {
                    university: "**_The Polytechnic University of Timisoara_**\n",
                    country: "🇷🇴 Romania\n"
                },
                {
                    university: "**_Technical University Berlin_**\n",
                    country: "🇩🇪 Germany\n"
                },
                {
                    university: "**_Collegium Da Vinci_**\n",
                    country: "🇵🇱 Poland\n"
                },
               
            ],
            Africa: [
                {
                    university: "**_Adekunle Ajasin University_**\n",
                    country: "🇳🇬 Nigeria\n"
                },
                {
                    university: "**_ICT University_**\n",
                    country: "🇨🇲 Cameroon\n"
                },
                {
                    university: "**_ENSET Mohammedia_**\n",
                    country: "🇲🇦 Morroco\n"
                },
                {
                    university: "**_Faculty of Science of Tunis_**\n",
                    country: "🇹🇳 Tunisia\n"
                },
                {
                    university: "**_St Paul's University_**\n",
                    country: "🇰🇪 Kenya\n"
                },
            ],
            Asia: [
                {
                    university: "**_Cristal e-College_**\n",
                    country: "🇵🇭 Philippines\n "
                },
                {
                    university: "**_Chandigarh University_**\n",
                    country: "🇮🇳 India\n"
                },
                {
                    university: "**_Binus University Malang_**\n",
                    country: "🇮🇩 Indonesia\n"
                },
                {
                    university: "**_Waseda University_**\n",
                    country: "🇯🇵 Japan\n"
                },
                {
                    university: "**_Tamkang University_**\n",
                    country: "🇹🇼 Taiwan\n"
                },
              
            ],
            MiddleEast: [
                {
                    university: "**_Gaza University_**\n",
                    country: "🇵🇸 Palestine\n"
                },
                {
                    university: "**_Applied Science Private University_** \n",
                    country: "🇯🇴 Jordan\n"
                },
                {
                    university: "**_Obour Institute_**\n",
                    country: "🇪🇬 Egypt\n"
                },
                {
                    university: "**_Beirut Arab University_**\n",
                    country: "🇱🇧 Lebanon\n"
                },
                {
                    university: "**_Prince Sattam Bin Abdulaziz University_**\n",
                    country: "🇸🇦 Saudi Arabia\n"
                },
               
            ]
        };
        
            const regions = Object.keys(regionsData);
            const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(interaction.id)
        .setPlaceholder('Select a Region...')
        .setMinValues(0)
        .addOptions(
            regions.map( (region) =>
                new StringSelectMenuOptionBuilder()
                    .setLabel(region)
                    .setValue(region)
            )
        );
        const actionRow = new ActionRowBuilder().addComponents(selectMenu);


        const reply = await interaction.reply({
            content: 'Hey there!! 🌎 Ready to discover some of GDSC chapters beyond borders?\n Select a region and get to know them✨',
            components: [actionRow] ,
            ephemeral: true
        });
        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.SELECT_MENU, time: 3_600_000 });

                    collector.on('collect', async i => {
                    const selection = i.values[0];
                    const selectedRegions = regionsData[selection] || [];
                    let regionsInfo = '';
                    selectedRegions.forEach( club => {
                        regionsInfo += `📍${club.university}  ${club.country || ''}  \n`;
                    });
                    await i.reply({
                        content: ` **__GDSC  ${selection}__**  :\n\n  ${regionsInfo || 'No Regionfound.'}`,
                
                        ephemeral: true
                    });
});
    

    
    }
}