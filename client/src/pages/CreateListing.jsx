import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";
import { FaTrash } from "react-icons/fa";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormaData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

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
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-3 flex-1 mb-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />

          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-1">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>{" "}
            <div className="flex gap-1">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>{" "}
            <div className="flex gap-1">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>{" "}
            <div className="flex gap-1">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="price"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col">
                <p>Price</p>
                <span className="text-xs ">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col">
                <p>Discount Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first images will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border border-gray-300 rounded w-full"
            />
            <button
              disabled={uploading}
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {!uploading ? "Upload" : "loading..."}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {formData.imageUrls.map((imageUrl, index) => (
                <div key={index} className="relative w-40 h-40">
                  <img
                    src={imageUrl}
                    alt=" listin image"
                    className="w-40 h-40 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute right-2 top-2 w-6 aspect-square bg-red-700 rounded-full flex justify-center items-center border-2 border-white shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-110"
                  >
                    <FaTrash style={{ width: "12px", color: "white" }} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
