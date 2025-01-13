const axios = require('axios');

async function getGDGCEvents() {
    return axios.get('https://gdg.community.dev/api/event_slim/for_chapter/2785/?page_size=1000&status=Completed&include_cohosted_events=true&visible_on_parent_chapter_only=true&order=-start_date&fields=title,start_date,event_type_title,cropped_picture_url,cropped_banner_url,url,cohost_registration_url,description,description_short&page=1');
}

module.exports = { getGDGCEvents };