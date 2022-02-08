import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { UserContext } from "../../UserContext";

function PrivateInfo() {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setLastname(user.lastname);
    }
  }, [user]);

  const updateUser = async (lastname, email) => {
    console.log("lastname", lastname);
    console.log(email);
    try {
      const res = await axios({
        method: "put",
        url: "http://localhost:8082/api/profile/personalInfo",
        data: {
          lastname: lastname,
          email: email,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUser(res.data.user);
      setSuccess(true);
    } catch (error) {
      setFail(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(lastname, email);
  };

  return (
    <div>
      <Link to="/home">Go back</Link>
      <h1>Update private info</h1>

      {user && (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="lastname"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          ></input>
          <input
            placeholder="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          ></input>
          <button disabled={success ? true : false}>Sign up</button>
        </form>
      )}
      {user && success && <div>Your info are well updated.</div>}
      {user && fail && <div>Something wrong happened. Try again later.</div>}
    </div>
  );
}

export default PrivateInfo;
