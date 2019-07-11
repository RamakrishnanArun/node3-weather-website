const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

const app = express()

// Define paths for Express/HBS configuration
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather application',
        name: 'Arun Ramakrishnan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Arun Ramakrishnan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'FAQ',
        message: 'Contact arunrama@in.ibm.com for any support requests.',
        name: 'Arun Ramakrishnan'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Arun Ramakrishnan'
    })
})

app.get('/weather', (req, res) => {
    const address =  req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address to search for'
        })
    }

    geocode.search(address, (error, { location, longitude, latitude } = {}) => {
      if (error) {
        res.send(error);
      } else {
        weather.forecast(longitude, latitude, (error, { daySummary, temperature, rainChance } = {}) => {
            if (error) {
              res.send(error);
            } else {
              res.send({
                forecast: {
                    daySummary,
                    temperature,
                    rainChance
                },
                location,
                address
              });
            }
          }
        );
      }
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Arun Ramakrishnan'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
