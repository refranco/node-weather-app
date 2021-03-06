const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() // app would be kind of an object of express class
const port = process.env.PORT || 3000  // ****Cambio HEROKU


// define paths for express library
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partial')

//setup handlebars engine and views location
app.set('view engine', 'hbs')  // set up hbs handlebars 
app.set('views', viewsPath)  // customize views folder
hbs.registerPartials(partialPath)

//setup static directory 
app.use(express.static(publicDirectory)) // este app.use reemplaza en este caso el app.get marcado con *****

// otro metodo para enviar al usuario a url dinamicos con hbs
app.get('', (req, res) => {
      res.render('index',{
            title:'Weather',
            name:'Esteban Franco',
            titlePage:'Main page'
      })
})

app.get('/about',(req,res) => {
      res.render('about',{
            title:'About Page',
            name: 'Esteban Franco',
            titlePage:'About'
      })
})

app.get('/help',(req,res) => {
      res.render('help',{
            title:'HELP PAGE',
            name: 'Esteban Franco',
            message:'This is the first help page',
            titlePage:'Help'
      })
})
//*****
//app.get('', (req, res) => {  //method to get the user to some url within our domain 
//       res.send('Hello Express') // and just print a particular message
// })  

app.get('/weather',(req, res) => {
      if (!req.query.address) {
            return res.send({
                  error: 'You must provide an address'
            })
      }     
      geocode(req.query.address,(error, {latitude, longitude, place_name} = {}) => {
            if (error) {
                  return res.send({error})
            }
            forecast( latitude, longitude, (error, forecast) =>{
                  if (error) {
                        return res.send({error})
                  }
                  res.send({
                        address: req.query.address,
                        location: place_name,
                        forecast: forecast
                        
                  })
            }) 
            })
 
})

//------ configurando 404 page -------- DEBE IR DE ULTIMO!!
app.get('/help/*',(req,res) =>{
      res.render('404',{
            title: 'Articulo de ayuda no encontrado',
            name: 'Esteban Franco',
            message404: 'Para este art??culo no existe ninguna ayuda',
            titlePage:'Help error'
      })
})

app.get('*',(req,res) => {
      res.render('404',{
            title: 'Pagina no encontrada',
            name: 'Esteban Franco',
            message404: 'La pagina que intenta buscar no es posible encontrarla, posiblemente no exista',
            titlePage:'Not found'
      })
})
// va al final port =  3000 para correr localmente o process.env.PORT para correr en heroku
app.listen(port, () => { // ****Cambio HEROKU
      console.log('server is up on port '+ port)
})