import React, { useState } from "react";

export default function CreateListing() {
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
  } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <main className="max-w-md mx-auto px-2">
      <h1 className="text-3xl text-center uppercase mt-6 font-bold">
        Create a Listing
      </h1>
      <form>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex">
          <button
            type="button"
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
            ${
              type === "rent"
                ? "bg-white text-black"
                : "bg-slate-600 text-black"
            }`}
            id="sell"
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
                : "bg-slate-600 text-black"
            }`}
            id="rent"
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
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
            ${!parking ? "bg-white text-black" : "bg-slate-600 text-black"}`}
            id="parking"
            value={true}
            onClick={onChange}>
            Yes
          </button>
          <button
            type="button"
            className={`m1-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
            ${parking ? "bg-white text-black" : "bg-slate-600 text-black"}`}
            id="parking"
            value={false}
            onClick={onChange}>
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Furnished</p>
        <div className="flex">
          <button
            type="button"
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
            ${!furnished ? "bg-white text-black" : "bg-slate-600 text-black"}`}
            id="furnished"
            value={true}
            onClick={onChange}>
            Yes
          </button>
          <button
            type="button"
            className={`m1-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
            ${furnished ? "bg-white text-black" : "bg-slate-600 text-black"}`}
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
            ${!offer ? "bg-white text-black" : "bg-slate-600 text-black"}`}
            id="offer"
            value={true}
            onClick={onChange}>
            Yes
          </button>
          <button
            type="button"
            className={`m1-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
            ${offer ? "bg-white text-black" : "bg-slate-600 text-black"}`}
            id="offer"
            value={false}
            onClick={onChange}>
            No
          </button>
        </div>
        <div>
          <div>
            <p className="text-lg font-semibold">Regular Price</p>
            <input
              type="regularPrice"
              id="regularPrice"
              value={regularPrice}
              onChange={onChange}
              required
              className="w-full px-4 py-2 bg-white text-xl text-gray-700 border border-gray-300 focus:text-gray-700 focus:bg-white focus:border-slate-600 rounded transition duration-150 ease-in-out text-center"
            />
          </div>
        </div>
        <div>
          <p className="text-lg font-semibold">Discounted Price</p>
          <input
            type="discountedPrice"
            id="discountedPrice"
            value={discountedPrice}
            onChange={onChange}
            required
            className="w-full px-4 py-2 bg-white text-xl text-gray-700 border border-gray-300 focus:text-gray-700 focus:bg-white focus:border-slate-600 rounded transition duration-150 ease-in-out text-center"
          />
        </div>
      </form>
    </main>
  );
}
