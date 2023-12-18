const Order = require('../../../models/order');
const User = require('../../../models/user');

function orderController() {
  return {
    async index(req, res) {
      try {
        const orders = await Order.find({ status: { $ne: 'completed' } })
          .sort({ createdAt: -1 })
          .populate('customerId', '-password')
          .exec();

        if (req.xhr) {
          return res.json(orders);
        } else {
          res.render('admin/orders', { orders });
        }
      } catch (err) {
        console.error('Error:', err);
        // Handle the error, possibly by sending an error response
        res.status(500).json({ error: 'An error occurred' });
      }
    },
  };
}

module.exports = orderController;