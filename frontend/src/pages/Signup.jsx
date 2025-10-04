import React, { useState } from "react";
import authStore from "../store/authStore";
import toast from "react-hot-toast";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isSigningUp } = authStore();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()|| !password.trim()) return toast.error("All fields are requires")
    await signup(fullName, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-md bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Signup"
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-3 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-primary font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
