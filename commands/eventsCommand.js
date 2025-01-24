const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getGDGCEvents } = require("../api/gdgc-events");
const gdgc_events = [];
const { htmlToText } = require("html-to-text");
const highlights = require("../highlights.json");

getGDGCEvents()
  .then((response) => {
    response.data.results.forEach((event) => {
      gdgc_events.push(event);
    });
    highlights.forEach((event) => {
      gdgc_events.push(event);
    });
  })
  .catch((error) => {
    console.error("Error fetching events:", error);
  });

module.exports = {
  deleted: true,
  data: new SlashCommandBuilder()
    .setName("events")
    .setDescription("View upcoming and past events"),
  run: async ({ interaction, client, handler }) => {
    if (gdgc_events.length === 0) {
      await interaction.reply("No events found.");
      return;
    }

    const eventEmbeds = gdgc_events.map((event) => {

      return new EmbedBuilder()
        .setTitle(event.title)
        .setDescription(event.description)
        .setURL(event.url)
        .setImage(event.cropped_picture_url)
        .addFields(
          { name: "Event Type", value: event.event_type_title, inline: true },
          {
            name: "Start Date",
            value: new Date(event.start_date).toLocaleString(),
            inline: true,
          }
        );
    });

    await interaction.reply({ embeds: eventEmbeds, ephemeral: true });
  },
};
