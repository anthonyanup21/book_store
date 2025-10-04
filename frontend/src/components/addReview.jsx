import React, { useState } from "react";
import bookStore from "../store/bookStore.js";
import reviewStore from "../store/reviewStore.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const {selectedBook}=bookStore()
  const {addReview}=reviewStore()
  const navigate=useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) {
      toast.error("Please provide a rating and a review comment.");
      return;
    }
    await addReview(rating,comment)
    navigate(`/book-details/${selectedBook._id}`)


  };

  return (
    <div className="p-4 flex justify-center">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-xl font-bold">Add a Review</h2>

          {/* Rating */}
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-1">Your Rating</p>
            <div className="rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <input
                  key={i}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                  checked={rating === i + 1}
                  onChange={() => setRating(i + 1)}
                />
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Your Review</p>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={4}
              placeholder="Write your thoughts about this book..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-outline" onClick={()=>navigate(`/book-details/${selectedBook._id}`)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
