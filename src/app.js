const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getweather = require('./utils/getweather');

// Define paths for Express config
const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Forecast',
        name: 'Will'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Will'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Will'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide the location!'
        })
    }

    const city = req.query.search;
    const url = `http://api.weatherstack.com/current?access_key=23cf270ceec711762d56f9d1ac5b5e2f&query=${city}`;
    getweather(url, (error, {name, region, country} = {}, { temperature, feelslike, wind_speed } = {}) => {
        if (error) return res.send({error: error});
        res.send({name, region, country, tips: `The wind speed is ${wind_speed}. The temperature is ${temperature} celsius, but it feels like ${feelslike} celsius :)`});
    })

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found',
        name: 'Will'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'Will'
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});