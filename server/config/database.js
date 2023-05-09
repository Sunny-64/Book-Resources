const mongoose = require("mongoose"); 

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI); 
        console.log("Database connected successfully");
    }
    catch(err){
        console.log(err.message)
    }
}

module.exports = connectDb; 