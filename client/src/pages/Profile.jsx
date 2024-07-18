import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [imagePerc, setImagePerc] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarExist, setAvatarExist] = useState(false);

  console.log("upload is " + imagePerc + "% done");

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-3">
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          accept="image/*"
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        />
        <p className=" text-sm self-center">
          {imageUploadError ? (
            <span className="text-red-700">Error image upload!</span>
          ) : imagePerc > 0 && imagePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${imagePerc}%`}</span>
          ) : imagePerc === 100 && avatarExist ? (
            <span className="text-green-700">Successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-default"> Delete Account</span>
        <span className="text-red-700 cursor-default"> Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
