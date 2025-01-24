const { default: axios } = require("axios");
const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  deleted: false,
  data: new SlashCommandBuilder()
    .setName("find-events")
    .setDescription(
      "Find upcoming events in the GDG community based on your input"
    ),
  run: async ({ interaction, client, handler }) => {
    const modal = new ModalBuilder()
      .setCustomId("eventFinderModal")
      .setTitle("Find Your Event By Type and Topic");

    const eventTypeInput = new TextInputBuilder()
      .setCustomId("eventTypeInput")
      .setLabel("Hackathon,Workshop,Conference,Info Session")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const eventTopicInput = new TextInputBuilder()
      .setCustomId("eventTopicInput")
      .setLabel("Cloud,AI,Web,Mobile,DevOps")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const firstActionRow = new ActionRowBuilder().addComponents(eventTypeInput);
    const secondActionRow = new ActionRowBuilder().addComponents(
      eventTopicInput
    );

    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);

    const filter = (i) => i.customId === "eventFinderModal";
    const submitted = await interaction
      .awaitModalSubmit({ filter, time: 60000 })
      .catch(() => null);

    if (!submitted) {
      await interaction.followUp({
        content: "You did not submit the modal in time.",
        ephemeral: true,
      });
      return;
    }

    await submitted.deferReply({ ephemeral: true });

    const eventType = submitted.fields.getTextInputValue("eventTypeInput");
    const eventTopic = submitted.fields.getTextInputValue("eventTopicInput");

    let eventTypeSlug, eventTopicTag;

    if (eventType) {
      switch (eventType.toLowerCase()) {
        case "hackathon":
          eventTypeSlug = "hackathon";
          break;
        case "workshop":
          eventTypeSlug = "workshop-study-group";
          break;
        case "conference":
          eventTypeSlug = "conference";
          break;
        case "info session":
          eventTypeSlug = "info-session";
          break;
        default:
          eventTypeSlug = "";
      }
    } else {
      eventTypeSlug = "";
    }

    if (eventTopic) {
      switch (eventTopic.toLowerCase()) {
        case "cloud":
          eventTopicTag = "Cloud";
          break;
        case "ai":
          eventTopicTag = "AI";
          break;
        case "web":
          eventTopicTag = "Web";
          break;
        case "mobile":
          eventTopicTag = "Mobile";
          break;
        case "devops":
          eventTopicTag = "DevOps";
          break;

        default:
          eventTopicTag = "";
      }
    } else {
      eventTopicTag = "";
    }

    try {
      const url = `https://gdg.community.dev/api/search/?result_types=upcoming_event&country_code=Earth&event_type_slug=${eventTypeSlug}&tags=${eventTopicTag}`;
      const res = await axios.get(url);
      const jsonData = res.data.results;

      if (jsonData.length === 0) {
        await submitted.editReply({
          content: "No events found for your query.",
        });
        return;
      }

      const eventEmbeds = jsonData.map((item) => {
        const embed = new EmbedBuilder()
          .setTitle(item.title)
          .setDescription(item.description_short || "No description available")
          .addFields(
            { name: "Date", value: item.start_date, inline: true },
            { name: "Event Type", value: item.event_type_title, inline: true },
            {
              name: "Location",
              value: `${item.chapter.city}, ${item.chapter.country_name}`,
              inline: true,
            },
            { name: "Link", value: item.url },
            {
              name: "Tags",
              value: item.tags.join(", ") || "No tags",
              inline: true,
            }
          )
          .setColor("#0099ff");
        if (embed.length > 5000) {
          embed.setDescription("Description too long to display.");
        }
        return embed;
      });

      const slicedEmbeds = eventEmbeds.slice(0, 9);

      await submitted.editReply({
        embeds: slicedEmbeds,
      });
    } catch (error) {
      console.error("Error fetching events:");
      await submitted.editReply({
        content: "Failed to fetch events. Please try again later.",
      });
    }
  },
};
