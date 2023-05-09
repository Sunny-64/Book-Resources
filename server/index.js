const dotenv = require("dotenv"); 
dotenv.config(); 
const express = require("express"); 
const connectDb = require("./config/database");
const path = require("path"); 

const app = express(); 

// Configurations 
const PORT = process.env.PORT || 3000; 

app.use(express.urlencoded({extended : true})); 
app.use(express.json()); 
app.use("/images", express.static(__dirname + "/public/images"))

// Database connectivity 
connectDb(); 

// Routes 
const userRoutes = require("./routes/userRoutes"); 
app.use("/user" ,userRoutes)

const BookRoutes = require("./routes/bookRoutes"); 
app.use("/books", BookRoutes); 

app.get("*", (req, res) => {
    res.json({status : 404, success : false, message : "Invalid request"}); 
})
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT ${PORT} `)
})