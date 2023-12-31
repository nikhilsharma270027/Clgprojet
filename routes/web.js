// All routes
//we move our logic to controllers
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const homeController = require('../app/http/controllers/homeController')
const orderController = require('../app/http/controllers/customers/orderController')
const employeeController = require('../app/http/controllers/employeeController')
const paymentController = require('../app/http/controllers/customers/paymentController')

const adminOrderController = require('../app/http/controllers/admin/orderController');
const statusController = require('../app/http/controllers/admin/statusController');

// Middleware
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const admin = require('../app/http/middleware/admin')
const courierController = require('../app/http/controllers/customers/courierController')

function initRoutes(app) { // recieveing app from server.js

    app.get('/', homeController().index)
    
    //(req, res) => {
    //    res.render('home')
    //}

    app.get('/courier', (req,res) => {  //cart
        res.render('courier')
    })
    // app.post('/courierinfo', (req, res) => {
    //     const formData = req.body;

    //      // Store form data in the session
    //     req.session.formData = formData;
        

    //      // Redirect to the cart page
    //     res.redirect('/cart');
    //     console.log(formData);
    //     console.log(formData.weight);
    //     //res.json(formData);
    // });
    app.post('/courierinfo', (req, res) => {
        const {
            senderName,
            receiverName,
            courierType,
            weight,
            senderAddress,
            senderCity,
            senderPincode,
            receiverAddress,
            receiverCity,
            receiverPincode
        } = req.body;
    
        // Validate request
        if (!senderName || !receiverName || !courierType || !weight || !senderPincode || !senderAddress || !senderCity || !receiverAddress || !receiverCity || !receiverPincode) {
            req.flash("error", "All fields are required");
            return res.redirect("/courier"); // or whatever your error redirect route is
        }
    
        // Store form data in the session
        req.session.formData = {
            senderName,
            receiverName,
            courierType,
            weight,
            senderAddress,
            senderCity,
            senderPincode,
            receiverAddress,
            receiverCity,
            receiverPincode
        };
    
        // Redirect to the cart page
        res.redirect('/cart');
        console.log(req.session.formData);
    });
    


    
    

    app.get('/login', guest, authController().login)  //done
    app.post('/login', authController().postLogin)  //done
    
    app.get('/register', guest, authController().register)  //done
    app.post('/register', authController().postRegister)  //done

    app.post('/logout', authController().logout) //done

    app.post('/courierinfo', courierController().store)
   
    app.post('/cart', cartController().index)

    app.get('/cart', cartController().index)
    app.post('/update-cart', orderController().index)

    
    
    //Customer routes
    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/payment', auth, paymentController().success)
    app.get('/customer/orders/:id', auth, orderController().show)
    
    
    //Admin routes
    app.get('/admin/orders', admin, adminOrderController().index)
    // admin/order/status
    app.post('/admin/order/status', admin, statusController().update)


    //Employee Input
        app.get('/employee', employeeController.getEmployees); //done
        app.post('/employeeinfo', employeeController.submitEmployee);  //done


    
}

module.exports = initRoutes;