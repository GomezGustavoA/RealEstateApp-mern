import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import ContactAgency from "../components/ContactAgency";

const ContactUs = () => {
  const [listing, setListing] = useState({
    to: "gagomez1090@gmail.com",
    subject: "Contact the real estate agency",
    message: "",
    landlordMail: "gusgomsesa@gmail.com",
  });
  return (
    <div className=" min-w-[350px] mt-[90px] text-blue-100">
      <div className="max-w-6xl mx-auto p-6 ">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-300">
          ContactUs Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-lg text-blue-50 mb-6">
              Whether you have a question about properties, features, pricing,
              or anything else, our team is ready to answer all your questions.
            </p>
            <div className="flex items-center mb-4">
              <FaPhoneAlt className="text-blue-300 mr-4" />
              <span className="text-blue-50">+1 234 567 890</span>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-blue-300 mr-4" />
              <span className="text-blue-50">info@propertyhorizon.com</span>
            </div>
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-blue-300 mr-4" />
              <span className="text-blue-50">
                123 Real Estate Blvd, Suite 100, City, Country
              </span>
            </div>
          </div>
          <ContactAgency listing={listing} />
        </div>
        <div className="mt-10 text-center">
          <Link to="/" className="text-blue-300 hover:underline">
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
