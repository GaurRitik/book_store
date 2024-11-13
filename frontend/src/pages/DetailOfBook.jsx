import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const DetailOfBook = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios(`/api/books/${id}`);
        const bookDetails = res.data;
        console.log(bookDetails)
        setData(bookDetails);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return <>{isLoading ? <Loading /> : 
  <div>
    <div><span>ID:</span> {data._id}</div>
    <div><span>Title:</span> {data.title}</div>
    <div><span>Author:</span> {data.author}</div>
    <div><span>Publish Year:</span> {data.publishYear}</div>
  </div>
  }</>;
};

export default DetailOfBook;
