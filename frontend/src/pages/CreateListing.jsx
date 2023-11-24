import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useAuth } from "../context/Authcontext";

const CreateListing = () => {
  const auth = useAuth();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    regularPrice: 0,
    discountPrice: 0,
    bathrooms: 0,
    bedrooms: 0,
    furnished: false,
    parking: true,
    type: "rent",
    offer: false,
    images: [],
  });
  const [fileUploadError, setFileUploadError] = useState(false);
  console.log(formData);
  console.log(files);

  useEffect(() => {}, []);

  const handlechange = (e) => {
    if (e.target.name === "rent" || e.target.name === "sell") {
      setFormData({ ...formData, type: e.target.name });
    }
    if (
      e.target.name == "parking" ||
      e.target.name == "furnished" ||
      e.target.name == "offer"
    ) {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    }
    if (e.target.type === "text" || e.target.type == "textarea") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    if (e.target.type === "number") {
      setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
    }
  };

  const handleDeletePerImage = (id) => {
    console.log(id);
    setFormData({
      ...formData,
      images: formData.images.filter((_, index) => {
        return index !== id;
      }),
    });
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    setFileUploadError(false);
    setLoading(true);
    if (files.length > 0 && files.length < 7 && formData.images.length < 7) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            images: formData.images.concat(urls),
          });
        })
        .catch(() => {
          setFileUploadError(true);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setFileUploadError(true);
      setLoading(false);
    }
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      console.log("here-==============");
      setFileUploadError(false);
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
        },
        (error) => {
          reject(error);
          setFileUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) => {
            resolve(downloadurl);
          });
        }
      );
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // try {
    toast.loading("creating user Listing...", { id: "addListing" });
    await auth?.addListing(formData);
    toast.success("added Listing successfully", { id: "addListing" });
    // } catch (e) {
    // toast.error("adding Listing error", { id: "addListing" });
    // }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create A Listing
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 "
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text "
            placeholder="Farm Name..."
            className="border p-3 rounded-lg"
            name="name"
            required
            onChange={handlechange}
          />
          <textarea
            type="text "
            placeholder="Description..."
            className="border p-3 rounded-lg"
            name="description"
            required
            onChange={handlechange}
          />
          <input
            type="text"
            placeholder="Address..."
            className="border p-3 rounded-lg"
            name="address"
            required
            onChange={handlechange}
          />
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input
                onChange={handlechange}
                className="w-5 h-5"
                type="checkbox"
                checked={formData.type === "sell"}
                name="sell"
              />
              <span className="text-sm">Sell</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handlechange}
                className="w-5 h-5 "
                type="checkbox"
                checked={formData.type === "rent"}
                name="rent"
              />
              <span className="text-sm">Rent</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handlechange}
                className="w-5 h-5 "
                type="checkbox"
                checked={formData.parking}
                name="parking"
              />
              <span className="text-sm">Parking spot</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handlechange}
                className="w-5 h-5 "
                type="checkbox"
                checked={formData.furnished}
                name="furnished"
              />
              <span className="text-sm">Furnished</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handlechange}
                className="w-5 h-5"
                type="checkbox"
                checked={formData.offer}
                name="offer"
              />
              <span className="text-sm">Offer</span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                className="p-3 border w-30 border-gray-300"
                type="number"
                name="bedrooms"
                id=""
                onChange={handlechange}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300"
                type="number"
                name="bathrooms"
                onChange={handlechange}
              />
              <p>Baths</p>
              <small className="block">(Naira)</small>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border w-30 border-gray-300"
                type="number"
                name="regularPrice"
                id=""
                onChange={handlechange}
              />
              <p>Regular Price</p>
              <small className="block">(NGN/Naira)</small>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300"
                type="number"
                name="discountPrice"
                onChange={handlechange}
              />
              <p>Discounted Price</p>
              <small className="block">(NGN/month)</small>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 ">
          <div className="flex items-center gap-3 ">
            <p className="font-semibold">images :</p>
            <span className="text-gray-500 text-sm">
              max of 6 images can be added
            </span>
          </div>

          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              name="files"
              id=""
              multiple
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
            />

            <button
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:opacity-80"
            >
              {loading ? (
                <p className="text-sm">uploading...</p>
              ) : (
                <p>upload</p>
              )}
            </button>
          </div>
          <div>
            {fileUploadError ? (
              <span className="text-xs text-red-700">
                there was an error uploading this file (2mb/image)
              </span>
            ) : (
              ""
            )}
            {formData.images.length > 0
              ? formData.images.map((img, index) => {
                  return (
                    <>
                      <div
                        className="flex justify-between my-2 items-center"
                        key={img.name}
                      >
                        <img className="w-15 h-10" src={img} alt="" />
                        <button
                          onClick={() => handleDeletePerImage(index)}
                          className="px-2 m-5 rounded-lg text-red-700 uppercase hover:opacity-70"
                          type="button"
                        >
                          delete
                        </button>
                      </div>
                    </>
                  );
                })
              : ""}
          </div>
          <button
            type="submit"
            className="bg-slate-700 text-white rounded-lg hover:opacity-90 p-2 my-6"
          >
            Create Farm
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
