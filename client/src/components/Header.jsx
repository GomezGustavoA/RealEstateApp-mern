import {
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaInfoCircle,
  FaSignInAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = (e) => {
    setIsDropdownOpen(false);
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const handleSignOutUser = async () => {
    try {
      setIsDropdownOpen(false);
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  return (
    <header className="min-w-[350px] bg-slate-200 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-6">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">RealEstate</span>
            <span className="text-slate-700">Realm</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 rounded-full flex items-center px-4 py-4 max-w-md mx-2"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full"
            onChange={onChange}
            value={searchTerm}
          />
          <button>
            <FaSearch className="text-slate-500 transition-transform duration-200 ease-in-out transform hover:scale-125" />
          </button>
        </form>
        <ul className="flex gap-4 items-center relative">
          <Link to="">
            <li className="hidden sm:flex items-center text-slate-700 hover:underline">
              <FaHome className="mr-2" /> Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:flex items-center text-slate-700 hover:underline">
              <FaInfoCircle className="mr-2" /> About
            </li>
          </Link>
          {currentUser ? (
            <div className="relative  h-8 w-8">
              <img
                src={currentUser.avatar}
                alt="profile"
                className="rounded-full h-8 w-8 object-cover cursor-pointer"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-300 rounded-lg shadow-lg z-10">
                  <Link to="/profile" onClick={toggleDropdown}>
                    <div className="px-4 py-2 text-slate-700 hover:bg-slate-100 cursor-pointer flex items-center gap-2">
                      <FaUser className="text-slate-500" />
                      <span className="">Profile</span>
                    </div>
                  </Link>
                  <div
                    className="px-4 py-2 text-slate-700 hover:bg-slate-100 cursor-pointer flex items-center gap-2"
                    onClick={handleSignOutUser}
                  >
                    <FaSignOutAlt className="text-slate-500" />
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/sign-in">
              <li className="flex items-center text-slate-700 hover:underline group">
                <FaSignInAlt className="mr-3 transform transition-transform duration-200 group-hover:translate-x-1" />
                <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform transition-all duration-300">
                  Sign in
                </span>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
