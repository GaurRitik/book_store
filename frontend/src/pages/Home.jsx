import React, { useEffect, useState } from "react";
import { FaRegEdit, FaInfoCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import Loading from "../components/Loading";

const Home = () => {
  const apiURL = "/books";
  const [books, setBooks] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiURL);
        console.log(`res: ${res}`)
        const booksData = res.data;
        setBooks(booksData);
        console.log('booksdata: ',booksData);
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
      <table className=" border border-separate">
        <thead>
          <tr>
            <th className="border">Name</th>
            <th className="border">Author</th>
            <th className="border">Publish Year</th>
            <th className="border">Options</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4">
                <div className="flex justify-center">
                  <Loading />
                </div>
              </td>
            </tr>
          ) : (
            <tr>
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
            </tr>
          )}
          {}
        </tbody>
      </table>
    </>
  );
};

export default Home;
