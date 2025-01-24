const { ButtonBuilder, ButtonStyle } = require("discord.js");

function createMembersButton(club) {
  return new ButtonBuilder()
    .setCustomId(`members_${club.url}`)
    .setLabel("Club Members")
    .setStyle(ButtonStyle.Primary);
}
module.exports = {
  createMembersButton,
};
