import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { useAuth } from "./context/auth";

const Signup = () => {
  const history = useHistory();
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = info;

  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);
  const [success, setSuccess] = useState(false);

  const { signup } = useAuth();

  const formHandler = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return setError(true);
    }
    try {
      setError(false);
      await signup(email, password, username);
      setSuccess(true);
      history.push("/login");
    } catch (error) {
      console.log(error);
      setError1(true);
    }
  };

  const newFunction = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="w-full max-w-xs ">
          {success && (
            <p className="px-4 py-6 bg-green-900 text-white">
              {success ? "Sign in successfully" : ""}
            </p>
          )}
          <form
            onSubmit={formHandler}
            className={`${
              error ? "bg-red-400" : "bg-gray-400"
            } shadow-md rounded px-8 pt-6 pb-8 mb-4`}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                required
                value={username}
                name="username"
                onChange={newFunction}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                id="username"
                type="email"
                name="email"
                value={email}
                onChange={newFunction}
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
                id="password"
                name="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={newFunction}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`${
                  error1 ? "bg-red-400" : "bg-blue-700"
                } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type="submit"
              >
                Sign Up
              </button>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
