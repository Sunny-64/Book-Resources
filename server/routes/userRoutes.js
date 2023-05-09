const Router = require("express").Router(); 
const userController = require("./../controllers/userController"); 

// Register 
Router.post("/register", userController.register); 

// Login 
Router.post("/login", userController.login); 

module.exports = Router; 