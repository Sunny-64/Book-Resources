const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({
    name : {type : String, required : true}, 
    email : {type : String, required : true, unique : true}, 
    password : {type : String, required : true}, 
    noOfBooksAdded : {type : Number, default : 0}, 

    role : {type : String, default : "user"}, 
    status : {type : Boolean, default : true},
    createdAt : {type : Date, default : Date.now()}
})

module.exports = new mongoose.model('User', userSchema); 
