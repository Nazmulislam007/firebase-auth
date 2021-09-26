import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./context/auth";

const Login = () => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const { email, password } = info;

  const formHandle = (e) => {
    const { name, value } = e.target;

    setInfo({
      ...info,
      [name]: value,
    });
  };

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      setError1(false);
      await login(email, password);
      history.push("/");
    } catch (error) {
      setError(true);
      setError1(true);
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="w-full max-w-xs ">
          <form
            onSubmit={handleSubmit}
            className={`${
              error ? "bg-red-400" : "bg-gray-400"
            } shadow-md rounded px-8 pt-6 pb-8 mb-4`}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                id="username"
                type="email"
                placeholder="Email"
                onChange={formHandle}
                name="email"
                value={email}
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
                type="password"
                placeholder="******************"
                onChange={formHandle}
                name="password"
                value={password}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`${
                  error1 ? "bg-red-400" : "bg-blue-700"
                } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type="submit"
              >
                Login
              </button>
              <Link to="/signup">Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
