const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

function createChapterEmbeds(chapters) {
  return chapters.map((club) => {
    return new EmbedBuilder()
      .setTitle(club.title)
      .setDescription(`📍 **${club.city}, ${club.country}**\n🔗 [Visit Chapter](${club.url}), id ${club.id}`)
      .setImage(club.picture?.url || "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/chapter_banners/GDG23-Bevy-2650_E9BH6dw.png")
      .setColor(0x00ff00);
  });
}

function createActionRows(chapters) {
  return chapters.map((club) => {
    return new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`members_${club.id}`)
        .setLabel("Club Members")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId(`events_${club.id}`)
        .setLabel("Club Events")
        .setStyle(ButtonStyle.Secondary)
    );
  });
}

function createMembersEmbed(members) {
  return new EmbedBuilder()
    .setTitle("Club Members")
    .setDescription(members.map((member) => `👤 **${member.organizer}** - ${member.role}`).join("\n"))
    .setColor(0x00ff00);
}

function createEventEmbeds(events) {
  return events.slice(0, 4).map((event) => {
    return new EmbedBuilder()
      .setTitle(event.title)
      .setURL(event.url)
      .setImage(event.cropped_picture_url)
      .addFields(
        { name: "Event Type", value: event.event_type_title, inline: true },
        { name: "Start Date", value: new Date(event.start_date).toLocaleString(), inline: true }
      );
  });
}

module.exports = {
  createChapterEmbeds,
  createActionRows,
  createMembersEmbed,
  createEventEmbeds,
};
