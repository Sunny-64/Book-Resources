const mongoose = require("mongoose"); 

const bookSchema = new mongoose.Schema({
    name : {type : String, required : true, unique : true}, 
    imageUrl : {type : String, required : true}, 
    author : {type : String, required : true}, 
    pages : {type : Number, required : true}, 
    price : {type : Number, required : true}, 

    createdBy : {type : mongoose.Schema.Types.ObjectId, required : true}, 
    status : {type : Boolean, default : true}, 
    createdAt : {type : Date, default : Date.now()}, 
    updatedAt : {type : Date}
}); 

module.exports = new mongoose.model("Book", bookSchema); 