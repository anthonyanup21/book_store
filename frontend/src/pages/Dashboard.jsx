import React, { useState, useEffect } from "react";
import bookStore from "../store/bookStore.js";
import reviewStore from "../store/reviewStore.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const {
    createdBooks: books,
    getCreatedBook,
    isGettingBooks,
    deleteBook,
  } = bookStore();
  const {
    postedReviews: reviews,
    getPostedReviews,
    gettingReviews,
    deleteReview,
  } = reviewStore();

  useEffect(() => {
    getCreatedBook();
    getPostedReviews();
  }, []);

  const navigate=useNavigate()

  if (isGettingBooks || gettingReviews) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }
  return (
    <div className="p-6 space-y-8">
      {/* Books Container */}
      <div className="card bg-base-100 shadow-xl p-4">
        <h2 className="text-2xl font-bold mb-4">All Posted Books</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div
              key={book._id}
              className="card bg-base-200 p-4 shadow rounded-lg flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <p className="text-sm text-gray-600">
                  by {book.author} • {book.year} • {book.genre}
                </p>
                <p className="mt-2 font-medium">
                  Avg Rating: {book.averageRating.toFixed(1)}
                </p>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="btn btn-sm btn-outline btn-info flex items-center gap-2"
                  onClick={() => navigate(`/update-book/${book._id}`,{state:{book}})}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="btn btn-sm btn-outline btn-error flex items-center gap-2"
                  onClick={() => deleteBook(book._id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Container */}
      <div className="card bg-base-100 shadow-xl p-4">
        <h2 className="text-2xl font-bold mb-4">All Posted Reviews</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="card bg-base-200 p-4 shadow rounded-lg"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{review.userName}</span>
                <div className="rating rating-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <input
                      key={i}
                      type="radio"
                      className="mask mask-star-2 bg-orange-400"
                      checked={review.rating === i + 1}
                      readOnly
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-gray-700">{review.reviewText}</p>
              <p className="mt-1 text-sm text-gray-500">
                Book: {review.bookTitle}
              </p>
              <div className="flex justify-end gap-3 mt-3">
                <button
                  className="btn btn-sm btn-outline btn-info flex items-center gap-2"
                  onClick={() => navigate(`/update-review/${review._id}`,{state:{review}})}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="btn btn-sm btn-outline btn-error flex items-center gap-2"
                  onClick={() => deleteReview(review._id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
