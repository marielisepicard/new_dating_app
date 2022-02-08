import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

import axios from "axios";

import { UserContext } from "../UserContext";

function Login() {
  const validationLink = useParams().validationLink;
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const validateLink = async () => {
    try {
      await axios({
        method: "post",
        url: "http://localhost:8082/api/auth/validateLink",
        data: {
          validateLink: validationLink,
        },
      });
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setFail(true);
    }
  };

  useEffect(() => {
    if (validationLink) {
      validateLink();
    }
  }, [validationLink]);

  return (
    <div>
      <Link to="/home">Go back</Link>
      <h1>Validation Link</h1>
      {success && <h2>Your email is confirmed. You can log in.</h2>}
      {fail && <h2>Something wrong happened. Try again later.</h2>}
    </div>
  );
}

export default Login;
