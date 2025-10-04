import React, { useEffect, useState } from "react";
import SelectedBook from "./components/SelectedBook";
import BookDetails from "./pages/BookDetails";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import authStore from "./store/authStore.js";
import { Navigate, Route, Routes } from "react-router";
import AddBook from "./components/AddBook.jsx";
import AddReview from "./components/addReview.jsx";
import bookStore from "./store/bookStore.js";
import Dashboard from "./pages/Dashboard.jsx";
import UpdateBook from "./pages/UpdateBook.jsx";
import UpdateReview from "./pages/UpdateReview.jsx";
const App = () => {
  const { user, checkAuth, isCheckingAuth } = authStore();
  const {selectedBook}=bookStore()
  useEffect(() => {
    checkAuth();
  }, []);
  if (isCheckingAuth && !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/login" element={!user?<Login/>:<Navigate to="/" replace/>} />
        <Route path="/signup" element={!user?<Signup/>:<Navigate to="/" replace/>} />
        <Route path="/" element={user?<Home/>:<Navigate to="/login" replace/>} />
        <Route path="/book-details/:id" element={user?<BookDetails/>:<Navigate to="/login" replace/>}/>
        <Route path="/add-book" element={user?<AddBook/>:<Navigate to="/login" replace/>}/>
          <Route path="/add-review" element={selectedBook?<AddReview/>:<Navigate to="/login" replace/>}/>
        <Route path="/dashboard" element={user?<Dashboard/>:<Navigate to="/login" replace/>}/>
        
        <Route path="/update-review/:id" element={user?<UpdateReview/>:<Navigate to="/login" replace/>}/>
        <Route path="/update-book/:id" element={user?<UpdateBook/>:<Navigate to="/login" replace/>}/>

      </Routes>


    </div>
  );
};

export default App;
