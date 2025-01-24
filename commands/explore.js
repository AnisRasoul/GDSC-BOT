const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
  ComponentType,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { default: axios } = require("axios");
const {
  getAlgeriaChapters,
  getNorthAmericaChapters,
  getSouthAmericaChapters,
  getEuropeChapters,
  getAfricaChapters,
  getAsiaChapters,
} = require("../utils/getChapters");
const { getClubMembers } = require("../utils/getTeam");
const { getClubEvents } = require("../utils/getEvents");
const { createRegionsMenu } = require("../components/select-menu/regionsMenu");
const { createChaptersMenu } = require("../components/select-menu/chaptersMenu");
const { createChapterEmbed } = require("../components/embeds/chapterEmbed");
const { createMembersButton } = require("../components/buttons/membersButton");
const { createEventsButton } = require("../components/buttons/eventsButton");
const { createEventsEmbed } = require("../components/embeds/eventsEmbed");
const { createMemberEmbed } = require("../components/embeds/membersEmbed");

module.exports = {
  deleted: false,
  data: new SlashCommandBuilder()
    .setName("explore")
    .setDescription("This shows you some GDSC world's chapters"),

  run: async ({ interaction, client, handler }) => {
    try {
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
      const selectMenu = createRegionsMenu(regions);
      const actionRow = new ActionRowBuilder().addComponents(selectMenu);

      await interaction.editReply({
        content:
          "Hey there!! 🌎 Ready to discover some of Google developer groups chapters beyond borders?\n Select a region and get to know them",
        components: [actionRow],
      });

      // Store previous messages for cleanup
      let previousMessages = [];

      const regionCollector =
        interaction.channel.createMessageComponentCollector({
          componentType: ComponentType.SelectMenu,
          time: 3_600_000,
          filter: (i) => i.customId === "region_select",
        });

      regionCollector.on("collect", async (i) => {
        try {
          await i.deferUpdate();
          const selection = i.values[0];
          const selectedRegions = regionsData[selection] || [];
          const shuffledRegions = selectedRegions.sort(
            () => 0.5 - Math.random()
          );
          const truncatedRegions = shuffledRegions
            .filter((club) => club.url.length <= 100)
            .slice(0, 24);

          if (truncatedRegions.length === 0) {
            const noChaptersMessage = await i.followUp({
              content: `**${selection}**\n\nNo chapters found for this region.`,
              ephemeral: true,
            });
            previousMessages.push(noChaptersMessage);
            return;
          }

          const clubSelectMenu = createChaptersMenu(truncatedRegions);
          const clubActionRow = new ActionRowBuilder().addComponents(
            clubSelectMenu
          );

          const clubSelectionMessage = await i.followUp({
            content: `**${selection}**\n\nSelect a club to see more details:`,
            components: [clubActionRow],
            ephemeral: true,
          });
          previousMessages.push(clubSelectionMessage);

          const clubCollector =
            interaction.channel.createMessageComponentCollector({
              componentType: ComponentType.SelectMenu,
              time: 3_600_000,
              filter: (i) => i.customId === "club_select",
            });

          clubCollector.on("collect", async (clubInteraction) => {
            try {
              await clubInteraction.deferUpdate();



              const selectedClubId = clubInteraction.values[0];
              const selectedClub = truncatedRegions.find(
                (club) => club.id.toString() === selectedClubId
              );

              if (!selectedClub) {
                const notFoundMessage = await clubInteraction.followUp({
                  content: "Club not found.",
                  ephemeral: true,
                });
                previousMessages.push(notFoundMessage);
                return;
              }

              const clubEmbed = createChapterEmbed(selectedClub);
              const membersButton = createMembersButton(selectedClub);
              const eventsButton = createEventsButton(selectedClub);

              const buttonActionRow = new ActionRowBuilder().addComponents(
                membersButton,
                eventsButton
              );

              const clubEmbedMessage = await clubInteraction.followUp({
                embeds: [clubEmbed],
                components: [buttonActionRow],
                ephemeral: true,
              });
              previousMessages.push(clubEmbedMessage);

              const buttonCollector =
                interaction.channel.createMessageComponentCollector({
                  componentType: ComponentType.Button,
                  time: 3_600_000,
                });

              buttonCollector.on("collect", async (buttonInteraction) => {
                try {
                  await buttonInteraction.deferUpdate();

                  const [action, clubId] =
                    buttonInteraction.customId.split("_");

                  if (action === "members") {
                    const clubMembers = await getClubMembers(clubId);
                    const membersEmbeds = createMemberEmbed(clubMembers);

                    for (const embed of membersEmbeds) {
                      const memberEmbedMessage = await buttonInteraction.followUp({
                        embeds: [embed],
                        ephemeral: true,
                      });
                      previousMessages.push(memberEmbedMessage);
                    }
                  } else if (action === "events") {
                    try {
                      const clubid = parseInt(clubId, 10);
                      const clubEvents = await getClubEvents(clubid);
                      const eventEmbeds = createEventsEmbed(clubEvents);

                      const eventsEmbedMessage = await buttonInteraction.followUp({
                        embeds: eventEmbeds,
                        ephemeral: true,
                      });
                      previousMessages.push(eventsEmbedMessage);
                    } catch (error) {
                      console.error(error);
                      const errorMessage = await buttonInteraction.followUp({
                        content: "No events found for this club.",
                        ephemeral: true,
                      });
                      previousMessages.push(errorMessage);
                    }
                  }
                } catch (error) {
                  console.error("Button interaction error:", error);
                  const errorMessage = await buttonInteraction.followUp({
                    content: "An error occurred while processing your request.",
                    ephemeral: true,
                  });
                  previousMessages.push(errorMessage);
                }
              });
            } catch (error) {
              console.error("Club interaction error:", error);
              const errorMessage = await clubInteraction.followUp({
                content: "An error occurred while processing your request.",
                ephemeral: true,
              });
              previousMessages.push(errorMessage);
            }
          });
        } catch (error) {
          console.error("Region interaction error:", error);
          const errorMessage = await i.followUp({
            content: "An error occurred while processing your request.",
            ephemeral: true,
          });
          previousMessages.push(errorMessage);
        }
      });
    } catch (error) {
      console.error("Command execution error:", error);
      await interaction.followUp({
        content: "An error occurred while processing your request.",
        ephemeral: true,
      });
    }
  },
};