const { SlashCommandBuilder , EmbedBuilder} = require('discord.js');
module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder() 
            .setName('find')
            .setDescription('This shows our location 📌 '),
    run: async ({interaction, client, handler}) => { 

    const embed= new EmbedBuilder()
    .setTitle('📌 __Location__')
    .setDescription(`Click [Here](https://maps.app.goo.gl/ExbvuVumeRWR7YZu5) to view our location.`)
    .setColor('Fuchsia')
    .setThumbnail('https://scontent.faae1-2.fna.fbcdn.net/v/t39.30808-6/308402289_5201310556647862_6915425061121499345_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFiOM5972rdGY-YZCtAmcj1gVh8PWUgSOCBWHw9ZSBI4Eh4KUTr5CEXvuKIADcqqW8Kwg9DTsyVPqdJqd3U1e1K&_nc_ohc=O6-Eslj0EKUAb574lFL&_nc_zt=23&_nc_ht=scontent.faae1-2.fna&oh=00_AfD_vQQvwAcvUlKA2gir9J7UjyN7WyEsOTZDuYc4HhXhwg&oe=661A0820')
    await interaction.reply({
        embeds: [embed],
        ephemeral: true
    });
    
    }
};