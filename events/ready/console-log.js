const { ActivityType } = require("discord.js");

module.exports = (argument, client, handler) => {
  client.user.setUsername('GDSC info')
  client.user.setActivity('Making the GDSC club popular 🚀', {type: ActivityType.Custom});
  console.log(`Ready! Logged in as ${client.user.tag}`);
  };