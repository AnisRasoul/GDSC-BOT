// slash command that gives the user a modal and he gives the input 
// dhia 
const { SlashCommandBuilder, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = {
    deleted: false,
    data: new SlashCommandBuilder()
      .setName('feedback')
      .setDescription('Give feedback')
      .addStringOption(option =>
        option.setName('text')
          .setDescription('Enter your feedback')
          .setRequired(true)),

    
    async run({ interaction, client, handler }) {
      const feedbackText = interaction.options.getString('text');
      const username = interaction.user.username;
      const userId = interaction.user.id;
      try {
        const docRef = await addDoc(collection(db, "feedback"), {
          text: feedbackText,
          username: username,
          userId: userId
        });
        console.log("Document written with ID: ", docRef.id);
        await interaction.reply('Thank you for your feedback!');
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };