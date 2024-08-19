import {
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaInfoCircle,
  FaSignInAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { GiModernCity } from "react-icons/gi";
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
    <header className="min-w-[350px] bg-blue-900 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <GiModernCity size={32} className="text-blue-100" />
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-blue-300">Property</span>
              <span className="text-blue-100">Horizon</span>
            </h1>
          </div>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-blue-800 rounded-full flex items-center px-4 py-4 max-w-md mx-2"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full text-blue-100 placeholder-blue-300"
            onChange={onChange}
            value={searchTerm}
          />
          <button>
            <FaSearch className="text-blue-300 transition-transform duration-200 ease-in-out transform hover:scale-125" />
          </button>
        </form>
        <ul className="flex gap-6 items-center relative">
          <Link to="">
            <li className="hidden sm:flex items-center text-blue-100 hover:underline">
              <FaHome className="mr-2" />{" "}
              <span className="hidden md:block">Home</span>
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:flex items-center text-blue-100 hover:underline">
              <FaInfoCircle className="mr-2" />{" "}
              <span className="hidden md:block">About</span>
            </li>
          </Link>

          <Link to="/contact">
            <li className="hidden sm:flex items-center text-blue-100 hover:underline">
              <FaPhoneAlt className="mr-2" />{" "}
              <span className="hidden md:block">Contact</span>
            </li>
          </Link>
          {currentUser ? (
            <div className="relative flex items-center justify-center">
              <div className="absolute h-12 w-12 bg-blue-200 rounded-full border-2 border-blue-600"></div>
              <div className="relative h-10 w-10 bg-blue-100 rounded-full">
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className="rounded-full h-10 w-10 object-cover cursor-pointer"
                  onClick={toggleDropdown}
                />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 top-11 mt-2 w-48 bg-blue-800 border border-blue-600 rounded-lg shadow-lg z-10">
                  <Link to="/profile" onClick={toggleDropdown}>
                    <div className="px-4 py-2 text-blue-100 hover:bg-blue-700 cursor-pointer flex items-center gap-2">
                      <FaUser className="text-blue-300" />
                      <span className="">Profile</span>
                    </div>
                  </Link>
                  <div
                    className="px-4 py-2 text-blue-100 hover:bg-blue-700 cursor-pointer flex items-center gap-2"
                    onClick={handleSignOutUser}
                  >
                    <FaSignOutAlt className="text-blue-300" />
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/sign-in">
              <li className="flex items-center text-blue-100 hover:underline group">
                <FaSignInAlt size={18} className="mr-2" />
                <span className="hidden md:block">Sign in</span>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
