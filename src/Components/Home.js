import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../UserContext";

function Home() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <h1>Home</h1>
      {user && (
        <>
          <Link to="/publicprofile">Update your profile</Link>
          <Link to="/updateinfo">Update your personal data</Link>
          <Link to="/updatepassword">Update your password</Link>
          <Link to="/updatepics">Upload your profil pictures</Link>
        </>
      )}
    </div>
  );
}

export default Home;
