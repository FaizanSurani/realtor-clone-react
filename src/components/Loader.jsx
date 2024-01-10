import React from "react";
import Loading from "../assests/Loading.svg";

export default function Loader() {
  return (
    <div className="bg-black bg-opacity-50 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50">
      <div>
        <img src={Loading} alt="Loader...." className="h-24" />
      </div>
    </div>
  );
}
