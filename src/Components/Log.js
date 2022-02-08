import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { UserContext } from "../UserContext";

import { getUserLocation } from "../utils/distance";

function Log() {
  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const logUser = async (username, password) => {
    const location = await getUserLocation();
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:8082/api/auth/login",
        data: {
          username: username,
          password: password,
          longitude: location[0],
          latitude: location[1],
        },
      });
      setSuccess(true);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      setFail(true);
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logUser(username, password);
  };

  return (
    <div>
      <Link to="/">Go back</Link>
      <h1>Log in</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        ></input>
        <input
          placeholder="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
        ></input>
        <button disabled={success ? true : false}>Sign up</button>
      </form>

      {success && <div>You are successfully loggued in.</div>}
      {success && <Link to="/home">Start explore Matcha</Link>}

      {fail && <div>Something wrong happened. Try again later.</div>}
      {!success && <Link to="/forgotpassword">Forgot password</Link>}
    </div>
  );
}

export default Log;
