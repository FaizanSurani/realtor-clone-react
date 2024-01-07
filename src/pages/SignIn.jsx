import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  //Destructing email and password so we can use them in form input value
  const { email, password } = formData;

  function onInput(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  function onClick() {
    setShowPassword((prevState) => {
      !prevState;
    });
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8a2V5fGVufDB8fDB8fHww"
            alt="key"
            className="w-full rounded-xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            <input
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              type="email"
              id="email"
              value={email}
              onChange={onInput}
              placeholder="Email Address"
            />
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onInput}
                placeholder="Password"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              />
              {showPassword ? (
                <IoEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={onClick}
                />
              ) : (
                <IoEyeOff
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={onClick}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
