const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

function createChaptersMenu(truncatedRegions) {
    return new StringSelectMenuBuilder()
    .setCustomId("club_select")
    .setPlaceholder("Select a Club...")
    .addOptions(
      truncatedRegions.map((club) =>
        new StringSelectMenuOptionBuilder()
          .setLabel(club.title)
          .setValue(club.id.toString())
      )
    );
}

module.exports = {
    createChaptersMenu,
};