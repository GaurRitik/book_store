import React, { useEffect, useState } from "react";
import { FaRegEdit, FaInfoCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/books");
        const booksData = res.data.data;
        setBooks(booksData);
        setIsLoading(false);
      } catch (err) {
        console.log(`Fetching books: ${err}`);
      }
    };

    //calling the async function
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-row items-center gap-10">
        <h1 className="text-6xl m-2">Book Store</h1>
        <Link to="createBook">
          <button className="border p-2 rounded">Add Book</button>
        </Link>
      </div>

      <table className=" border border-separate my-2 text-center">
        <thead>
          <tr>
            <th className="border">Number</th>
            <th className="border">Name</th>
            <th className="border">Author</th>
            <th className="border">Publish Year</th>
            <th className="border">Options</th>
          </tr>
        </thead>
        <tbody >
          {/* data fetching unsuccessfull then show Loading component, else,  show it */}
          {isLoading ? (
            <tr>
              <td colSpan="4">
                <div className="flex justify-center">
                  <Loading />
                </div>
              </td>
            </tr>
          ) : (
            books.map((book,index) => (
              <tr key={book._id}>
                <td className="border">{index+1}</td>
                <td className="border">{book.title}</td>
                <td className="border">{book.author}</td>
                <td className="border">{book.publishYear}</td>
                {/* all features */}
                <td className="flex flex-row items-center justify-center gap-2 ">
                  <Link to={`detailOfBook/${book._id}`}>
                    <FaInfoCircle size={20} className="text-blue-400"/>
                  </Link>
                  <Link to={`editBook/${book._id}`}>
                    <FaRegEdit size={20} className="text-yellow-400"/>
                  </Link>
                  <Link to={`deleteBook/${book._id}`}>
                    <MdDeleteOutline size={20} className="text-red-600"/>
                  </Link>
                </td> 
              </tr>
            ))
            /* <tr>
              <td className="border">
                The Sliding Mr. Bones (Next Stop, Pottersville)
              </td>
              <td className="border">Malcolm Lockyer</td>
              <td className="border">1961</td>
              <td className="flex flex-row items-center justify-center gap-2">
                <FaInfoCircle size={20} />
                <FaRegEdit size={20} />
                <MdDeleteOutline size={20} />
              </td>
            </tr> */
          )}
        </tbody>
      </table>
    </>
  );
};

export default Home;
