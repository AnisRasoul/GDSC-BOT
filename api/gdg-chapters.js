const axios = require('axios');

async function getGDGChapters() {
    return axios.get('https://gdg.community.dev/api/chapter_region?chapters=true');
}

module.exports = { getGDGChapters };