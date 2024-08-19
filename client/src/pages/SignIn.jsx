import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";
import { FaEnvelope, FaLock } from "react-icons/fa";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.success === false) {
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate("/");
  };

  return (
    <div className="min-w-[350px] p-6 max-w-lg mt-[120px] mx-auto bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl text-center font-semibold mb-6 text-white">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-600 p-3 pl-10 rounded-lg w-full bg-gray-700 text-white placeholder-gray-400"
            id="email"
            onChange={handleChange}
          />
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
        </div>
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-600 p-3 pl-10 rounded-lg w-full bg-gray-700 text-white placeholder-gray-400"
            id="password"
            onChange={handleChange}
          />
          <FaLock className="absolute top-3 left-3 text-gray-400" />
        </div>
        <button
          disabled={loading}
          className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:bg-blue-800 disabled:bg-blue-500 transition-colors"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5 justify-center">
        <p className="text-gray-400">Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-400 font-semibold hover:underline">
            Sign Up
          </span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
    </div>
  );
};

export default SignIn;
