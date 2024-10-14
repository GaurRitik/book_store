import React from "react";
import axios from 'axios'
import { useEffect } from "react";
const App = () => {
  useEffect(() => {
    //fetching all books from backend 
    //when using cors for cross origin
    // axios
    //   .get("http://localhost:8000/books")
    //   .then((response) => console.log(response));
    //using proxy for cross origin -- add proxy to package.json
      axios
      .get("/books")
      .then((response) => console.log(response));
  });
  return <>App</>;
};

export default App;
