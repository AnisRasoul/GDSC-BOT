const axios = require("axios");
const cheerio = require("cheerio");

const platforms = [
  { keyword: 'twitter.com', name: 'Twitter' },
  { keyword: 'facebook.com', name: 'Facebook' },
  { keyword: 'instagram.com', name: 'Instagram' },
  { keyword: 'linkedin.com', name: 'LinkedIn' },
  { keyword: 'youtube.com', name: 'YouTube' }
];

function identifyPlatform(url) {
  const platform = platforms.find(p => url.includes(p.keyword));
  return platform ? platform.name : 'Other';
}

async function getSocialMediaLinks(clubUrl) {
  try {
    const { data: html } = await axios.get(clubUrl);
    const $ = cheerio.load(html);

    const links = [];
    const socialMediaSelector = '#qrqR3bd6M > ul > li > a';

    $(socialMediaSelector).each((i, el) => {
      const href = $(el).attr('href');
      if (href) {
        links.push({
          link: href,
          platform: identifyPlatform(href)
        });
      }
    });

    console.log(links);
    return links;

  } catch (error) {
    console.error("Error scraping data:", error.message);
    return [];
  }
}

module.exports = { getSocialMediaLinks };
