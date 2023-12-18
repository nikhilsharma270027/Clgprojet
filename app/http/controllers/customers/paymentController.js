function paymentController() {
    return {
        async success(req, res) {
            // Handle success logic here (if needed)
            res.render('paymentSuccess'); // Render a success page if needed
        },
        // ... (other methods)
    };
}


module.exports = paymentController;