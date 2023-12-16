import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/Authcontext";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import ListingBox from "../components/ListingBox";

const Profile = () => {
  const auth = useAuth();
  const fileRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState({
    id: auth.user.id,
    username: auth.user.username,
    email: auth.user.email,
    password: auth.user.password,
  });
  const [file, setFile] = useState();
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [showListing, setShowListing] = useState(false);
  const [loadingListing, setLoadingListing] = useState(false);

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    // if someone upload the same file twice we want to make every picture unique
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    // want to see the percentage of our upload by usingn  this uploadBytesResumable
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) => {
          setUpdateData({ ...updateData, avatar: downloadurl });
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleSignOut = async () => {
    try {
      toast.loading("signing out", { id: "signout" });
      await auth?.logout();
      toast.success("signed out successfully", { id: "signout" });
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message, { id: "signout" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("updating user", { id: "update" });
      console.log(auth);
      await auth.update(id, updateData);
      toast.success("updated user successfully", { id: "update" });
    } catch (e) {
      toast.error(e.response.data.message, { id: "update" });
    }
  };

  useEffect(() => {
    const fetchUserListings = async () => {
      setLoadingListing(true);
      const data = await auth.allUserListings();
      setUserListings(data);
      setLoadingListing(false);
    };
    fetchUserListings();
  }, []);

  const handleDelete = (id) => {
    setUserListings(() => {
      return userListings.filter((listing) => {
        return listing.id !== id;
      });
    });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h2 className="text-center text-3xl font-bold ">Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          hidden
          ref={fileRef}
          type="file"
          name=""
          id="hello"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
        />
        <img
          className="rounded-fullw-25 h-25 rounded-full box-border object-cover  cursor-pointer self-center my-4"
          src={updateData.avatar ? updateData.avatar : auth.user.avatar}
          alt="user avatar"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-center text-sm my-2">
          {fileUploadError ? (
            <span className="text-red-700"> Error Image Upload</span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">
              Uploading file...{filePercentage}%
            </span>
          ) : filePercentage === 100 ? (
            <span className="text-green-600">Upload completed</span>
          ) : (
            ""
          )}
        </p>
        <input
          className="p-3 outline-none border rounded-lg"
          type="text"
          placeholder="username"
          name="username"
          value={updateData.username}
          onChange={handleChange}
        />
        <input
          className="p-3 outline-none border rounded-lg"
          type="email"
          placeholder="email"
          name="email"
          value={updateData.email}
          onChange={handleChange}
        />
        <input
          className="p-3 outline-none border rounded-lg"
          type="password"
          placeholder="password"
          name="password"
          value={updateData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="font-bold bg-slate-700 rounded-lg text-white py-2 hover:opacity-90 disabled:opacity-80"
        >
          UPDATE
        </button>

        <button
          type="button"
          className="font-bold bg-green-700 rounded-lg text-white py-2 hover:opacity-90 disabled:opacity-80"
        >
          <Link to={"/create-listing"}>CREATE LISTING</Link>
        </button>
      </form>
      <div className="flex justify-between py-3 text-sm font-semibold text-red-700">
        <Link>
          <span>Delete Account</span>
        </Link>
        <Link>
          <span onClick={handleSignOut}>Sign Out</span>
        </Link>
      </div>
      <div>
        <button
          onClick={() => setShowListing((prev) => !prev)}
          className="text-green-700 flex self-center  mx-auto text-sm font-bold pt-12"
        >
          {showListing ? "REMOVE LISTING " : "SHOW LISTING"}
        </button>
      </div>

      {loadingListing ? (
        <p>loading listings.....</p>
      ) : showListing ? (
        <>
          <h2 className="text-center text-lg font-bold py-5">Your Listing</h2>
          {userListings?.map((listing, index) => {
            return <ListingBox {...listing} handleDelete={handleDelete} />;
          })}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
