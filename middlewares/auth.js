const jwt = require('jsonwebtoken');


const auth = (req,res,next)=>{

    if(req.session.user){
const token=req.session.user;
const verified = jwt.verify(token,"jwtstrong" || process.env.JWT_SECRET)
        if(!verified){
            res.redirect('/login')
        }else{
        req.id = verified.userID;

        }
    }
    else{
;        res.redirect('/login')
    }
    next();
}

const stopLogin =(req,res,next)=>{
    if(req.session.user){
        const token=req.session.user;
const verified = jwt.verify(token,"jwtstrong" || process.env.JWT_SECRET)
if(verified){
    res.redirect('/profile')
}
    }

    next();
}

module.exports = {
    auth,
    stopLogin
}