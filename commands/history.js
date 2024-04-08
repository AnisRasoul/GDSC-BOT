// slash command that gives a text that talks about gdsc's history
// bouthaina
const { SlashCommandBuilder, ChannelType,PermissionFlagsBits} = require('discord.js');
module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder() // the slash commands's data here
            .setName('history')
            .setDescription('tap to show the gdsc history!'),
    run: ({interaction, client, handler}) => { // write the logic here
        interaction.reply({
            content: `GDSC-history :   
            Hey there 👋  ! here I'm gonna show you how the GDSC <:gdsc:947931741207789618>  was started.

The history of GDSC can be traced back to its predecessor, the Google Developer Groups (GDG) program. 

GDG began as a small initiative in 2008, aiming to bring developers together 
These groups were typically organized by volunteers passionate about technology and Google's platforms.

Over time, GDGs grew in popularity and became a global network of developer communities.

In 2016, Google launched the Developer Student Clubs (DSC) program as an extension of GDGs, specifically targeting university students. 

DSC aimed to provide students with opportunities to learn about Google technologies, collaborate on projects, and network with other students and industry professionals.

DSC chapters were established in universities worldwide including the chapter university of Batna 2, with student leaders organizing events, workshops, and hackathons.

In 2019, Google rebranded the DSC program as Google Developer Student Clubs (GDSC) to align it more closely with the broader Google Developer ecosystem.`,
            ephemeral: true 
        })}};







       /* const { run } = require('./departments');

        module.exports = {
            data: new SlashCommandBuilder()
            .setName('ban')
		.setDescription('Select a member and ban them.')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to ban')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for banning'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
                    async execute(interaction) {
                        
                            const target = interaction.options.getUser('target');
                            const reason = interaction.options.getString('reason') ?? 'No reason provided';
                     },
                          run: ({interaction, client, handler}) => {
                          
                                 interaction.reply(`Banning ${target.username} for reason: ${reason}`);
                                 interaction.guild.members.ban(target);
                                   }
                        
                       
                    };
                    
                
       
                 /*   async execute(interaction) {
                        const category = interaction.options.getString('category');
                        // category must be one of 'gif_funny', 'gif_meme', or 'gif_movie'
                    }, run: ({interaction, client, handler}) => { // write the logic here
                    interaction.reply()*/
             
            
        
    
                