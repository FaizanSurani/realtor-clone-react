import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";

export default function Home() {
  const [offerListings, setOfferListings] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const docSnap = await getDocs(q);
        if (docSnap.exists()) {
          setOfferListings(docSnap.data());
        }
      } catch (error) {}
    };
    fetchListings();
  }, []);

  return (
    <div>
      <Slider />
    </div>
  );
}
