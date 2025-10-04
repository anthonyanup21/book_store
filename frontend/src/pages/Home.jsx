import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { Navigate, useNavigate } from "react-router";
import bookStore from "../store/bookStore.js";

// const dummyBooks = [
//   {
//     id: 1,
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     rating: 4.2,
//   },
//   { id: 2, title: "1984", author: "George Orwell", rating: 4.6 },
//   { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", rating: 4.8 },
//   { id: 4, title: "Pride and Prejudice", author: "Jane Austen", rating: 4.5 },
//   { id: 5, title: "Moby Dick", author: "Herman Melville", rating: 4.0 },
//   {
//     id: 6,
//     title: "The Catcher in the Rye",
//     author: "J.D. Salinger",
//     rating: 4.1,
//   },
//   { id: 7, title: "Brave New World", author: "Aldous Huxley", rating: 4.3 },
//   { id: 8, title: "The Hobbit", author: "J.R.R. Tolkien", rating: 4.7 },
//   { id: 9, title: "War and Peace", author: "Leo Tolstoy", rating: 4.4 },
//   {
//     id: 10,
//     title: "Crime and Punishment",
//     author: "Fyodor Dostoevsky",
//     rating: 4.6,
//   },
// ];

const Home = () => {
  const { allBooks, isGettingBooks,getAllBooks,changeSelectedBook } = bookStore();


  useEffect(() => {
    getAllBooks()
  }, [])
  
  const navigate = useNavigate();

  const handleClick=async(book)=>{
    await changeSelectedBook(book)
    navigate(`/book-details/${book._id}`)
  }

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  // Pagination logic
  const totalPages = Math.ceil(allBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = allBooks.slice(startIndex, startIndex + booksPerPage);

  if (isGettingBooks) {
    return (
      <div className="h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-base-200  p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          📚 Book Collection
        </h1>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBooks.map((book) => (
            <div
              key={book._id}
              className="card bg-base-100 shadow-xl p-4 cursor-pointer"
              onClick={() => handleClick(book)}
            >
              <div className="card-body">
                <h2 className="card-title">{book.title}</h2>
                <p className="text-sm text-gray-500">By {book.author}</p>
                <div className="rating mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <input
                      key={i}
                      type="radio"
                      name={`rating-${book._id}`}
                      className="mask mask-star-2 bg-orange-400"
                      checked={Math.round(book?.averageRating||0) === i + 1}
                      readOnly
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="join flex justify-center mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`join-item btn ${
                currentPage === index + 1 ? "btn-primary" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
