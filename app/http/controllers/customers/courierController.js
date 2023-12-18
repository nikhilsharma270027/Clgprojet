// controllers/courierController.js

const Courier = require('../../../models/courierInfo');

function courierController() {
  return {
    async store(req, res) {
      // const formData = req.body;

      //    // Store form data in the session
      //   req.session.formData = formData;
      //   res.redirect('/cart');
      //   console.log(formData);
        
      //   // console.log(req.body)
      try {
        const {
          senderName,
          receiverName,
          courierType,
          weight,
          senderAddress,
          senderCity,
          receiverAddress,
          receiverCity
        } = req.body;

        // Validate the request if needed

        const courier = new Courier({
          senderName,
          receiverName,
          courierType,
          weight,
          senderAddress,
          senderCity,
          receiverAddress,
          receiverCity
        });

        const result = await courier.save();

        req.flash('success', 'Courier details submitted successfully');
        return res.redirect('/cart');//, { formData}
      } catch (err) {
        req.flash('error', 'Something went wrong');
        return res.redirect('/courier');
      }
    }
  };
}

module.exports = courierController;
