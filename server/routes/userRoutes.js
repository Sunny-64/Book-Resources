const Router = require("express").Router(); 
const userController = require("./../controllers/userController"); 

// Register 
Router.post("/register", userController.register); 

// Login 
Router.post("/login", userController.login); 

Router.get("*", (req, res) => {
    res.json({status : 404, success : false, message : "Invalid request"}); 
})

module.exports = Router; 