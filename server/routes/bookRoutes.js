const Router = require("express").Router(); 
const bookController = require("./../controllers/bookController"); 
const multer = require("multer"); 
const fs = require("fs"); 
const path = require("path"); 

const uploadBook = multer({ 
    storage: multer.diskStorage({
    destination: function (req, file, cb) {
        if(!fs.existsSync(path.join(__dirname + "/../public/images"))){
            fs.mkdirSync(path.join(__dirname + "/../public/images")); 
        }
        cb(null, path.join(__dirname + "/../public/images"))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = "book-" + Date.now() + path.extname(file.originalname); 
      cb(null, uniqueSuffix)
    }
  }) 
})

Router.use(require("./../middlewares/auth")); 

// Get all books
Router.get("/", bookController.getAllBooks); 

// add book
Router.post("/create", uploadBook.single("image"), bookController.createBook); 

// Get Book by Id

Router.get("/id/:id", bookController.getBookById); 

// Get Book By Name

Router.get("/name/:name", bookController.getBookByName); 

// Update Book 

Router.patch("/update/:id", uploadBook.single("image"), bookController.updateBook); 

// Delete Book 

Router.delete("/delete/:id", bookController.deleteBook)

module.exports = Router; 