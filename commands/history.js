const { SlashCommandBuilder, ChannelType} = require('discord.js');
module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder()
            .setName('history')
            .setDescription('Get to know the GDSC History  🏛️'),
    run: ({interaction, client, handler}) => {
        interaction.reply({
            content: ` 
            Hey there 👋  ! here I'm gonna show you how the GDSC <:gdsc:947931741207789618>  was started... 🏛️

📜 The history of GDSC can be traced back to its predecessor, the Google Developer Groups (GDG) program. 

📜 GDG began as a small initiative in 2008, aiming to bring developers together 
These groups were typically organized by volunteers passionate about technology and Google's platforms.

📜 Over time, GDGs grew in popularity and became a global network of developer communities.

📜 In 2016, Google launched the Developer Student Clubs (DSC) program as an extension of GDGs, specifically targeting university students. 

📜 DSC aimed to provide students with opportunities to learn about Google technologies, collaborate on projects, and network with other students and industry professionals.

📜 DSC chapters were established in universities worldwide including the chapter university of Batna 2, with student leaders organizing events, workshops, and hackathons.

📜 In 2019, Google rebranded the DSC program as Google Developer Student Clubs (GDSC) to align it more closely with the broader Google Developer ecosystem.`,
            ephemeral: true 
        })}};






