const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ComponentType,
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
const {
  createChaptersMenu,
} = require("../components/select-menu/chaptersMenu");
const { createChapterEmbed } = require("../components/embeds/chapterEmbed");
const { createMembersButton } = require("../components/buttons/membersButton");
const { createEventsButton } = require("../components/buttons/eventsButton");
const { createEventsEmbed } = require("../components/embeds/eventsEmbed");
const { createMemberEmbed } = require("../components/embeds/membersEmbed");
const { createSMButton } = require("../components/buttons/smButton");
const { getSocialMediaLinks } = require("../utils/getSM");

module.exports = {
  deleted: false,
  data: new SlashCommandBuilder()
    .setName("explore")
    .setDescription("This shows you some GDSC world's chapters"),

  run: async ({ interaction }) => {
    try {
      // Defer the reply to avoid interaction timeout
      await interaction.deferReply({ ephemeral: true });

      // Fetch chapters data
      const res = await axios.get(
        "https://gdg.community.dev/api/chapter_region?chapters=true"
      ).catch((error) => {
        throw new Error(`Failed to fetch chapters data: ${error.message}`);
      });

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

      // Send the initial reply with the regions menu
      await interaction.editReply({
        content:
          "Hey there!! 🌎 Ready to discover some of Google developer groups chapters beyond borders?\n Select a region and get to know them",
        components: [actionRow],
      });

      // Region selection collector
      const regionCollector = interaction.channel.createMessageComponentCollector({
        componentType: ComponentType.SelectMenu,
        time: 3_600_000,
        filter: (i) => i.customId === "region_select",
      });

      regionCollector.on("collect", async (i) => {
        try {
          await i.deferUpdate();

          const selection = i.values[0];
          const selectedRegions = regionsData[selection] || [];
          const shuffledRegions = selectedRegions.sort(() => 0.5 - Math.random());
          const truncatedRegions = shuffledRegions
            .filter((club) => club.url.length <= 100)
            .slice(0, 24);

          if (truncatedRegions.length === 0) {
            await i.followUp({
              content: `**${selection}**\n\nNo chapters found for this region.`,
              ephemeral: true,
            });
            return;
          }

          const clubSelectMenu = createChaptersMenu(truncatedRegions);
          const clubActionRow = new ActionRowBuilder().addComponents(clubSelectMenu);

          await i.followUp({
            content: `**You have selected ${selection} !**\nSelect a club to see more details:`,
            components: [clubActionRow],
            ephemeral: true,
          });

          // Club selection collector
          const clubCollector = interaction.channel.createMessageComponentCollector({
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
                await clubInteraction.followUp({
                  content: "Club not found.",
                  ephemeral: true,
                });
                return;
              }

              const clubEmbed = createChapterEmbed(selectedClub);
              const membersButton = createMembersButton(selectedClub);
              const eventsButton = createEventsButton(selectedClub);
              const smButton = createSMButton(selectedClub);

              const buttonActionRow = new ActionRowBuilder().addComponents(
                membersButton,
                eventsButton,
                smButton
              );

              await clubInteraction.followUp({
                embeds: [clubEmbed],
                components: [buttonActionRow],
                ephemeral: true,
              });

              // Button interaction collector
              const buttonCollector = interaction.channel.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 3_600_000,
              });

              buttonCollector.on("collect", async (buttonInteraction) => {
                try {
                  await buttonInteraction.deferUpdate();

                  const [action, clubId] = buttonInteraction.customId.split("_");

                  if (action === "members") {
                    const clubMembers = await getClubMembers(clubId).catch((error) => {
                      throw new Error(`Failed to fetch members: ${error.message}`);
                    });
                    const membersEmbeds = createMemberEmbed(clubMembers);

                    for (const embed of membersEmbeds) {
                      await buttonInteraction.followUp({
                        embeds: [embed],
                        ephemeral: true,
                      });
                    }
                  } else if (action === "events") {
                    const clubid = parseInt(clubId, 10);
                    const clubEvents = await getClubEvents(clubid).catch((error) => {
                      throw new Error(`Failed to fetch events: ${error.message}`);
                    });
                    const eventEmbeds = createEventsEmbed(clubEvents);

                    await buttonInteraction.followUp({
                      embeds: eventEmbeds,
                      ephemeral: true,
                    });
                  } else if (action === "sm") {
                    const socialMediaLinks = await getSocialMediaLinks(clubId).catch((error) => {
                      throw new Error(`Failed to fetch social media links: ${error.message}`);
                    });

                    if (socialMediaLinks.length === 0) {
                      await buttonInteraction.followUp({
                        content: "No social media links found for this club.",
                        ephemeral: true,
                      });
                      return;
                    }

                    const socialMediaButtons = socialMediaLinks.map((link) =>
                      new ButtonBuilder()
                        .setLabel(link.platform)
                        .setStyle(ButtonStyle.Link)
                        .setURL(link.link)
                    );

                    const smActionRow = new ActionRowBuilder().addComponents(
                      ...socialMediaButtons
                    );

                    await buttonInteraction.followUp({
                      content: "Here are the social media links:",
                      components: [smActionRow],
                      ephemeral: true,
                    });
                  }
                } catch (error) {
                  console.error("Button interaction error:", error);
                  await buttonInteraction.followUp({
                    content: "An error occurred while processing your request.",
                    ephemeral: true,
                  });
                }
              });
            } catch (error) {
              console.error("Club interaction error:", error);
              await clubInteraction.followUp({
                content: "An error occurred while processing your request.",
                ephemeral: true,
              });
            }
          });
        } catch (error) {
          console.error("Region interaction error:", error);
          await i.followUp({
            content: "An error occurred while processing your request.",
            ephemeral: true,
          });
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