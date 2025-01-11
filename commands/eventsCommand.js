const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const gdgc_events = [];
const { htmlToText } = require('html-to-text');
const highlights = require('../highlights.json');

axios.get('https://gdg.community.dev/api/event_slim/for_chapter/2785/?page_size=1000&status=Completed&include_cohosted_events=true&visible_on_parent_chapter_only=true&order=-start_date&fields=title,start_date,event_type_title,cropped_picture_url,cropped_banner_url,url,cohost_registration_url,description,description_short&page=1')
    .then(response => {
        response.data.results.forEach(event => {
            gdgc_events.push(event);
        });
        // Push highlights data to gdgc_events array
        highlights.forEach(event => {
            gdgc_events.push(event);
        });
    })
    .catch(error => {
        console.error('Error fetching events:', error);
    });

module.exports = {
    deleted: false,
    data: 
        new SlashCommandBuilder()
            .setName('events')
            .setDescription('View upcoming and past events'),
    run: async ({ interaction, client, handler }) => {
        if (gdgc_events.length === 0) {
            await interaction.reply('No events found.');
            return;
        }

        const eventEmbeds = gdgc_events.map(event => {
            const plainTextDescription = htmlToText(event.description, {
                wordwrap: 130
            });
            return new EmbedBuilder()
            .setTitle(event.title)
            .setDescription(plainTextDescription)
           .setURL(event.url)
            .setImage(event.cropped_picture_url)
            .addFields(
                { name: 'Event Type', value: event.event_type_title, inline: true },
                { name: 'Start Date', value: new Date(event.start_date).toLocaleString(), inline: true }
            )
            
        });

        await interaction.reply({ embeds: eventEmbeds, ephemeral: true  });
        
    },
};