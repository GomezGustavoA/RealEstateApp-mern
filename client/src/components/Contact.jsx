import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mail, setMail] = useState({ message: "" });

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          return;
        }
        setLandlord(data);
        setMail({ ...mail, to: data.email, subject: listing.name });
      } catch (error) {
        setError(error.message);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const onChange = (e) => {
    setMail({ ...mail, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mail.message.trim()) {
      setError("Please enter a message before contacting the landlord.");
      return;
    }
    try {
      const res = await fetch("/api/mail/send", {
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
      {landlord && (
        <div className="flex flex-col gap-4 p-4 bg-gray-800 shadow-lg rounded-lg border border-gray-700">
          <p className="text-lg text-gray-200">
            Contact{" "}
            <span className="font-semibold text-white">
              {landlord.username}
            </span>{" "}
            for{" "}
            <span className="font-semibold text-white">
              {listing.name.toLowerCase()}
            </span>
          </p>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 flex flex-col gap-4"
          >
            <textarea
              name="message"
              id="message"
              value={mail.message}
              onChange={onChange}
              placeholder={`Enter your message for ${landlord.username}...`}
              className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white text-center p-3 uppercase rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Contact Landlord
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
      )}
    </>
  );
};

export default Contact;
