import React, { useState } from "react";
import {useParams,useLocation,useNavigate} from "react-router"
import reviewStore from "../store/reviewStore";

const UpdateReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const review = location.state.review;
  const [formData, setFormData] = useState({
    rating: review.rating,
    reviewText: review.reviewText,
  });
  const {updateReview}=reviewStore()
  const handleSubmit =async (e) => {
    e.preventDefault();
    await updateReview(formData,id)
    navigate("/dashboard")
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="card bg-base-100 shadow-xl w-full max-w-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4">Update Review</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-medium">Rating</label>
              <div className="rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <input
                    key={i}
                    type="radio"
                    name="rating"
                    value={i + 1}
                    checked={formData.rating === i + 1}
                    onChange={() => setFormData({ ...formData, rating: i + 1 })}
                    className="mask mask-star-2 bg-orange-400"
                  />
                ))}
              </div>
            </div>

            <textarea
              name="reviewText"
              value={formData.reviewText}
              onChange={(e) =>
                setFormData({ ...formData, reviewText: e.target.value })
              }
              placeholder="Update your review"
              rows="3"
              className="textarea textarea-bordered w-full"
            />

            <div className="flex justify-end gap-3">
              <button type="button" className="btn btn-outline" onClick={()=>navigate("/dashboard")}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateReview;
