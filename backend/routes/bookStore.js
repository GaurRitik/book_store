import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

//create a book
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    //will get all the books
    const books = await Book.find({});

    const result = {
      count: books.length,
      data: books,
    };
    if (!result) {
      return res.status(404).send("No books found");
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//get book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("req.params: ",req.params);
    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (err) {
    console.log(err);
  }
});

//update a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Send all the required fields" });
    }

    const { id } = req.params;

    //this will have the old data
    // const book = await Book.findByIdAndUpdate(id,req.body);

    //book var will have new book data
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    //3 ways to send response:
    //1st: to send a single response
    return res.status(200).send(book);

    //2nd: send multiple responses
    // res.status(200).write("Book updated");
    // res.write(JSON.stringify(book));
    // res.end();

    //3rd : to return multiple responses
    // return res.status(200).json({
    //   message:"Book updated",
    //   book
    // })
  } catch (error) {
    console.log(error);
  }
});

//delete a book
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send("Book deleted sucessfully");
  } catch (error) {
    console.log(error);
  }
});

export default router;
