const Order = require('../../../models/order')
//const Courier = require('../../../models/courierInfo')
const moment = require('moment')
const { session } = require('passport')
function orderController() {
    return {
    async store(req, res){
        try{
            console.log(req.body)
            //Validate request
            const { phone, address } = req.body
            if( !phone || !address){
                req.flash('error', 'All fields are required')
                return res.redirect('/cart')
            }
            
            // const itemsFromSession = req.session.formData.items.map(item => ({
            //     price: item.cost
            // }));

            //creating / Sending data to database
            const order = new Order({
                customerId: req.user._id,
                // courierId: req.courier._id,

                items: req.session.formData,
                phone,
                address
            })

            const result = await order.save();
            const placedOrder = await Order.populate(result, { path: 'customerId' });

            req.flash('success', 'Order placed successfully');
            //delete req.session.formData;

            // Emit
            const eventEmitter = req.app.get('eventEmitter');
            eventEmitter.emit('orderPlaced', placedOrder);
            
            return res.redirect('/payment');//, {courier:courier}
        } catch (err) {
            req.flash('error', 'Something went wrong');
            return res.redirect('/cart');
        }
    
        },
        async index(req, res){
            const orders = await Order.find({ customerId: req.user._id },
                null, 
                { sort: { 'createdAt': -1 } } )
                res.header('Cache-Control', 'no-store')    
            res.render('customers/orders', {orders: orders, moment: moment})
             console.log(orders)
        },
        async show(req, res) {
            const order = await Order.findById(req.params.id)//Order is a model
            //Authorise User
            if(req.user._id.toString() == order.customerId.toString()){//id is in object form ,so we must convert to string to make it comparable
                return res.render('customers/singleOrder', { order : order })
            }   //if customer id doesnt macth we dont allow to even watch the page
            return res.redirect('/')
            
        }
    }
}


module.exports = orderController;

//created orders web link, orders.js ,models  order n courierpage