import React, { useState } from "react";
import {useParams,useLocation, useNavigate} from "react-router"
import bookStore from "../store/bookStore";

const UpdateBook = () => {
    const {id}=useParams()
    const location=useLocation()
    const navigate=useNavigate()
    const book=location.state.book

  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    description: book.description,
    genre: book.genre,
    year: book.year,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const {updateBook}=bookStore()

  const handleSubmit = async(e) => {
    e.preventDefault();
    await updateBook(formData,id)
    navigate("/dashboard")
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="card bg-base-100 shadow-xl w-full max-w-3xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4">Update Book</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Book Title"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
              className="input input-bordered w-full"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows="3"
              className="textarea textarea-bordered w-full"
            />
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Genre"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Year"
              className="input input-bordered w-full"
            />

            <div className="flex justify-end gap-3">
              <button type="button" className="btn btn-outline" onClick={()=>navigate("/dashboard")}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
