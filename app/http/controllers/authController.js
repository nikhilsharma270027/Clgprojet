// factory function
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {
  const _getRedirectUrl = (req) => {
    return req.user.role === 'admin' ? '/admin/orders' : '/customer/orders'
    //----------------------------------/admin/orders : /customer/orders
}   // checks wheather its adminor customer ,so that a particular page is showen
    return {
      login(req, res) {
          res.render('auth/login');
      },
      postLogin(req,res, next){
        const { email, password } = req.body
    
        // Validate request 
        if (!email || !password) {
            req.flash('error', 'All fields are required')
            
            return res.redirect('/login')
        }

          passport.authenticate('local', (err, user, info) => {
                if(err){
                  req.flash('error', info.message)
                  return next(err)
                }
                if(!user){
                  req.flash('error', info.message)
                  return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                  if(err){
                    req.flash('error', info.message)
                    return next(err)
                  }

                  return res.redirect(_getRedirectUrl(req))
                })
          })(req, res, next)
      },

      register(req, res) {
        res.render('auth/register');
      },
      async postRegister(req, res) {
        // Object destructureing
        const { name, email, password } = req.body
    
        // Validate request 
        if (!name || !email || !password) {
            req.flash('error', 'All fields are required')//if fields are empty
            req.flash('name', name)//On refresh the values must not erase
            req.flash('email', email)
            return res.redirect('/register')
        }
    
        try {
            // Check if email exists
            const userExists = await User.exists({ email: email });
    
            if (userExists) {
                req.flash('error', 'Email already taken')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }
    
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Create a user
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            });
    
            await user.save();
            // Successfully registered, you can add login logic here
            return res.redirect('/');
        } catch (error) {
            req.flash('error', 'Something went wrong');
            return res.redirect('/register');
        }
    },
    // logout(req, res) {
    //   req.logout()
    //   return res.redirect('/login')
    logout(req, res) {
      req.logout(function() {
        // Optional code to run after logout (if needed)
        return res.redirect('/login');
      });
    
    

    }
  }  
}
  
  module.exports = authController;
  
  // CRUD opertion controller
