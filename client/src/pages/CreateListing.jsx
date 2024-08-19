import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormaData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    price: 1000,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleImageSubmit = () => {
    setUploading(true);

    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormaData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploading(false);
          setImageUploadError(false);
        })
        .catch((error) => {
          setUploading(false);
          setImageUploadError("Image Upload failed (2MB max per image)");
        });
    } else {
      setUploading(false);
      setImageUploadError("You can only upload 6 images per listing");
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}%`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleRemoveImage = (indexImage) => {
    setFormaData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, index) => indexImage !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormaData({ ...formData, type: e.target.id });
    }
    if (e.target.id === "parking" || e.target.id === "furnished") {
      setFormaData({ ...formData, [e.target.id]: e.target.checked });
    }
    if (e.target.id === "offer") {
      setFormaData({
        ...formData,
        [e.target.id]: e.target.checked,
        discountPrice: e.target.checked && 0,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormaData({
        ...formData,
        [e.target.id]:
          e.target.type === "number" ? Number(e.target.value) : e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setErrorSubmit("You must upload at least one image");
      }
      if (formData.price < formData.discountPrice) {
        return setErrorSubmit("Discount price must be lower than price.");
      }
      setLoadingSubmit(true);
      setErrorSubmit(false);

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoadingSubmit(false);

      if (data.success === false) {
        setErrorSubmit(data.message);
        setLoadingSubmit(false);
      }
      navigate(`/profile`);
    } catch (error) {
      setErrorSubmit(error.message);
      setLoadingSubmit(false);
    }
  };

  return (
    <main className="mt-[120px] min-w-[350px] p-6 max-w-4xl mx-auto bg-gray-900 rounded-lg">
      <h1 className="text-4xl font-bold text-center text-white my-8">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-5 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg text-white bg-gray-800 placeholder-gray-400"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg text-white bg-gray-800 placeholder-gray-400"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg text-white bg-gray-800 placeholder-gray-400"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className="flex gap-5 flex-wrap text-white">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5 h-5 accent-blue-600"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5 h-5 accent-blue-600"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5 h-5 accent-blue-600"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 h-5 accent-blue-600"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5 h-5 accent-blue-600"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p className="text-gray-400">Baths</p>
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p className="text-gray-400">Beds</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="number"
                id="price"
                min="100"
                max="40000000"
                required
                className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                onChange={handleChange}
                value={formData.price}
              />
              <p className="text-gray-400">Price</p>
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="number"
                id="discountPrice"
                min="100"
                max="40000000"
                required
                disabled={!formData.offer}
                className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <p className="text-gray-400">Discount Price</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-white mb-4">Upload Images (6 max)</h2>
            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              multiple
              required={formData.imageUrls.length < 1}
              onChange={(e) => setFiles(e.target.files)}
              className="w-full p-2 border border-gray-700 bg-gray-700 text-gray-300 rounded-lg"
            />
            {uploading ? (
              <p className="text-gray-300 mt-4">Uploading...</p>
            ) : (
              <button
                type="button"
                onClick={handleImageSubmit}
                className="p-2 mt-4 w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition truncate"
              >
                Upload Images
              </button>
            )}
            {imageUploadError && (
              <p className="text-red-500 mt-4">{imageUploadError}</p>
            )}
            {formData.imageUrls.length > 0 && (
              <div className="mt-4">
                <h3 className="text-white">Uploaded Images</h3>
                <ul className="mt-2 grid grid-cols-2 gap-2">
                  {formData.imageUrls.map((url, index) => (
                    <li key={index} className="relative group">
                      <img
                        src={url}
                        alt="Uploaded"
                        className="h-20 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white hover:bg-red-700 transition"
                      >
                        <FaTrash />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </form>
      {errorSubmit && (
        <p className="mt-4 text-center text-red-500">{errorSubmit}</p>
      )}
      <button
        type="submit"
        onClick={handleSubmit}
        className="mt-8 w-full p-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        {loadingSubmit ? "Submitting..." : "Create Listing"}
      </button>
    </main>
  );
};

export default CreateListing;
