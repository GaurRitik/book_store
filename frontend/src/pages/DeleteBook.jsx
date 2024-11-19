import {useState,useEffect} from 'react'
import axios from "axios";
import Loading from '../components/Loading'
import { useParams, useNavigate } from 'react-router-dom';


const DeleteBook = () => {
  const [isLoading,setIsLoading]=useState(false);
  const [book,setBook] = useState({});
  const {id} =useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    setIsLoading(true);
    const fetchData= async()=>{
      try{
        const res = await axios.get(`/api/books/${id}`);
        setBook(res.data);
        setIsLoading(false);
      }
      catch(err){
        console.log(`Error: ${err}`)
      }
    }

    fetchData();
  },[])

  const handleDelete=async()=>{
    try{
      const res = await axios.delete(`/api/books/${id}`);
      console.log(res.data);
      navigate("/");
    }
    catch(err){
      console.log(`Error: ${err}`)
    }
  }

  const handleCancel = ()=>{
    navigate("/")
  }

  return (
    <>
    {isLoading?(<Loading/>):
    (<div>
      <div className='flex gap-1'>
        <p>Title: </p>
        <p>{book.title}</p>
      </div>
      <div className='flex gap-1'>
        <p>Author: </p>
        <p>{book.author}</p>
      </div>
      <div className='flex gap-1'>
        <p>Publish Year: </p>
        <p>{book.publishYear}</p>
      </div>
      <div>
      <button name="delete" className='border border-black bg-red-500 m-2 p-2' onClick={handleDelete}>Delete</button>
      <button name="cancel" className='border border-black m-2 p-2' onClick={handleCancel}>Cancel</button>
      </div>
    </div>
    )}
    </>
  )
}

export default DeleteBook