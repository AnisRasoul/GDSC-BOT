const { EmbedBuilder } = require("discord.js");

function createMemberEmbed(members) {
  const MemberEmbed = members.slice(0, 9).map((member) => {
    return new EmbedBuilder()
      .setTitle(member.organizer)
      .setURL(member.organizerUrl)
      .setDescription(`Role: ${member.role}`)
      .setImage(member.organizerImage)
      .setColor('#0099ff') 
      .setTimestamp(); 
  })
  return MemberEmbed;
}

module.exports = { createMemberEmbed };
