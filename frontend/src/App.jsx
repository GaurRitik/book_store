import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from "react";
import CreateBook from './pages/CreateBook'
import DeleteBook from './pages/DeleteBook'
import DetailOfBook from './pages/DetailOfBook'
import EditBook from './pages/EditBook'
import Home from './pages/Home'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" >
      <Route index element={<Home />} />
      <Route path="createBook" element={<CreateBook />} />
      <Route path="editBook" element={<EditBook />} />
      <Route path="deleteBook" element={<DeleteBook />} />
      <Route path="detailOfBook" element={<DetailOfBook />} />
    </Route>
  )
)

const App = () => {
  // useEffect(() => {
  //   //fetching all books from backend 
  //   //when using cors for cross origin
  //   // axios
  //   //   .get("http://localhost:8000/books")
  //   //   .then((response) => console.log(response));
  //   //using proxy for cross origin -- add proxy to package.json
  //     axios
  //     .get("/books")
  //     .then((response) => console.log(response));
  // });

  return <>
 <RouterProvider router={router}/>
  </>;
};

export default App;
