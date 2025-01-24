const { ButtonBuilder, ButtonStyle } = require("discord.js");

function createEventsButton(club) {
  return new ButtonBuilder()
    .setCustomId(`events_${club.id}`)
    .setLabel("Club Events")
    .setStyle(ButtonStyle.Secondary);
}
module.exports = {
    createEventsButton,
};
