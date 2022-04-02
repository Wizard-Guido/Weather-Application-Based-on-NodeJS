const axios = require('axios');

async function getWeather(url, callback) {
    try {
        const response = await axios.get(url, {headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36'}});
        const weather = response.data;
        console.log(weather);
        if (weather.error) callback('Please provide a valid location', undefined, undefined);
        else callback(undefined, weather.location, weather.current);
    } catch (error) {
        console.log(error);
    }
}

module.exports = getWeather
