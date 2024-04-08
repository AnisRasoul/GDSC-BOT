const { SlashCommandBuilder,ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require('discord.js');
const { link } = require('fs');

module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder()
            .setName('media')
            .setDescription('Display GDSC social media links'),
    run: async ({ interaction, client, handler }) => {

        const Socials = [
            {
              label: 'Instagram',
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
                link: 'https://discord.com/channels/873890972113703012/1218991251227934830/1225969938980802682',
  
              },
              {
                label: 'youtube',
                link: 'https://www.youtube.com/c/GDSCBatna2',
  
              },
              
          ];
        // Creating action row with buttons
        const row = new ActionRowBuilder();

        Socials.forEach((social) => {
          row.components.push(
            new ButtonBuilder()
              .setLabel(social.label)
              .setStyle(ButtonStyle.Link)
              .setURL(social.link)
          );
        });

        // Replying with message and buttons
        await interaction.reply({ content: 'Here are our social media links:', components: [row] });
    }
};
