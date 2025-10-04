import React, { useState,useEffect } from "react";
import reviewStore from "../store/reviewStore.js";
import { useParams } from "react-router";
const Reviews = () => {
  // Dummy reviews
  const {getAllReviews,reviews,gettingReviews}=reviewStore()
  const {id}=useParams()
  useEffect(() => {
    getAllReviews(id)  
  }, [])



  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  // Logic for slicing reviews
  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirst, indexOfLast);

  // Total pages
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div className="p-4 flex justify-center">
      <div className="card bg-base-100 shadow-xl w-full max-w-3xl">
        <div className="card-body">
          <h2 className="text-xl font-bold mb-3">Reviews</h2>

          {/* Review list */}
          <div className="space-y-4">
            {currentReviews.map((review) => (
              <div key={review._id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{review.userName}</span>
                  <div className="rating rating-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        name={`rating-${review._id}`}
                        className="mask mask-star-2 bg-orange-400"
                        checked={review.rating === i + 1}
                        readOnly
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mt-1">{review.reviewText}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <div className="join">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`join-item btn btn-sm ${
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
      </div>
    </div>
  );
};

export default Reviews;
