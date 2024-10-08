import express from "express";
import {mongoDBURL, PORT} from "./config.js"
import mongoose from "mongoose";
const app = express();

app.get('/',(req,res)=>{
    return res.status(243).send("Welcome to the Book Store")
})

mongoose.connect(mongoDBURL).then(()=>{
    console.log("App connected to Database");
    app.listen(PORT, ()=>{
        console.log(`Server is running at port ${PORT}`);
    })
}).catch((error)=>{
    console.log(error);
})

