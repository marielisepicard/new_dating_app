import React, { useState } from "react";
import { Link } from "react-router-dom";

import passwordValidator from "password-validator";
import axios from "axios";

function Signup() {
  const [birthday, setBirthday] = useState("");
  const [fail, setFail] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [mail, setMail] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);

  const signUser = async (newUser) => {
    try {
      await axios({
        method: "post",
        url: "http://localhost:8082/api/auth/registration",
        data: {
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          username: newUser.username,
          password: newUser.password,
          email: newUser.mail,
          birthday: newUser.birthday,
        },
      });
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var schema = new passwordValidator();
    schema.is().min(8).has().digits(1).has().lowercase();
    if (schema.validate(password)) {
      const newUser = {
        birthday,
        firstname,
        mail,
        lastname,
        password,
        username,
      };
      signUser(newUser);
    } else {
      setInvalidPassword(true);
    }
  };

  return (
    <div>
      <Link to="/">Go back</Link>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="firstname"
          id="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        ></input>
        <input
          placeholder="lastname"
          id="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        ></input>
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
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <input
          placeholder="mail"
          id="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
          type="email"
        ></input>
        <input
          placeholder="birthday"
          id="birthday"
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        ></input>
        <button disabled={success ? true : false}>Sign up</button>
      </form>
      {success && (
        <div>
          You are successfully registered. Click on your confirmation link we
          sent you by email to log in.
        </div>
      )}
      {fail && <div>Something wrong happened. Try again later.</div>}
      {invalidPassword && (
        <div>Your password must contain 8 characters, including a number.</div>
      )}
    </div>
  );
}

export default Signup;
