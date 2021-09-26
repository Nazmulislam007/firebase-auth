import React from "react";
import { useAuth } from "./context/auth";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const { newUser, logout } = useAuth();

  const logOut = async (e) => {
    await logout();
    history.push("/login");
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        {newUser && <h1>{newUser.displayName}</h1>}

        <h1 className="text-6xl">Login in successful</h1>
        <button
          onClick={logOut}
          className={`${"bg-blue-700"} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          type="submit"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Home;
