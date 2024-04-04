// slash command that gives the user a modal and he gives the input 
// dhia 
const { SlashCommandBuilder, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, doc, setDoc } = require('firebase/firestore');
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
    deleted: true,
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
      const timestamp = Date.now(); 
      const docId = `${username}_${timestamp}`; 
      try {
        const docRef = doc(db, "feedback", docId);
        await setDoc(docRef, {
          text: feedbackText,
          username: username,
          userId: userId,
          time: new Date(timestamp).toISOString()
        });
        console.log("Document written with ID: ", docRef.id);
        interaction.reply({
          content: `Hi, ${interaction.user.globalName}. Thanks for the feedback`,
          ephemeral: true 
      });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };