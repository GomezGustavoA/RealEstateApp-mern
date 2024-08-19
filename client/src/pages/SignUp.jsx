import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.success === false) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    navigate("/sign-in");
  };

  return (
    <div className="min-w-[350px] p-6 max-w-lg mx-auto mt-[120px] bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl text-center font-semibold mb-6 text-white">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-600 p-3 pl-10 rounded-lg w-full bg-gray-700 text-white placeholder-gray-400"
            id="username"
            onChange={handleChange}
          />
          <FaUser className="absolute top-3 left-3 text-gray-400" />
        </div>
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5 justify-center">
        <p className="text-gray-400">Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-400 font-semibold hover:underline">
            Sign In
          </span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
    </div>
  );
};

export default SignUp;
