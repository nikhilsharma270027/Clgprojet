require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3300
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');


// Database Connection
//const url = 'mongodb://0.0.0.0/courier'
mongoose.connect(process.env.MONGO_CONNECTION_URL)
.then(() => {
    console.log("mongodb connected");
    })
    .catch(()=>{
    console.log("failed to connect");
    })
    const connection = mongoose.connection;
connection.once('open', () => {
console.log('Database connected... ');
})

// session configs  
// sessions are stored by default in memory
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl: process.env.MONGO_CONNECTION_URL
    }),
    saveUninitialized: false,
    cookie:{ maxAge: 1000 * 60 * 60 * 24 }  //24 hours 

}))

//using as a middleware
app.use(flash())


// Assets it show where the resouces are like css & js
app.use(express.static('public'))
app.use(express.json())

// Gobal Middleware
app.use((req,res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next() 
})



// Set Template engine / Layout
app.use(expressLayout)
app.set('views', path.join(__dirname, 'resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app) //initRoutes is a (),so we call app argument



app.listen(PORT, () => {  //Localhost: 3300
    console.log("Listening on port 3300!")
})