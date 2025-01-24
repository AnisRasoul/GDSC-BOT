const { EmbedBuilder } = require("discord.js");

function createEventsEmbed(event) {
  const eventEmbed = event.slice(0, 9).map((event) => {
    return new EmbedBuilder()
      .setTitle(event.title)
      .setURL(event.url)
      .setImage(event.cropped_picture_url)
      .addFields(
        {
          name: "Event Type",
          value: event.event_type_title,
          inline: true,
        },
        {
          name: "Start Date",
          value: new Date(event.start_date).toLocaleString(),
          inline: true,
        }
      );
  });
    return eventEmbed;
}
module.exports = { createEventsEmbed };
