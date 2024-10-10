import express from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";

import { Book } from "./models/bookModel.js";

const app = express();

//middleware - for request body parsing
app.use(express.json());

//home url
app.get("/", (req, res) => {
  return res.status(243).send("Welcome to the Book Store");
});

//create a book
app.post("/books", async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.title);
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all the reqd. fields",
      });
    }

    //initialized newBook using the user input values
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    //added new document to the db
    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (error) {
    console.log("Error: ", error);
  }
});

//get all the books
app.get("/books",async(req,res)=>{
    try{

    //will get all the books 
    const books = await Book.find({});

    const result = {
        count:books.length,
        data: books
    }
    if(!result){
        return res.status(404).send("No books found");
    }

    return res.status(200).json(result);
    }catch(error){
        console.log(error);
    }
})

//get book by id
app.get('/books/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        // console.log("req.params: ",req.params);
    const book = await Book.findById(id );

    return res.status(200).json(book);
    }catch(err){
        console.log(err);
    }
})

//update a book
app.put('/books/:id',async(req,res)=>{
  try{
    
    if(!req.body.title || !req.body.author || !req.body.publishYear){
      return res.status(400).send({message:"Send all the required fields"})
    }

    const {id} = req.params;

    //this will have the old data
    // const book = await Book.findByIdAndUpdate(id,req.body);

    //new book data
    const book = await Book.findByIdAndUpdate(id,req.body,{new:true});

    if(!book){
      return res.status(404).send({message:"Book not found"})
    }
    // res.status(200).write("Book updated");
    // return res.send(book);

    return res.json({
      message:"Book updated",
      book
    })
  }catch(error){
    console.log(error);
  }
})

//delete a book
app.delete("/books/:id",async(req,res)=>{
  try{
    const id= req.params.id;

  const deletedBook = await Book.findByIdAndDelete(id);
  
  if(!deletedBook){
    return res.status(404).send({message:"Book not found"})
  }
  return res.status(200).send("Book deleted sucessfully");
  }catch(error){
    console.log(error)
  }
})

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
