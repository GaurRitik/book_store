import express from "express";
import {mongoDBURL, PORT} from "./config.js"
import mongoose from "mongoose";

import {Book} from "./models/bookModel.js"

const app = express();

//middleware - for request body parsing
app.use(express.json());

//home url
app.get('/',(req,res)=>{
    return res.status(243).send("Welcome to the Book Store")
})

//create a book
app.post('/books',async(req,res)=>{
    try{
    console.log(req.body)
    console.log(req.body.title)
    if(!req.body.title || !req.body.author || !req.body.publishYear){
        return res.status(400).send({
            message:"Send all the reqd. fields"
        })
    }

    //initialized newBook using the user input values
    const newBook ={
        title:req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear
    }

    //added new document to the db
    const book = await Book.create(newBook);
    res.status(201).send(book);
}catch(error){
    console.log("Error: ",error)
}

})

mongoose.connect(mongoDBURL).then(()=>{
    console.log("App connected to Database");
    app.listen(PORT, ()=>{
        console.log(`Server is running at port ${PORT}`);
    })
}).catch((error)=>{
    console.log(error);

})

