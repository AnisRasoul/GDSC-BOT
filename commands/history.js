const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    deleted: false,
    data: new SlashCommandBuilder()
        .setName('history')
        .setDescription('Learn about the history of Google Developer Groups 🌐'),
    run: ({ interaction }) => {
        interaction.reply({
            content: `
Let's take a journey through the history of **Google Developer Groups (GDG)** 🌟

🏛️ **How it All Started**  
Google Developer Groups (GDG) began in **2008** as a grassroots initiative to bring developers together. These groups were organized by passionate tech enthusiasts who wanted to share knowledge, collaborate, and build a community around Google's platforms.

🌍 **A Global Movement**  
What started as small meetups quickly grew into a **worldwide network** of communities. Today, GDG chapters exist in **over 140 countries**, empowering developers everywhere to learn, connect, and grow.

💡 **What GDG Stands For**  
GDGs are **developer-driven communities** supported by Google. They focus on:  
- Hosting **workshops**, **hackathons**, and **talks** to share knowledge.  
- Exploring technologies like **Android**, **Firebase**, **Cloud**, and more.  
- Building a space where developers can collaborate and innovate.

🚀 **Impact Over the Years**  
GDGs have inspired countless developers to start new projects, launch careers, and contribute to open-source communities. The initiative fosters inclusivity, encouraging everyone to be part of the tech revolution.

🌟 **Join the Movement**  
Whether you're a beginner or an expert, GDGs offer something for everyone. Connect with your local chapter and be part of this incredible global community.

Want to know more? Check out the official GDG website or find a chapter near you! 🌐

        `,
            ephemeral: true
        });
    }
};
