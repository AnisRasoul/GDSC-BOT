// slash command that gives you list about each region when clicking it send an embed about gdsc chapters in that latter
// ikram
const { SlashCommandBuilder , StringSelectMenuBuilder , ActionRowBuilder , StringSelectMenuOptionBuilder, ComponentType } = require('discord.js');


module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder() // the slash commands's data here
            .setName('explore')
            .setDescription('This shows you some GDSC world s chapters'),
     run: async ({ interaction , client , handler }) => { // write the logic here
        
        
        const regionsData = {
            Algeria: [
                {
                    university: "University of Algiers",
                    country: "Algeria"
                },
                {
                    university: "Oran University",
                    country: "Algeria"
                },
                {
                    university: "Constantine University",
                    country: "Algeria"
                },
                {
                    university: "Annaba University",
                    country: "Algeria"
                },
                {
                    university: "Tlemcen University",
                    country: "Algeria"
                }
            ],
            NorthAmerica: [
                {
                    university: "New York University",
                    country: "United States"
                },
                {
                    university: "University of Toronto",
                    country: "Canada"
                },
                {
                    university: "University of California, Berkeley",
                    country: "United States"
                },
                {
                    university: "McGill University",
                    country: "Canada"
                },
                {
                    university: "Stanford University",
                    country: "United States"
                }
            ],
            Europe: [
                {
                    university: "University of Oxford",
                    country: "United Kingdom"
                },
                {
                    university: "ETH Zurich",
                    country: "Switzerland"
                },
                {
                    university: "Sorbonne University",
                    country: "France"
                },
                {
                    university: "Technical University of Munich",
                    country: "Germany"
                },
                {
                    university: "University of Amsterdam",
                    country: "Netherlands"
                }
            ],
            Africa: [
                {
                    university: "University of Cape Town",
                    country: "South Africa"
                },
                {
                    university: "University of Nairobi",
                    country: "Kenya"
                },
                {
                    university: "University of Ghana",
                    country: "Ghana"
                },
                {
                    university: "University of Lagos",
                    country: "Nigeria"
                },
                {
                    university: "University of Pretoria",
                    country: "South Africa"
                }
            ],
            Asia: [
                {
                    university: "University of Tokyo",
                    country: "Japan"
                },
                {
                    university: "National University of Singapore",
                    country: "Singapore"
                },
                {
                    university: "Tsinghua University",
                    country: "China"
                },
                {
                    university: "Seoul National University",
                    country: "South Korea"
                },
                {
                    university: "Indian Institute of Technology Bombay",
                    country: "India"
                }
            ],
            MiddleEast: [
                {
                    university: "American University of Beirut",
                    country: "Lebanon"
                },
                {
                    university: "King Fahd University of Petroleum and Minerals",
                    country: "Saudi Arabia"
                },
                {
                    university: "Tel Aviv University",
                    country: "Israel"
                },
                {
                    university: "American University in Cairo",
                    country: "Egypt"
                },
                {
                    university: "Koç University",
                    country: "Turkey"
                }
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
            content: 'select a region',
            components: [actionRow]
        });
        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.SELECT_MENU, time: 3_600_000 });

                    collector.on('collect', async i => {
                    const selection = i.values[0];
                    const selectedRegions = regionsData[selection] || [];
                    let regionsInfo = '';
                    selectedRegions.forEach( club => {
                        regionsInfo += `⦿ ${club.university} : ${club.country || ''} \n`;
                    });
                    await i.reply({
                        content: ` Members of ${selection} :\n  ${regionsInfo || 'No members found.'}`,
                
                        ephemeral: true
                    }); 
});
    

    }
}

