import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { UserContext } from "../../UserContext";

function Updatepassword() {
  const { user } = useContext(UserContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const updateUser = async (currentPassword, newPassword) => {
    try {
      await axios({
        method: "put",
        url: "http://localhost:8082/api/profile/password",
        data: {
          currPassword: currentPassword,
          newPassword: newPassword,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuccess(true);
    } catch (error) {
      setFail(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(currentPassword, newPassword);
  };

  return (
    <div>
      <Link to="/home">Go back</Link>
      <h1>Update private info</h1>

      {user && (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="current password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            type="password"
          ></input>
          <input
            placeholder="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            type="password"
          ></input>
          <button disabled={success ? true : false}>Update password</button>
        </form>
      )}
      {user && success && <div>Your password is well updated.</div>}
      {user && fail && <div>Something wrong happened. Try again later.</div>}
    </div>
  );
}

export default Updatepassword;
