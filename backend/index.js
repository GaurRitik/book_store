import express from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/bookStore.js";

const app = express();

//middleware - for request body parsing
app.use(express.json());

//home url
app.get("/", (req, res) => {
  return res.status(243).send("Welcome to the Book Store");
});

app.use('/books',booksRoute)

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
