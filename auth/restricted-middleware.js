module.exports = (req, res, next)=>{
    //check whether client has successfully login before.
    // if successfully login, then look for session id
    //console.log("session",req.session)

    if (req.session && req.session.user) {
        next()
    } else {
        res.status(401).json({message : "No session cookie found. User has not login"})
    }
    
};