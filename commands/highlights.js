
const { SlashCommandBuilder} = require('discord.js');
module.exports = {
    deleted: false,
    data: new SlashCommandBuilder()
        .setName('highlights_of')
        .setDescription('Display highlights of various events in 23/24 season')
        .addSubcommand(subcommand =>
            subcommand
                .setName('_solution_challenge_24')
                .setDescription('View highlights of Solution Challenge 24')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('_devfest_23')
                .setDescription('View highlights of Devfest 23')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('_ramadan_byte_quiz')
                .setDescription('View highlights of ramadan.byte quiz ')
        ),
        
    run: async ({ interaction, client, handler }) => {
        const subcommand = interaction.options.getSubcommand();

        let embed;

        switch (subcommand) {
            case '_solution_challenge_24':
                embed = {
                    title: 'Solution Challenge 24 💡',
                    description: 'Highlights of Solution Challenge 24...',
                    color:0xFEE75C,
                    author: {
                            name: 'Solution Challenge 24',
                            icon_url:'https://media.licdn.com/dms/image/D4D22AQFkXUqmaQdDAw/feedshare-shrink_800/0/1705947472938?e=2147483647&v=beta&t=NqzLzWvn4-i-J3kD-VsgMA0xnuP7_lA8RG3c_bDkqkI',
                            url:'https://gdsc.community.dev/events/details/developer-student-clubs-university-of-batna-2-presents-the-google-developer-student-clubs-2023-solution-challenge/',
                            }, 

                    image:  {
                            url:'https://media.licdn.com/dms/image/D4D22AQFkXUqmaQdDAw/feedshare-shrink_800/0/1705947472938?e=2147483647&v=beta&t=NqzLzWvn4-i-J3kD-VsgMA0xnuP7_lA8RG3c_bDkqkI',
                            },  

                    url: 'https://gdsc.community.dev/events/details/developer-student-clubs-university-of-batna-2-presents-the-google-developer-student-clubs-2023-solution-challenge/',
                    timestamp: new Date().toISOString(),
	                footer: {
	              	text: 'date',
	             	icon_url: 'https://media.licdn.com/dms/image/D4D22AQFkXUqmaQdDAw/feedshare-shrink_800/0/1705947472938?e=2147483647&v=beta&t=NqzLzWvn4-i-J3kD-VsgMA0xnuP7_lA8RG3c_bDkqkI',
                           },
                   fields: [
                            { 
                             name: 'About 📃', 
                            value: ' solution challenge -event made specialy to try to solve for one of the United Nations’ 17 Sustainable Development Goals using Google technology, Created by the United Nations in 2015 to be achieved by 2030.', 
    
                            },{
                             name: 'Winner',
                             value: 'unknw',
                            
                            }
                           ],
                };
                break;

      case   '_devfest_23':

                embed = {
                    title: 'Devfest 23 ',
                    description: 'Highlights of Devfest 23...',
                    color:0xFFFFFF,
                    author: {
                        name: 'دافست',
                        icon_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCXVmPInavq6mNdRB2cFBJY3eVP-HsrN7rABWT5f1nbA&s',
                        url: 'https://gdg.community.dev/events/details/google-gdg-batna-presents-devfest-batna-tech-sessions/',
                    },

                    url:'https://gdg.community.dev/events/details/google-gdg-batna-presents-devfest-batna-tech-sessions/',

                    image: {
                        url: 'https://media.licdn.com/dms/image/D4D22AQHzK4w_e6ledQ/feedshare-shrink_2048_1536/0/1702755801084?e=2147483647&v=beta&t=uuslh6j-ioBLrRsAYwrPeYdRNgWjS4RWwOYtNTQs3Lo',
                    },

                    timestamp: new Date().toISOString(),
	                footer: {
	              	text: 'date',
	             	icon_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCXVmPInavq6mNdRB2cFBJY3eVP-HsrN7rABWT5f1nbA&s',
                     },
                    fields: [
                        {   name: 'About 📃',
                            value:'DevFest by Google is a global series of developer events organized by Google Developer Groups (GDGs). It brings together developers to learn about Google technologies, attend workshops, and network with industry experts.', 
                             
                        },
                        {
                            name: 'Winner',
                            value: 'GDG alger',
                           
                        },
                    ]
               };
                break;

     case   '_ramadan_byte_quiz':

                    embed = {
                        title: 'Ramadan.Byte Quiz🌙',
                        description: 'Highlights of Ramadan.byte quiz...',
                        color:0x206694,
                        author: {
                                name: 'Ramadan.Byte Quiz 24',
                                icon_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa3vbCKBBEiJJbN7nQbt5rQjMdcGv7QOs5WUmGMOofYw&s',
                                url:'https://www.linkedin.com/posts/gdscbatna2_byteramadanquiz-activity-7175932188771684354-caeb',
                                }, 
    
                        image:  {
                                url:'https://images-ext-1.discordapp.net/external/3GHgTyGT0ejodnFOIJahSb6GrQzP0TAyob4vFg32kU8/%3F_nc_cat%3D103%26ccb%3D1-7%26_nc_sid%3D5f2048%26_nc_ohc%3Dmimfos6rU3gAb7GiGsH%26_nc_ht%3Dscontent.fblj1-2.fna%26oh%3D00_AfAF38jPfPPrLUbkGGf90Gse5mwZmXHfBslopzMcjJaYbw%26oe%3D6618F671/https/scontent.fblj1-2.fna.fbcdn.net/v/t39.30808-6/432725090_939699931490053_1374859514694416631_n.jpg?format=webp&width=663&height=663',
                                },  
    
                        url: 'https://www.linkedin.com/posts/gdscbatna2_byteramadanquiz-activity-7175932188771684354-caeb',
                        timestamp: new Date().toISOString(),
                        footer: {
                          text: 'date',
                         icon_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa3vbCKBBEiJJbN7nQbt5rQjMdcGv7QOs5WUmGMOofYw&s',
                               },
                       fields: [
                                { 
                                 name: 'About 📃', 
                                value: 'ByteRamadan Quiz Nights for quick computer science challenges every Saturday, Monday, and Wednesday!  Let’s embark on this knowledge quest together, sparking curiosity and learning along the way! Get ready to challenge your mind and expand your horizons. Don’t miss out!', 
                               
                                },
                               ],
                    };
                    break;
            default:
                return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};

