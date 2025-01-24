const axios = require('axios');

async function getClubEvents(clubID) {
    try {
        const response = await axios.get(`https://gdg.community.dev/api/event_slim/for_chapter/${clubID}/?order=-start_date&fields=title,start_date,event_type_title,cropped_picture_url,cropped_banner_url,url,cohost_registration_url,description,description_short`);
        return response.data.results;
    } catch (error) {
        console.error(`Error fetching events: ${error.message}`);
        return [];
    }
}

module.exports = { getClubEvents };