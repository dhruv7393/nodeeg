const express = require('express')
const app = express()

//Add body parser so we can easily convert incoming req to json
app.use(express.urlencoded({extended : false}))
app.use(express.json())

// Connect to mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://vidly:'+ process.env.MONGO_DB_PWD +'@vidly.g2ss2.mongodb.net/vidly?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true})

// Add morgan as middlewear to give logs about incoming request
const morgan = require('morgan')
app.use(morgan(process.env.NODE_ENV))

// Handle CRUD
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*') // Allows all url eg. http://www.google.... or http://www.facebook.....
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization') //allows a server to indicate which response headers should be made available to scripts running in the browser, in response to a cross-origin request
    if(req.method === 'OPTIONS'){ // browser always checks if we it can use options // indicates which method are allowed
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
        return res.status(200).json({})
    }
    next()
})

// Import all routes
const moviesRoute = require('./api/routes/movies')

// Implement Routes
app.use('/movies', moviesRoute)

// Implement Default Routes
app.use('/',(req, res, next)=>{
    res.status(200).json({
        message: "Hi Vidly"
    })
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500).json({
        error:{
            message: error.message
        }
    })
})

module.exports = app