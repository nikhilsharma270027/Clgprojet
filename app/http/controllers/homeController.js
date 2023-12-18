// factory function
const User = require('../../models/user')

function homeController() {
    return {
        async index(req,res) {
            try {
      
                // Fetch all employees and render the employee list
                const users = await User.find({});
                res.render('home', { users });
              } catch (err) {
                console.error(err);
                res.send('Error fetching from the database.');
              }


        }
    }
}

module.exports = homeController;
