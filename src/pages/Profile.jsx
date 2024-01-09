import React from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <div className="flex justify-center items-center flex-wrap px-7 py-3">
        <h1>My Profile</h1>
        <form>
          <div>
            <input type="text" />
            <input type="email" />
          </div>
          <div>
            <p>
              Do you want to change your name?
              <Link>Edit</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
