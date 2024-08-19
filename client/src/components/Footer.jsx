import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { GiModernCity } from "react-icons/gi";
import { RiTwitterXFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="min-w-[350px] bg-blue-900 text-blue-100 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <Link
            to="/"
            className="text-2xl font-bold flex items-center space-x-2"
          >
            <GiModernCity size={28} className="text-blue-300" />
            <span>Property Horizon</span>
          </Link>
          <p className="text-blue-300 text-sm mt-2">
            © {new Date().getFullYear()} Property Horizon. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4 text-blue-300">
          <Link to="/About" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/About" className="hover:underline">
            Terms of Service
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>
        </div>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <Link to="https://facebook.com" aria-label="Facebook">
            <FaFacebookF className="hover:text-blue-400 transition-colors" />
          </Link>
          <Link to="https://twitter.com" aria-label="Twitter">
            <RiTwitterXFill className="hover:text-blue-400 transition-colors" />
          </Link>
          <Link to="https://instagram.com" aria-label="Instagram">
            <FaInstagram className="hover:text-blue-400 transition-colors" />
          </Link>
          <Link to="https://linkedin.com" aria-label="LinkedIn">
            <FaLinkedinIn className="hover:text-blue-400 transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
