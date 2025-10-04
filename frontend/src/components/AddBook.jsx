import React, { useState } from "react";
import Navbar from "../components/NavBar";
import bookStore from "../store/bookStore.js";
import { useNavigate } from "react-router";

const AddBook = () => {
  const { addBook } = bookStore();
  const navigate=useNavigate()
  const [formData, setformData] = useState({
    title: null,
    author: null,
    year: null,
    genre: null,
    description: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    await addBook(formData);
    navigate("/")
  };
  return (
    <div>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            ➕ Add New Book
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label className="label">
                <span className="label-text">Book Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter book title"
                className="input input-bordered w-full"
                onChange={(e) =>
                  setformData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* Author */}
            <div>
              <label className="label">
                <span className="label-text">Author</span>
              </label>
              <input
                type="text"
                placeholder="Enter author name"
                className="input input-bordered w-full"
                onChange={(e) =>
                  setformData({ ...formData, author: e.target.value })
                }
              />
            </div>

            {/* Year */}
            <div>
              <label className="label">
                <span className="label-text">Year</span>
              </label>
              <input
                type="number"
                placeholder="Enter published year"
                className="input input-bordered w-full"
                onChange={(e) =>
                  setformData({ ...formData, year: e.target.value })
                }
              />
            </div>

            {/* Genre */}
            <div>
              <label className="label">
                <span className="label-text">Genre</span>
              </label>
              <select
                className="select select-bordered w-full"
                onChange={(e) =>
                  setformData({ ...formData, genre: e.target.value })
                }
              >
                <option disabled selected>
                  Select genre
                </option>
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Romance</option>
                <option>Fantasy</option>
                <option>Science Fiction</option>
                <option>Mystery</option>
                <option>Biography</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Enter short description"
                className="textarea textarea-bordered w-full"
                rows="3"
                onChange={(e) =>
                  setformData({ ...formData, description: e.target.value })
                }
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button type="reset" className="btn btn-ghost" onClick={()=>navigate("/")}>
                Cancle
              </button>
              <button type="submit" className="btn btn-primary">
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
