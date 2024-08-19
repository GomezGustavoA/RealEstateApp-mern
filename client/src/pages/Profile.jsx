import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateuserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";
import { FaRegSadTear, FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSync } from "react-icons/fa";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [imagePerc, setImagePerc] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarExist, setAvatarExist] = useState(false);
  const [updateSuccess, serUpadateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [errorListingDelete, setErrorListingDelete] = useState(false);
  const dispatch = useDispatch();
  console.log(currentUser);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setImagePerc(Math.round(progress));
      },
      (error) => {
        setImageUploadError(true);
        if (imagePerc === 100) {
          setTimeout(() => {
            setAvatarExist(false);
            setImagePerc(100);
            setImageUploadError(false);
            setImagePerc(0);
          }, 3000);
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          setAvatarExist(true);
        });

        if (imagePerc === 100) {
          setTimeout(() => {
            setAvatarExist(false);
            setImagePerc(100);
            setImageUploadError(false);
          }, 3000);
        }
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateuserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      serUpadateSuccess(true);
      dispatch(updateUserSuccess(data.rest));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    dispatch(deleteUserStart());
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      console.log(error);
    }
  };

  const handleSignOutUser = async () => {
    try {
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
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      setUserListings(data);

      if (data.success === false) {
        setShowListingsError(data.message);
        return;
      }
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleListingDelete = async (listing) => {
    const { _id, userRef } = listing;
    try {
      const res = await fetch("/api/listing/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: _id, userRef }),
      });
      const data = await res.json();
      if (data.success === false) return setErrorListingDelete(data.message);

      setUserListings((prev) => prev.filter((listing) => listing._id !== _id));
      setErrorListingDelete(false);
    } catch (error) {
      setErrorListingDelete(error.message);
    }
  };
  useEffect(() => {
    handleShowListings();
  }, []);
  return (
    <div className="p-4 min-w-[350px] h-full md:h-screen-minus-90 sm:max-w-6xl flex flex-col mx-auto gap-6 md:flex-row mt-[90px]">
      {/* Sección del perfil */}
      <div className="p-6 w-full md:w-1/2 bg-gray-800 rounded-lg shadow-lg max-h-[640px] md:max-h-[520px]">
        <h1 className="text-3xl font-semibold text-center mb-6 text-white">
          Profile
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="file"
            ref={fileRef}
            onChange={(e) => setFile(e.target.files[0])}
            hidden
            accept="image/*"
          />

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative flex items-center justify-center">
              <div className="absolute h-[115px] w-[115px] bg-gray-700 rounded-full border-2 border-gray-600"></div>
              <div className="relative h-[110px] w-[110px] bg-gray-600 rounded-full flex items-center justify-center">
                <img
                  src={formData.avatar || currentUser.avatar}
                  alt="profile"
                  onClick={() => fileRef.current.click()}
                  className="rounded-full h-[105px] w-[105px] object-cover cursor-pointer"
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-4">
              <input
                type="text"
                placeholder="Username"
                id="username"
                className="border border-gray-600 p-3 rounded-lg w-full bg-gray-700 text-white"
                defaultValue={currentUser.username}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email"
                id="email"
                className="border border-gray-600 p-3 rounded-lg w-full bg-gray-700 text-white"
                defaultValue={currentUser.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <p className="text-center text-sm">
            {imageUploadError ? (
              <span className="text-red-500">Error image upload!</span>
            ) : imagePerc > 0 && imagePerc < 100 ? (
              <span className="text-gray-400">{`Uploading ${imagePerc}%`}</span>
            ) : imagePerc === 100 && avatarExist ? (
              <span className="text-green-500">Successfully uploaded!</span>
            ) : (
              ""
            )}
          </p>
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border border-gray-600 p-3 rounded-lg w-full bg-gray-700 text-white"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:bg-blue-800 disabled:bg-blue-500 transition-colors"
          >
            {loading ? "loading..." : "Update"}
          </button>
          <Link
            to={"/create-listing"}
            className="bg-green-600 text-white text-center rounded-lg p-3 uppercase hover:bg-green-700 disabled:opacity-80 transition"
          >
            Create Listing
          </Link>
        </form>
        <div className="flex justify-between mt-6 text-red-500">
          <span
            className="cursor-pointer hover:underline"
            onClick={handleDeleteUser}
          >
            Delete Account
          </span>
          <span
            className="cursor-pointer hover:underline"
            onClick={handleSignOutUser}
          >
            Sign out
          </span>
        </div>
        <p className="text-red-500 mt-5">{error || ""}</p>
        <p className="text-green-500 mt-5">
          {updateSuccess ? "User is updated successfully" : ""}
        </p>
      </div>

      {/* Sección de listados */}
      <div className="p-6 w-full md:w-1/2 bg-gray-800 rounded-lg shadow-lg max-h-[640px] md:max-h-[520px]">
        <div className="flex w-full justify-between items-center gap-4 mb-4">
          <h2 className="text-3xl font-semibold text-center text-white">
            Your Listings
          </h2>
          <p className="text-red-500 text-sm">
            {showListingsError ? "Error showing listings" : ""}
          </p>
        </div>
        {userListings && userListings.length > 0 ? (
          <div className="scrollbar-thin overflow-auto h-[435px]">
            {userListings.map((listing) => (
              <div
                className="border border-gray-600 flex flex-row pr-3 gap-3 items-center bg-gray-700 rounded-lg mb-2"
                key={listing._id}
              >
                <Link
                  to={`/listing/${listing._id}`}
                  className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md"
                >
                  <img
                    className="w-full h-full object-cover cursor-pointer"
                    src={listing.imageUrls[0]}
                    alt="image of the publication"
                  />
                </Link>
                <Link
                  to={`/listing/${listing._id}`}
                  className="flex-grow flex flex-col justify-center"
                >
                  <p className="text-gray-200 font-semibold hover:underline transition-transform transform hover:scale-105">
                    {listing.name}
                  </p>
                </Link>
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={async () => {
                      await handleListingDelete(listing);
                    }}
                    className="w-7 h-7 bg-red-500 rounded-full flex justify-center items-center border-2 border-gray-700 shadow-lg transform transition-transform hover:scale-125"
                  >
                    <FaTrash style={{ width: "12px", color: "white" }} />
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="w-7 h-7 bg-green-500 rounded-full flex justify-center items-center border-2 border-gray-700 shadow-lg transform transition-transform hover:scale-125">
                      <FaEdit style={{ width: "12px", color: "white" }} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center bg-gray-700 border border-gray-600 p-8 rounded-lg shadow-lg">
            <FaRegSadTear className="text-gray-400 text-6xl mb-4" />
            <h2 className="text-gray-300 text-2xl font-semibold mb-2">
              No Listings to Display
            </h2>
            <p className="text-gray-400 text-center">
              It appears that there are no listings available at the moment.
              Please create your listing using the
              <span className="font-semibold text-white">
                {" "}
                'Create Listing'{" "}
              </span>
              button.
            </p>
          </div>
        )}
        <p className="text-red-500 mt-5 text-sm">
          {errorListingDelete && errorListingDelete}
        </p>
      </div>
    </div>
  );
};

export default Profile;
