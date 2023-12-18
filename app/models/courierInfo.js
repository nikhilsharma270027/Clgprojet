// For courier data

// Define the schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courierSchema = new Schema({
  senderName: { type: String, required: true },
  receiverName: { type: String, required: true },
  courierType: { type: String, required: true },
  weight: { type: String, required: true },
  senderAddress: { type: String, required: true },
  senderCity: { type: String, required: true },
  receiverAddress: { type: String, required: true },
  receiverCity: { type: String, required: true },
}, { timestamps: true });

//Create a collection in db
const Courier = mongoose.model('Courier', courierSchema);

//Export model
module.exports = Courier;

