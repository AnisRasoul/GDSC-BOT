// slash command that gives the user a modal and he gives the input 
// dhia 
const { SlashCommandBuilder, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyB0vySYNU8J3ieBqL927WgzzHAO1bqahxI",
    authDomain: "gdsc-bot-91699.firebaseapp.com",
    projectId: "gdsc-bot-91699",
    storageBucket: "gdsc-bot-91699.appspot.com",
    messagingSenderId: "929785714136",
    appId: "1:929785714136:web:b1f697f3dc481b79c98ead"
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