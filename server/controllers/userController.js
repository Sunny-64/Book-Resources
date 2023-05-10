const User = require("./../models/userModel");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 

// Register 
exports.register = async (req, res) => {
    const {name, email, password } = req.body; 
    
    // Check if any of the fields are empty
    if(!(name && email && password)) {
        return res.json({status : 400, success : false, message : "All Fields are required"}); 
    }
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!email.match(emailFormat)) { 
        return res.json({status : 400, success : false, message : "Invalid email"});
    }
    else{
        try{
            const doesUserExists = await User.findOne({email : email}); 
            if(doesUserExists != null){
                res.json({status : 400, success : true, message : "User already exists"}); 
            }
            else{
                // create the user object
                const userObj = new User(); 
                userObj.name = name;     
                userObj.email = email;  true; 
                userObj.password = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS)); 
                
                // Save the user in the database
                const saveUser = await userObj.save(); 

                const payload = saveUser.toJSON(); 

                // remove password from the payload
                delete payload.password; 

                // create token of the user
                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn : 60 * 60}); 
                res.json({status : 200, success : true, message : "Registered Successfully", token : token}); 
            }
        }catch(err){
            res.json({status : 500, success : false, error : err.message});
        }
    }
}

exports.login = async(req, res) => {
    const {email , password} = req.body; 

    if(!(email && password)) {
        res.json({status : 400, success : false, message : "All Fields are required"}); 
    }
    else{
        try{
            const doesUserExists = await User.findOne({email : email}); 
            if(!doesUserExists){
                res.json({status : 404, success : false, message : "User does not exist"}); 
            }
            else{
                if(bcrypt.compareSync(password, doesUserExists.password)){
                    const payload = doesUserExists.toJSON(); 
                    delete payload.password; 

                    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY); 

                    res.json({status : 200, success : true, message : "Logged in successfully", token : token})
                }
                else{
                    res.json({status : 400, success : false, message : "Email or password is wrong"}); 
                }
            }
        } catch(err){
            res.json({status : 500, success : false, error : err.message});
        }
    }
}