import React from "react";
import bookStore from "../store/bookStore.js";
import { useNavigate } from "react-router";

const SelectedBook = () => {
  const {selectedBook:book}=bookStore()
  const navigate=useNavigate()
  return (  
    <div className="p-4 flex justify-center">
      <div className="card bg-base-100 shadow-xl w-full max-w-4xl">
        {/* Card body */}
        <div className="card-body">
          {/* Title + Author */}
          <h2 className="card-title text-2xl md:text-3xl font-bold">
            {book.title}
          </h2>
          <p className="text-sm md:text-base text-gray-500">
            by <span className="font-semibold">{book.author}</span> •{" "}
            {book.year} • {book.genre}
          </p>

          {/* Rating Stars */}
          <div className="rating mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <input
                key={i}
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-orange-400"
                checked={Math.round(book.averageRating) === i + 1}
                readOnly
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Average Rating:{" "}
            <span className="font-medium">{book.averageRating.toFixed(1)}</span>
          </p>

          {/* Description */}
          <p className="mt-3 text-gray-700 leading-relaxed break-words whitespace-pre-line">
            {book.description}
          </p>

          {/* Buttons */}
          <div className="card-actions mt-4">
            <button className="btn btn-primary" onClick={()=>navigate("/add-review")}>Add Review</button>
            <button className="btn btn-outline" onClick={()=>navigate("/")}>Back to Books</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedBook;
