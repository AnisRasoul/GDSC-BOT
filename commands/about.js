const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    deleted: false,
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Understand what Google Developer Groups is all about'),
    run: ({ interaction, client, handler }) => {
        interaction.reply({
            content: `
## **Hey, ${interaction.user.globalName}! Welcome to your GDG Guide!** 🚀
Google Developer Groups (GDG) is your gateway to the vibrant tech community. Here's what you can expect:
## **Connect with Local Developers** 👥  
When you join a GDG, you'll have the opportunity to learn new skills in various formats. Meet local developers—virtually or in-person—who share your passion for technology.
## **Inclusive Environment** 🌈  
The GDG community prides itself on being inclusive. Whether you're a \`beginner developer\` or an \`experienced professional\`, everyone is welcome to join and grow together.
## **What You'll Gain** 🎓  
\`\`\`
- Learn cutting-edge technologies. 🛠️
- Network with like-minded individuals. 🌐
- Participate in workshops, hackathons, and tech talks. 🗣️
\`\`\`
**Join us and be part of a global movement to learn, share, and innovate!** 💻🌍
[GDG Logo](https://developers.google.com/community/gdg/images/logo-lockup-gdg-horizontal_720.png)
            `,
            ephemeral: true
        });
    }
};