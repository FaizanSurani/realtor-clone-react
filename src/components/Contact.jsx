import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../Firebase";

export default function Contact({ userRef, listing }) {
  const [landlord, setLandlord] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    };
    getLandlord();
  }, [userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landlord !== null && (
        <div className="flex flex-col w-full">
          <p>
            Contact {landlord.name} for the {listing.name.toLowerCase()}
          </p>
          <div className="mt-3 mb-6">
            <textarea
              className="rounded w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
              name="message"
              id="message"
              rows="2"
              placeholder="Message"
              value={message}
              onChange={onChange}
            />
          </div>
          <a
            href={`mailto: ${landlord.email} ? Subject=${listing.name}&body=${message}`}>
            <button
              type="button"
              className="px-7 py-3 uppercase bg-blue-600 rounded text-white font-medium text-sm transition duration-150 ease-in-out shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center active:shadow-lg active:bg-blue-800 mb-6">
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
}
