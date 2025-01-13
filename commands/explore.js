const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
  ComponentType,
} = require("discord.js");
const { default: axios } = require("axios");

function getAlgeriaChapters(jsonData) {
  const flatArray = jsonData.flatMap((item) => item.chapters);
  const algeriaChapters = flatArray.filter((item) => item.country === "DZ");
  return algeriaChapters;
}
function getNorthAmericaChapters(jsonData) {
  const northAmericaData = jsonData.filter((item) => item.id === 5);
  const northAmericaChapters = northAmericaData.flatMap(
    (item) => item.chapters
  );
  return northAmericaChapters;
}

function getSouthAmericaChapters(jsonData) {
  const southAmericaData = jsonData.filter((item) => item.id === 4);
  const southAmericaChapters = southAmericaData.flatMap(
    (item) => item.chapters
  );
  return southAmericaChapters;
}

function getEuropeChapters(jsonData) {
  const europeData = jsonData.filter((item) => item.id === 2);
  const europeChapters = europeData.flatMap((item) => item.chapters);
  return europeChapters;
}

function getAsiaChapters(jsonData) {
  const asiaData = jsonData.filter((item) => item.id === 3);
  const asiaChapters = asiaData.flatMap((item) => item.chapters);
  return asiaChapters;
}

function getAfricaChapters(jsonData) {
  const africaData = jsonData.filter((item) => item.id === 1);
  const africaChapters = africaData.flatMap((item) => item.chapters);
  return africaChapters;
}
module.exports = {
  deleted: false,
  data: new SlashCommandBuilder()
    .setName("explore")
    .setDescription("This shows you some GDSC world's chapters"),

  run: async ({ interaction, client, handler }) => {
    await interaction.deferReply({ ephemeral: true });

    const res = await axios.get(
      "https://gdg.community.dev/api/chapter_region?chapters=true"
    );
    const jsonData = res.data;
    const regionsData = {
      Algeria: getAlgeriaChapters(jsonData),
      NorthAmerica: getNorthAmericaChapters(jsonData),
      SouthAmerica: getSouthAmericaChapters(jsonData),
      Europe: getEuropeChapters(jsonData),
      Africa: getAfricaChapters(jsonData),
      Asia: getAsiaChapters(jsonData),
    };

    const regions = Object.keys(regionsData);
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId(interaction.id)
      .setPlaceholder("Select a Region...")
      .setMinValues(0)
      .addOptions(
        regions.map((region) =>
          new StringSelectMenuOptionBuilder().setLabel(region).setValue(region)
        )
      );
    const actionRow = new ActionRowBuilder().addComponents(selectMenu);

    const reply = await interaction.editReply({
      content:
        "Hey there!! 🌎 Ready to discover some of Goodgle developer groups chapters beyond borders?\n Select a region and get to know them",
      components: [actionRow],
    });
    const collector = interaction.channel.createMessageComponentCollector({
      componentType: ComponentType.SELECT_MENU,
      time: 3_600_000,
    });

    collector.on("collect", async (i) => {
      const selection = i.values[0];
      const selectedRegions = regionsData[selection] || [];
      const shuffledRegions = selectedRegions.sort(() => 0.5 - Math.random());
      const truncatedRegions = shuffledRegions.slice(0, 10); // Limit to 10 chapters per embed

      if (truncatedRegions.length === 0) {
        await i.reply({
          content: `**${selection}**\n\nNo chapters found for this region.`,
          ephemeral: true,
        });
        return;
      }

      const embeds = truncatedRegions.map((club) => {
        return {
          title: club.title,
          description: `📍 **${club.city}, ${club.country}**\n🔗 [Visit Chapter](${club.url})`,
          image: {
            url:
              club.picture?.url ||
              "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/chapter_banners/GDG23-Bevy-2650_E9BH6dw.png", // Use the chapter's picture or fallback image
          },
          color: 0x00ff00,
        };
      });

      await i.reply({
        embeds: embeds,
        ephemeral: true,
      });
    });
  },
};
