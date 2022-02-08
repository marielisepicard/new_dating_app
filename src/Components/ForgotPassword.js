import React, { useState } from "react";

import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const resetPassword = async () => {
    console.log(email);
    try {
      await axios({
        method: "put",
        url: "http://localhost:8082/api/auth/forgotPassword",
        data: { email: email },
      });
      setSuccess(true);
      setFail(false);
    } catch (err) {
      setFail(true);
      setSuccess(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword();
  };
  return (
    <>
      <h1>Forgot your password?</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>

        <button disabled={success ? true : false}>
          Reinitiate my password
        </button>
      </form>
      {fail && <div>Something wrong happened. Try again later.</div>}
      {success && <div>We just sent a link to reinitiate your password.</div>}
    </>
  );
}

export default ForgotPassword;
