// a slash command that has many subcommands when you click on one it send an embed of that specefic event
// bouthaina
const { SlashCommandBuilder, Colors } = require('discord.js');

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
                    title: 'Solution Challenge 24',
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
                             name: 'about', 
                            value: 'solution challenge -event made specialy to try to solve for one of the United Nations’ 17 Sustainable Development Goals using Google technology, Created by the United Nations in 2015 to be achieved by 2030.', 
                            inline: true,
                            },{
                             name: 'Winner',
                             value: 'unknw',
                             inline: true,
                            },
                           ],
                };
                break;

      case   '_devfest_23':

                embed = {
                    title: 'Devfest 23',
                    description: 'Highlights of Devfest 23...',
                    color:0xFFFFFF,
                    author: {
                        name: 'دافست',
                        icon_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCXVmPInavq6mNdRB2cFBJY3eVP-HsrN7rABWT5f1nbA&s',
                        url: 'https://gdg.community.dev/events/details/google-gdg-batna-presents-devfest-batna-tech-sessions/',
                    },

                    url:'https://gdg.community.dev/events/details/google-gdg-batna-presents-devfest-batna-tech-sessions/',

                    image: {
                        url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTG5d9QMvZc-TuyzeoEEgkFesBtV7M6DyJb71MazUEw8XhGrKoQ',
                    },
                    /*thumbnail: {
                        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCXVmPInavq6mNdRB2cFBJY3eVP-HsrN7rABWT5f1nbA&s',
                   }, */  
                    timestamp: new Date().toISOString(),
	                footer: {
	              	text: 'date',
	             	icon_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCXVmPInavq6mNdRB2cFBJY3eVP-HsrN7rABWT5f1nbA&s',
                     },
                    fields: [
                        {   name: 'About',
                            value:'value', 
                            inline: true, 
                        },
                        {
                            name: 'Winner',
                            value: 'GDG alger',
                            inline: true,
                        },
                    ]
               };
                break;

     case   '_ramadan_byte_quiz':

                    embed = {
                        title: 'Ramadan.Byte Quiz',
                        description: 'Highlights of Ramadan.byte quiz...',
                        color:0x206694,
                        author: {
                                name: 'Ramadan.Byte Quiz 24',
                                icon_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa3vbCKBBEiJJbN7nQbt5rQjMdcGv7QOs5WUmGMOofYw&s',
                                url:'',
                                }, 
    
                        image:  {
                                url:'https://images-ext-1.discordapp.net/external/3GHgTyGT0ejodnFOIJahSb6GrQzP0TAyob4vFg32kU8/%3F_nc_cat%3D103%26ccb%3D1-7%26_nc_sid%3D5f2048%26_nc_ohc%3Dmimfos6rU3gAb7GiGsH%26_nc_ht%3Dscontent.fblj1-2.fna%26oh%3D00_AfAF38jPfPPrLUbkGGf90Gse5mwZmXHfBslopzMcjJaYbw%26oe%3D6618F671/https/scontent.fblj1-2.fna.fbcdn.net/v/t39.30808-6/432725090_939699931490053_1374859514694416631_n.jpg?format=webp&width=663&height=663',
                                },  
    
                        url: '',
                        timestamp: new Date().toISOString(),
                        footer: {
                          text: 'date',
                         icon_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa3vbCKBBEiJJbN7nQbt5rQjMdcGv7QOs5WUmGMOofYw&s',
                               },
                       fields: [
                                { 
                                 name: 'about', 
                                value: 'value', 
                                inline: true,
                                },
         
                                {
                                 name: 'Winner',
                                 value: 'unknw',
                                 inline: true,
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

/*const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    deleted: false,
    data: new SlashCommandBuilder()
        .setName('highlightsss')
        .setDescription('description')  
        .addSubcommand(subcommand =>
            subcommand
                .setName('string')
                .setDescription('Most mportant events in 23/24 season')
                .addStringOption(option =>
                    option
                        .setName('solution_challenge_24')
                        .setDescription('Description of solution_challenge_24')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('devfest_23')
                        .setDescription('Description of devfest_23')
                        .setRequired(true)),
                        run: ({ interaction, client, handler }) => {
                            const embed = {
                                title: 'Highlights of 23/24 season',
                                description: 'Here are the most important events:',
                                fields: [
                                    { name: 'Solution Challenge 24', value: interaction.options.getString('solution_challenge_24') },
                                    { name: 'Devfest 23', value: interaction.options.getString('devfest_23') },
                                    /*{ name: 'Open Day 23', value: interaction.options.getString('open_day_23') },
                                    { name: 'Ramadan Byte Quiz', value: interaction.options.getString('ramadan_byte_quiz') },
                                    { name: 'MENA Tech Skills 24', value: interaction.options.getString('mena_tech_skills_24') }
                                ]
                            }; 
                    
                            interaction.reply({ embeds: [embed], ephemeral: true });
                        }, ), };*
        
   
              /* .addStringOption(option =>
                    option
                        .setName('open_day_23')
                        .setDescription('Description of open day 23')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('ramadan_byte_quiz')
                        .setDescription('Description of ramadan_byte_quiz')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('mena_tech_skills_24')
                        .setDescription('Description of mena_tech_skills_24')
                        .setRequired(true))  */
 


  
/*run:async ({ interaction, client, handler })=> { 
    const embed ={ 
       'one': new EmbedBuilder()
                .setTitle("solution_challenge_24")
                .setDescription('description')
                .setColor('Red'),
       'two': new EmbedBuilder()
                .setTitle("devfest_23")
                .setDescription('description')
                .setColor('Red'),
                };
    await interaction.reply({content: 'Please select an events'
                           , embed: [embed],ephemeral: true});




const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    deleted: false,
    data: new SlashCommandBuilder()
        .setName('highlightsss')
        .setDescription('description')  
        .addSubcommand(subcommand =>
            subcommand
                .setName('string')
                .setDescription('Most important events in 23/24 season')
                .addStringOption(option =>
                    option
                        .setName('solution_challenge_24')
                        .setDescription('Description of solution_challenge_24')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('devfest_23')
                        .setDescription('Description of devfest_23')
                        .setRequired(true)
                )
        ),
    run: ({ interaction, client, handler }) => {
        const embed = {
            title: 'Highlights of 23/24 season',
            description: 'Here are the most important events:',
            fields: [
                { name: 'Solution Challenge 24', value: interaction.options.getString('solution_challenge_24') },
                { name: 'Devfest 23', value: interaction.options.getString('devfest_23') }
            ]
        };

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
};   


*/


