import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../firebase";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateListing = () => {
  const navigate = useNavigate();
  const params = useParams();
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
  const [errorDataFetch, setErrorDataFetch] = useState(false);

  useEffect(() => {
    const fetchListingByid = async () => {
      const listingID = params.id;
      console.log(listingID);
      try {
        const res = await fetch(`/api/listing/get/${listingID}`);
        const data = await res.json();
        if (data.success === false) {
          setErrorDataFetch(data.message);
          setFormaData({
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
          return;
        }
        setErrorDataFetch(false);
        setFormaData(data);
      } catch (error) {
        setErrorDataFetch(error.message);
      }
    };
    fetchListingByid();
  }, []);

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

      const res = await fetch(`/api/listing//update/${params.id}`, {
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
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setErrorSubmit(error.message);
      setLoadingSubmit(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Edit Your Post
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-5">
        <div className="flex flex-col gap-4 flex-1 mb-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
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
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>

            <div className="flex gap-1">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                value={formData.parking}
              />
              <span>Parking spot</span>
            </div>

            <div className="flex gap-1">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                value={formData.furnished}
              />
              <span>Furnished</span>
            </div>

            <div className="flex gap-1">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-2">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg w-40"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p>Baths</p>
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg w-40"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p>Beds</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-start gap-2">
                <input
                  type="number"
                  id="price"
                  min="1000"
                  max="100000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg w-40"
                  onChange={handleChange}
                  value={formData.price}
                />
                <div className="flex flex-row justify-center items-center ml-1 gap-1">
                  <p>Price</p>
                  <span className="text-xs ">($ / month)</span>
                </div>
              </div>
              {formData.offer && (
                <div className="flex flex-col items-start gap-2">
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="100000000"
                    required
                    className="p-3 border border-gray-300 rounded-lg w-40"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-row justify-center items-center ml-1 gap-1">
                    <p>Discount Price</p>
                    <span className="text-xs">($ / month)</span>
                  </div>
                </div>
              )}
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
          <button
            disabled={loadingSubmit || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loadingSubmit ? "Editing..." : "Edit Listing"}
          </button>
          <p className="text-red-700 text-sm">
            {errorDataFetch && errorDataFetch}
          </p>
          <p className="text-red-700 text-sm">{errorSubmit && errorSubmit}</p>
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;
