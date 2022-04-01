const axios = require('axios');

async function getWeather(url, callback) {
    try {
        const response = await axios.get(url, {headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36'}});
        const weather = response.data;
        callback(null, `The temperature is ${weather.current.temperature}, but it feels like ${weather.current.feelslike}`, weather.location.country);
    } catch (error) {
        callback('The location is incorrect, please try again!', null, null);
    }
}

module.exports = getWeather
