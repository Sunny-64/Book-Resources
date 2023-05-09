const Book = require("./../models/bookModel"); 
const User = require("./../models/userModel"); 
const path = require("path"); 
const fs = require("fs"); 


exports.createBook = async (req, res) => {
    const {name, author, pages, price} = req.body;
    if(!(name && author && pages && price && req.file)){
        res.json({status : 400, success : false, message : "All the fields are required"}); 
    } 
    else{  
        try{
            const doesBookExist = await Book.findOne({name : name}); 
            if(doesBookExist){
                res.json({status : 400, success : false, message : "Book already exist"}); 
            }
            else{
                const bookObj = new Book(); 
                bookObj.name = name; 
                bookObj.pages = pages; 
                bookObj.price = price; 
                bookObj.author = author; 
                bookObj.createdBy = req.user._id; 
                bookObj.imageUrl = "/images/" + req.file.filename; 
                const saveBook = await bookObj.save(); 

                const findUser = await User.findOne({_id : req.user._id}); 
                findUser.noOfBooksAdded++; 
                await findUser.save(); 

                res.json({status : 200, success : false, message : "Book Added Successfully", data : saveBook}); 
            }
        }catch(err){
            res.json({status : 500, success : false, error : err.message});
        }
    }
}

exports.getAllBooks = async (req, res) => {
    try{
        const getAllBooks = await Book.find(); 
        res.json({status : 200, success : true, message : "Fetched all books", totalResults : getAllBooks.length, data : getAllBooks}); 
    }
    catch(err){
        res.json({status : 500, success : false, error : err.message});
    }
}

exports.getBookByName = async(req, res) => {
    const name = decodeURI(req.params.name).trim(); 
    try{
        const findBook = await Book.findOne({name : name});    
        if(!findBook){
            res.json({status : 404, success : false, message : "Book not Found"}); 
        }
        else{
            res.json({status : 200, success : true, message : "Book Found", data : findBook}); 
        }
    }
    catch(err){
        res.json({status : 500, success : false, error : err.message});
    }
}

exports.getBooksByAuthor = async(req, res) => {
    const {author} = req.author; 
    try{
        const findBook = await Book.findOne({author : author}); 
        if(!findBook){
            res.json({status : 404, success : false, message : "Book not Found"}); 
        }
        else{
            res.json({status : 200, success : true, message : "Book Found", data : findBook}); 
        }
    }
    catch(err){
        res.json({status : 500, success : false, error : err.message});
    }
}

exports.getBookById = async (req, res) => {
    const {id} = req.params; 
    try{
        const findBook = await Book.findOne({_id : id}); 
        if(!findBook){
            res.json({status : 404, success : false, message : "Book not Found"}); 
        }
        else{
            res.json({status : 200, success : true, message : "Book Found", data : findBook}); 
        }
    } catch(err){
        res.json({status : 500, success : false, error : err.message});
    }
}

exports.updateBook = async(req, res) => {
    const {name, author, pages, price} = req.body;
    const {id} = req.params; 
    if(!(name || author || pages || price || req.file)){
        res.json({status : 400, success : false, message : "At least one field is required"}); 
    }
    else{
       try{
            const doesBookExist = await Book.findOne({_id : id}); 
            if(!doesBookExist){
                res.json({status : 404, success : false, message : "Book not Found"}); 
            }
            else{
                if(req.user._id == doesBookExist.createdBy){
                    doesBookExist.name = name ?? doesBookExist.name; 
                    doesBookExist.author = author ?? doesBookExist.author; 
                    doesBookExist.pages = pages ?? doesBookExist.pages; 
                    doesBookExist.price = price ?? doesBookExist.price; 
                    doesBookExist.updatedAt = Date.now(); 
                    if(req.file){
                        let prevImage = path.basename(doesBookExist.imageUrl);
                        if (fs.existsSync(path.join(__dirname + "/../public/images/" + prevImage))) {
                            fs.rmSync(path.join(__dirname + "/../public/images/" + prevImage));
                        }
                        doesBookExist.imageUrl = "/images/" + req.file.filename; 
                    }
                    const saveBook = await doesBookExist.save(); 
                    res.json({status : 200, success : true, message : "Book updated", data : saveBook}); 
                }
                else{
                    res.json({status : 401, success : false, message : "Unauthorized"}); 
                }
            }
       }catch(err){
            res.json({status : 500, success : false, error : err.message});
       }
    }
}

exports.deleteBook = async(req, res) => {
    const {id} = req.params; 
    try{
        const findBook = await Book.findOne({_id : id}); 
        if(!findBook){
            res.json({status : 404, success : false, message : "Book not Found"}); 
        }
        else{
            if (fs.existsSync(path.join(__dirname + "/../public/images/" + path.basename(findBook.imageUrl)))) {
                fs.rmSync(path.join(__dirname + "/../public/images/" + path.basename(findBook.imageUrl)));
            }
            await Book.deleteOne({_id : id}); 
            const findUser = await User.findOne({_id : req.user._id}); 
            findUser.noOfBooksAdded--; 
            await findUser.save(); 
            res.json({status : 200, success : true, message : "Book Deleted Successfully"}); 
        }
    }
    catch(err){
        res.json({status : 500, success : false, error : err.message});
    }
}