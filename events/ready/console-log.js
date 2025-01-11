const { ActivityType } = require("discord.js");

module.exports = async (argument, client, handler) => {
  client.user.setStatus('online');
  client.user.setUsername('GDGC info')
  client.user.setActivity('Get to know our club 🚀', {type: ActivityType.Custom});
  console.log(`Ready! Logged in as ${client.user.tag}`);
  };