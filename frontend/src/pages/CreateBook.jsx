import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateBook = () => {
  const [book, setBook]= useState({});
  const navigate = useNavigate();

  //changes in the input field
  const handleChange = (e) => {
    const {name,value} = e.target;

    setBook((prevState)=>({
      ...prevState,
      [name]:value
    }))
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      console.log(`Books: ${JSON.stringify(book)}`)
      const res = await axios.post(`/api/books`,book);
      console.log(res.data.message);
      toast.success("Book created successfully")
      navigate("/");
    }
    catch(err){
      console.log(`Error: ${err}`);
    }
  }

  return (
    <>
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="author">Author: </label>
            <input
              type="text"
              name="author"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="publishYear">Publish Year: </label>
            <input
              type="text"
              name="publishYear"
              onChange={handleChange}
            />
          </div>
          <button className="border rounded bg-blue-400 p-2" type="submit">
            Submit
          </button>
        </form>
      
    </>
  )
}

export default CreateBook