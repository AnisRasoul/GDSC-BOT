const axios = require("axios");
const cheerio = require("cheerio");

async function getClubMembers(clubUrl) {
  try {
    const { data: html } = await axios.get(clubUrl);

    const $ = cheerio.load(html);

    const rolesSelectors = ["#f58BKFp3yCy > span:nth-child(2) > span"];

    const organizersSelectors = [
      "#vAtWlQhwJcB > span:nth-child(2) > span > strong",
    ];

    const organizerImageSelector = "#n96CYy_dw > div > div > div > img";
    const organizerUrlSelector = "#e5ZcEmbIBL1 > a";

    const extractTextFromSelectors = (selectors) => {
      return selectors.flatMap((selector) =>
        $(selector)
          .map((i, el) => $(el).text())
          .get()
      );
    };

    const extractImageFromSelector = (selector) => {
      return $(selector)
        .map((i, el) => $(el).attr("src"))
        .get();
    };
    const extractUrl = (selector) => {
      return $(selector)
        .map((i, el) => $(el).attr("href"))
        .get();
    };

    const rolesResult = extractTextFromSelectors(rolesSelectors);
    const organizersResult = extractTextFromSelectors(organizersSelectors);
    const organizerImages = extractImageFromSelector(organizerImageSelector);
    const organizerUrls = extractUrl(organizerUrlSelector);

    const team = rolesResult.map((role, i) => ({
      role,
      organizer: organizersResult[i],
      organizerImage: organizerImages[i],
      organizerUrl: `https://gdg.community.dev${organizerUrls[i]}` // Fix the URL assignment
    }));
    return team;
  } catch (error) {
    console.error("Error scraping data:", error.message);
  }
}

module.exports = { getClubMembers };
