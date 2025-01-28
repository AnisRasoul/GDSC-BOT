const { ButtonBuilder, ButtonStyle } = require("discord.js");

function createSMButton(club) {
  return new ButtonBuilder()
    .setCustomId(`sm_${club.url}`)  // Changed from links${club.url} to sm_${club.url}
    .setLabel("Social Media links")
    .setStyle(ButtonStyle.Secondary);
}

module.exports = {
    createSMButton,
};
