import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";

const ContactAgency = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mail, setMail] = useState({ message: "", to: "", email: "" });
  console.log(mail);

  const onChange = (e) => {
    setMail({ ...mail, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!mail.message.trim()) {
      setError("Please enter a message before contacting the company.");
      return;
    }
    if (!mail.to.trim() || !emailRegex.test(mail.to.trim())) {
      setError(
        "Please enter your email correctly before contacting the company."
      );
      return;
    }
    if (!mail.name.trim()) {
      setError("Please enter your name before contacting the company.");
      return;
    }
    try {
      const res = await fetch("/api/mail/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mail),
      });
      const data = await res.json();
      if (data.success) {
        setMail({ ...mail, message: "" });
        setError(false);
        setSuccess(true);
        return;
      } else {
        setError(data.message);
        setSuccess(false);
        return;
      }
    } catch (error) {
      setError(error.message);
      setSuccess(false);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4 p-4 bg-gray-800 shadow-lg rounded-lg border border-gray-700">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Your Name"
            value={mail.name}
            onChange={onChange}
            className="w-full border bg-gray-700 border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="mail"
            id="to"
            type="text"
            placeholder="Your Email"
            value={mail.to}
            onChange={onChange}
            className="w-full border bg-gray-700 border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            id="message"
            value={mail.message}
            onChange={onChange}
            placeholder="Enter your message..."
            className="w-full border bg-gray-700 border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white text-center p-3 uppercase rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Contact Agency
          </button>
        </form>

        {error && (
          <div className="flex items-center gap-2 p-4 border border-yellow-500 bg-yellow-100 rounded-lg">
            <FiAlertCircle className="text-yellow-500" size={24} />
            <span className="text-yellow-800">{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-4 border border-green-500 bg-green-100 rounded-lg">
            <FiCheckCircle className="text-green-500" size={24} />
            <span className="text-green-800">
              Success! Your action was completed.
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactAgency;
