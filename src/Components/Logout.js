import React, { useContext } from "react";

import axios from "axios";

import { UserContext } from "../UserContext";

function Logout() {
  const { setUser } = useContext(UserContext);

  const logoutUser = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios({
        method: "post",
        url: "http://localhost:8082/api/auth/logout",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.clear();
      setUser(null);
    } catch (error) {
      localStorage.clear();
    }
  };

  const handleLogout = () => {
    logoutUser();
  };

  return <button onClick={handleLogout}>Log out</button>;
}

export default Logout;
