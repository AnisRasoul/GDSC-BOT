const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

function createRegionsMenu(regions) {
    return new StringSelectMenuBuilder()
     .setCustomId("region_select")
            .setPlaceholder("Select a Region...")
            .addOptions(
                regions.map((region) =>
                new StringSelectMenuOptionBuilder()
                  .setLabel(region)
                  .setValue(region)
              )
            );
}

module.exports = {
  createRegionsMenu,
};