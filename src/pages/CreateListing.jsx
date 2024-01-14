import React, { useState } from "react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

export default function CreateListing() {
  const auth = getAuth();
  const [geoLocationEnabled, setGeoLocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("Maximum 6 images are allowed");
      return;
    }
    let geolocation = {};

    if (geoLocationEnabled) {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images]
        .map((image) => storeImage(image))
        .catch((error) => {
          setLoading(false);
          toast.error("Images not Uploaded");
          return;
        })
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="max-w-md mx-auto px-2">
      <h1 className="text-3xl text-center uppercase mt-6 font-bold">
        Create a Listing
      </h1>
      <form onSubmit={onSubmit}>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex">
          <button
            type="button"
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
            ${
              type === "rent"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            id="type"
            value="sale"
            onClick={onChange}>
            Sell
          </button>
          <button
            type="button"
            className={`m1-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
            ${
              type === "sale"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            id="type"
            value="rent"
            onClick={onChange}>
            Rent
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">
          Name
          <input
            type="text"
            id="name"
            value={name}
            onChange={onChange}
            placeholder="Name"
            maxLength="32"
            minLength="10"
            required
            className="w-full px-4 py-2 text-xl  text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
          />
        </p>
        <div className="flex space-x-6 mb-6">
          <div>
            <p className="text-lg font-semibold">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 bg-white text-xl text-gray-700 border border-gray-300 focus:text-gray-700 focus:bg-white focus:border-slate-600 rounded transition duration-150 ease-in-out text-center"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full bg-white text-xl text-gray-700 border border-gray-300 focus:text-gray-700 focus:bg-white focus:border-slate-600 rounded transition duration-150 ease-in-out text-center px-4 py-2"
            />
          </div>
        </div>
        <p className="text-lg mt-6 font-semibold">Parking Spot</p>
        <div className="flex">
          <button
            type="button"
            id="parking"
            value={true}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
            ${!parking ? "bg-white text-black" : "bg-slate-600 text-white"}`}
            onClick={onChange}>
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            className={`m1-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
            ${parking ? "bg-white text-black" : "bg-slate-600 text-white"}`}
            onClick={onChange}>
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Furnished</p>
        <div className="flex">
          <button
            type="button"
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
            ${!furnished ? "bg-white text-black" : "bg-slate-600 text-white"}`}
            id="furnished"
            value={true}
            onClick={onChange}>
            Yes
          </button>
          <button
            type="button"
            className={`m1-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
            ${furnished ? "bg-white text-black" : "bg-slate-600 text-white"}`}
            id="furnished"
            value={false}
            onClick={onChange}>
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">
          Address
          <textarea
            type="text"
            id="address"
            value={address}
            onChange={onChange}
            placeholder="Address"
            required
            className="w-full px-4 py-2 text-xl  text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
          />
        </p>
        {!geoLocationEnabled && (
          <div className="flex space-x-6 justify-start mb-6">
            <div>
              <p className="text-lg font-semibold ">Latitude</p>
              <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={onChange}
                required
                min="-90"
                max="90"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
              />
            </div>
            <div>
              <p className="text-lg font-semibold ">Longitude</p>
              <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={onChange}
                min="-180"
                max="180"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
              />
            </div>
          </div>
        )}
        <p className="text-lg font-semibold">
          Description
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={onChange}
            placeholder="Description"
            required
            className="w-full px-4 py-2 text-xl  text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
          />
        </p>
        <p className="text-lg font-semibold">Offers</p>
        <div className="flex mb-6">
          <button
            type="button"
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
            ${!offer ? "bg-white text-black" : "bg-slate-600 text-white"}`}
            id="offer"
            value={true}
            onClick={onChange}>
            Yes
          </button>
          <button
            type="button"
            className={`m1-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
            ${offer ? "bg-white text-black" : "bg-slate-600 text-white"}`}
            id="offer"
            value={false}
            onClick={onChange}>
            No
          </button>
        </div>
        <div className="flex items-center mb-6">
          <div>
            <p className="text-lg font-semibold">Regular Price</p>
            <div className="flex justify-center items-center space-x-6">
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onChange}
                min="50"
                max="400000000"
                required
                className="w-full px-4 py-2 bg-white text-xl text-gray-700 border border-gray-300 focus:text-gray-700 focus:bg-white focus:border-slate-600 rounded transition duration-150 ease-in-out text-center"
              />
              {type === "rent" && (
                <div>
                  <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {offer && (
          <div className="flex items-center mb-6">
            <div>
              <p className="text-lg font-semibold">Discounted Price</p>
              <div>
                <input
                  type="discountedPrice"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onChange}
                  min="50"
                  max="400000000"
                  required={offer}
                  className="w-full px-4 py-2 bg-white text-xl text-gray-700 border border-gray-300 focus:text-gray-700 focus:bg-white focus:border-slate-600 rounded transition duration-150 ease-in-out text-center"
                />
              </div>
            </div>
          </div>
        )}
        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">
            The first image will be the cover (max 6)
          </p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg, .png, .jpeg"
            multiple
            required
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
          />
        </div>
        <button
          type="submit"
          className="mb-6 w-full uppercase font-medium px-7 py-3 bg-blue-600 text-white text-sm transition rounded duration-150 ease-in-out shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg">
          Create Listing
        </button>
      </form>
    </main>
  );
}
