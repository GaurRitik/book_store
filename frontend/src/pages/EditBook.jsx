import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const EditBook = () => {
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios(`/api/books/${id}`);
        // console.log(`res.data:${res.data}`);
        const data = res.data;
        // console.log(`data:${data}`);
        setBook(data);
        setIsLoading(false);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    };

    fetchData();
  }, []);

  //changes in the input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    // in order to see the value of e.target
    // console.dir(e.target);
    setBook((prevBook) => ({
      ...prevBook,
      //as name is a generic value
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: book.title,
        author: book.author,
        publishYear: book.publishYear,
      };
      
      const res = await axios.put(`/api/books/${id}`, data);
      console.log("Response: ", res.data.message);
      toast.success("Book Updated successfully")
      //to home page
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="author">Author: </label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="publishYear">Publish Year: </label>
            <input
              type="text"
              name="publishYear"
              value={book.publishYear}
              onChange={handleChange}
            />
          </div>
          <button className="border rounded bg-blue-400 p-2" type="submit">
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default EditBook;
