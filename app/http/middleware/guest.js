// used when a client is already logged n not to show login and registerion by /login & /registers
 
function guest (req, res, next){
    if(!req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/')
}

module.exports = guest;