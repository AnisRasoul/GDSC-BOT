const { SlashCommandBuilder,ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require('discord.js');
module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder()
            .setName('media')
            .setDescription('Get our social media links 💭'),
    run: async ({ interaction, client, handler }) => {

        const Socials = [
            {
              label: 'Instagram ',
              link:'https://www.instagram.com/gdsc.batna2/',
            },
            {
              label: 'Facebook',
              link:'https://www.facebook.com/GDSCBatna',
            },
            {
              label: 'LinkedIn',
              link: 'https://www.linkedin.com/company/gdscbatna2/',

            },
            {
                label: 'tiktok',
                link: 'https://www.tiktok.com/@gdsc.batna?is_from_webapp=1&sender_device=pc',
  
              },
              {
                label: 'youtube',
                link: 'https://www.youtube.com/c/GDSCBatna2',
  
              },
              
          ];
        const row = new ActionRowBuilder();

        Socials.forEach((social) => {
          row.components.push(
            new ButtonBuilder()
              .setLabel(social.label)
              .setStyle(ButtonStyle.Link)
              .setURL(social.link)
          );
        });
        await interaction.reply({ content: `what are you waiting for !? Tap to join our social media platforms ✨🚀`, components: [row] , ephemeral: true });
    }
};
