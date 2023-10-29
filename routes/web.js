// All routes
//we move our logic to controllers
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const homeController = require('../app/http/controllers/homeController')

function initRoutes(app) { // recieveing app from server.js

    app.get('/', homeController().index)

    //(req, res) => {
    //    res.render('home')
    //}

    app.get('/courier', (req,res) => {  //cart
        res.render('courier')
    })
    app.get('/cart', cartController().index)
    app.get('/login', authController().login)
    app.get('/register', authController().register)
    

}

module.exports = initRoutes;