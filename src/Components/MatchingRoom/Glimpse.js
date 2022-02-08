import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Glimpse({ user }) {
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(25);
  const [popularityScore, setPopularityScore] = useState(0);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (user) {
      setPicture(user.pictures[0]);
      setName(user.firstname);
      setPopularityScore(user.popularityscore);
      setAge(user.age);
      setId(user.id);
    }
  }, [user]);

  return (
    <>
      {picture && name && (
        <div className="glimpse">
          <div> Glimpse</div>
          <Link to={"/visit/" + id}>
            Update your profile
            <img
              alt="profile-pic"
              src={
                user
                  ? "http://localhost:8082/" + picture
                  : "http://localhost:8082/uploads/noAvatar.png"
              }
            />
            <h2>{name}</h2>
            <p>{age} ans</p>
            <p>Popularity Score: {popularityScore}</p>
          </Link>
        </div>
      )}
    </>
  );
}

export default Glimpse;
