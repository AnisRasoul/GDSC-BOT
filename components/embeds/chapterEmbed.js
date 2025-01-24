const { EmbedBuilder } = require("discord.js");

function createChapterEmbed(club) {
  return new EmbedBuilder()
    .setTitle(club.title)
    .setDescription(
      `📍 **${club.city}, ${club.country}**\n🔗 [Visit Chapter](${club.url})`
    )
    .setImage(
      club.picture?.url ||
        "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/chapter_banners/GDG23-Bevy-2650_E9BH6dw.png"
    )
    .setColor(0x00ff00);
}

module.exports = {
  createChapterEmbed,
};