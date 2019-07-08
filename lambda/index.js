const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

exports.handler = async (event) => {
    const res = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${event.lat},${event.lng}&radius=100&type=restaurant&key=${process.env.GOOGLE_MAP_API_KEY}`)
    return res.data;
};