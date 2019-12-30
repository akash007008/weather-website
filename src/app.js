const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//defining path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))
app.get('',(req,res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Akash Goel'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About Us..',
        name : 'Akash Goel'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        message : 'Hi. How can I help you?',
        title : 'Helping You',
        name : 'Akash Goel'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return  res.send({
                    error : 'Address query is required.'
                })
    }
    geocode(req.query.address, (error, {longitude,latitude,location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(longitude,latitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecastData,
                address : req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title : 'ERROR : 404 ',
        message : "Help article Not Found",
        name : "Akash Goel"
    })
})
app.get('*', (req,res) => {
    res.render('404',{
        title : 'ERROR : 404 ',
        message : 'PAGE NOT FOUND',
        name : "Akash Goel"
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})