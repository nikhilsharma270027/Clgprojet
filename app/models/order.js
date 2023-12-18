// for order info data


const mongoose = require('mongoose');
const Schema = mongoose.Schema

const orderSchema = new Schema({
    customerId: { 
                    type: mongoose.Schema.Types.ObjectId ,
                    ref: 'User',//reference model name 
                    required: true
                },
    // courierId: { 
    //                 type: mongoose.Schema.Types.ObjectId ,
    //                 ref: 'Courier',//reference model name 
    //                 required: true
    //             },
    items:  { type: Object, required: true },
    phone: { type: String, required: true },          
    address: { type: String, required: true },          
    paymentType: { type: String, default: 'COD' },          
    status: { type: String, default: 'order_placed' },          
            }, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema);
