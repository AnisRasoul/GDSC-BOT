const { ActivityType } = require("discord.js");

module.exports = async (argument, client, handler) => {
  client.user.setStatus('online');
  client.user.setActivity('Get to know Google developer groups 🚀', {type: ActivityType.Custom});
  console.log(`Ready! Logged in as ${client.user.tag}`);
  };