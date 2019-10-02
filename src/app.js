//run with update hbs refresh
//nodemon src/app.js -e js,hbs
const  path = require('path')
const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define pathes for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views locaion
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))


app.get('', (req, res) =>{
    res.render('index',{
        title:'Weather App',
        name:'Eliko mead'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title:'About me',
        name:'Me and only me'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title:'Help page',
        name:'Eliko Meiler',
        helpText:'This is an intro message ...'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'404',
        name:'Eliko',
        errorMessage:'Help article not found.'
    })
})

app.get('/weather', (req, res) =>{
    let address = req.query.address;
    if(!address){
       return res.send({
            error:'address missing'
        })
    }

    geocode(address,(error, {lat, lng, location} = {})=>{
        if(error){
            console.log(chalk.red('Error from gocode: '+ error))
            res.send({error:'Cannot find a location'})
        }else{
            forecast(lat,lng,(error, response)=>{
                if(error){
                    console.log(chalk.red('Error from weather api: '+ error))
                    res.send({error:'Error in weather: '})
                }else{
                    res.send({
                        forecast:response,
                        location,
                        address
                    })
                }
            })
        }
    })
    
   
})

//profucts?search=games&rating=5
app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error:'you must provide search term'
        })
        
    }


    res.send({
        products:[]
    })
})


//last - 404
app.get('*', (req, res) =>{
    res.render('404',{
        title:'404',
        name:'Eliko',
        errorMessage:'Page not  found.'
    })
})



app.listen(port, () =>{
    //default when server start
    console.log('Server is up on port '+ port +'.')
})