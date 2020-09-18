const path = require('path');
const fs = require('fs')
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port =  process.env.PORT || 3000;
//Define paths for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectotyPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//setup handle bar and view location
app.set("view engine", "hbs")
app.set('views', viewsDirectotyPath)
hbs.registerPartials(partialsPath)

//will find index.html by default // setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    //renders handle bar
    res.render('index', {
        title: 'Weather App',
        name: 'Madhura'
    });
})

app.get('/about', (req, res) => {
    res.render('about' , {
        title: 'About App ',
        name: 'Madhura'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Contact',
        helpText: 'This is some helpful text',
        name: 'Madhura'
    })
})

app.get('/weather', (req, res) => {
    
    //if address no present
    if(! req.query.address) {
       return  res.send({
            error: 'please provide the search location'
        })
    }
    
    //if address present
    geocode(req.query.address, (error, { latitude, longitute, location} = {}) => {//if error object destructor wont work give default value, can not destruct undefined
            if (error) {
                return res.send({ error })
            }
            forecast(latitude, longitute, (error, forecastData) => {
                if (error) {
                     return res.send({  error })
                }
                return res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                })
            });
    });
})

app.get('/products',(req, res)=>{
    if(! req.query.search) {
        return res.send({
            error: 'must provide a search a term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('notfound', {
        title: "404",
        name: 'Madhura',
        description: 'Help article not found'
    })
})

//404 page
app.get('*', (req,res)=> {
    res.render('notfound', {
        title: "404",
        name: 'Madhura',
        description: 'Page not found'
    })
})
//app.com ---> root route
//app.com/help
//app.com/about

//this will start the server
app.listen(port, () => {//port, call back function
    console.log(`Server is up at ${port}`)
})

