const jwt = require("jsonwebtoken"); 

module.exports = (req, res, next) => {
    const token = req.headers['authorization']; 
    if(!token){
        res.json({
            status : 401, 
            success : false, 
            message : "Unauthorized"
        })
    }
    else{
        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded){
            if(err){
                res.json({
                    status : 401, 
                    success : false, 
                    message : "Unauthorized"
                })
            }
            else{
                req.user = decoded; 
                next(); 
            }
        })
    }
}