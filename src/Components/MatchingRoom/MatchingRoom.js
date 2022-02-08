import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import { UserContext } from "../../UserContext";
import Glimpse from "./Glimpse";

function MatchingRoom() {
  const { user, setUser } = useContext(UserContext);

  const [potentialMatch, setPotentialMatch] = useState([]);

  const getPotentialMatch = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:8082/api/recs",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPotentialMatch(res.data.users);
      //   setSuccess(true);
    } catch (error) {
      console.log("KO");
      //   setFail(true);
    }
  };

  useEffect(() => {
    if (user) {
      getPotentialMatch();
    }
  }, [user]);

  if (!user) {
    return <h1>See you soon</h1>;
  }

  return (
    <>
      <h1>Matchin Room</h1>
      <div>
        {potentialMatch && (
          <ul className="glimpseWrapper">
            {potentialMatch.map((item, index) => (
              <Glimpse user={item} key={index} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default MatchingRoom;
