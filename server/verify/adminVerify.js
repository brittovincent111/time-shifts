const jwt = require('jsonwebtoken')

const adminVerifyJWT = (req,res,next)=>{
    console.log('in verify');
    console.log(req.headers)
    const token = req.headers.accesstoken;
    console.log(token,'its token');
    if(!token){
        res.status(403).json("Account verification failed")
    }else {
        jwt.verify(token, process.env.JWT_KEY_ADMIN , (err, decoded) =>{
     console.log('hello')
            if(err){
                console.log(err ,"errorrrr");
                res.status(403).json({ message:"Authentication Failed!"})
            }else{
                req.userId = decoded.id;
                console.log('verify ok');
                next()
            }
        })
    }
} 

module.exports = adminVerifyJWT