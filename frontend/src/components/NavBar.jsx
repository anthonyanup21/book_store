import React from "react";
import authStore from "../store/authStore";
import { useNavigate } from "react-router";
import bookStore from "../store/bookStore.js";

const Navbar = () => {
  const { logout } = authStore();
  const navigate = useNavigate();
  const { search } = bookStore();

  return (
    <div className="navbar bg-base-100 shadow-md px-6 py-2 sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex-1">
        <a
          className="btn btn-ghost normal-case text-2xl md:text-3xl font-bold"
          onClick={() => navigate("/dashboard")}
        >
          📚 BookReview
        </a>
      </div>

      {/* Center: Search */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search books by title..."
          className="input input-bordered w-full max-w-lg md:max-w-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          onChange={(e) => search(e.target.value)}
        />
      </div>

      {/* Right: Actions */}
      <div className="flex-1 flex justify-end gap-2 md:gap-4 items-center">
        <button
          className="btn btn-sm md:btn-md btn-primary hover:btn-secondary transition-colors duration-200"
          onClick={() => navigate("/dashboard")}
        >
          📖 Dashboard
        </button>
        <button
          className="btn btn-sm md:btn-md btn-success hover:btn-accent transition-colors duration-200"
          onClick={() => navigate("/add-book")}
        >
          ➕ Add Book
        </button>
        <button
          className="btn btn-sm md:btn-md btn-error hover:btn-warning transition-colors duration-200"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
