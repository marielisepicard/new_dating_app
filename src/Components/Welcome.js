import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../UserContext";

function Welcome() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
    if (user) {
      console.log("récupérer des profils pour l'utilisateur");
    }
  }, [user]);

  if (!user) {
    return <h1>See you soon</h1>;
  }

  return (
    <>
      <h1>Welcome</h1>
    </>
  );
}

export default Welcome;
