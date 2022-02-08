import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";

import axios from "axios";

import { UserContext } from "../../UserContext";
import { calculateAge } from "../../utils/age";
import { addDistanceToUsers } from "../../utils/distance";
import { cleanInterests } from "../../utils/utils";

function VisitProfile() {
  const { user, setUser } = useContext(UserContext);
  const id = useParams().id;
  const [visitedUser, setVisitedUser] = useState(null);
  const [disableBlock, setDisableBlock] = useState(false);
  const [disableReport, setDisableReport] = useState(false);
  const [liked, setLiked] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);

  const getUserById = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:8082/api/" + id,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      let updateVisitedUser = addDistanceToUsers(
        res.data.user,
        user.coordinates1,
        user.coordinates2
      );
      updateVisitedUser = cleanInterests(updateVisitedUser);
      setVisitedUser(updateVisitedUser);
      isUserLiked();
    } catch (err) {
      console.log("KO");
    }
  };

  const isUserLiked = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:8082/api/getLikeById/" + id,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setLiked(res.data.liked);
    } catch (err) {
      console.log("KO");
    }
  };

  // when page is refresh and we loose UserContext
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios({
          method: "get",
          url: "http://localhost:8082/api/",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.log("KO");
      }
    };
    if (user) {
      getUserById(id);
    } else if (!user && localStorage.getItem("token")) {
      getUser();
    } else {
      setSessionEnded(true);
    }
  }, [user]);

  const likeUser = async () => {
    try {
      const res = await axios({
        method: "put",
        url: "http://localhost:8082/api/like/" + id,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setLiked(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = () => {
    likeUser();
  };

  const dislikeUser = async () => {
    try {
      const res = await axios({
        method: "delete",
        url: "http://localhost:8082/api/dislike/" + id,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setLiked(false);
    } catch (err) {
      console.log("KO");
    }
  };

  const handleDislike = () => {
    dislikeUser();
  };

  const blockUser = async () => {
    try {
      await axios({
        method: "put",
        url: "http://localhost:8082/api/block/" + id,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setDisableBlock(true);
    } catch (err) {
      console.log("KO");
    }
  };

  const handleBlock = () => {
    blockUser();
  };

  const reportUser = async () => {
    try {
      await axios({
        method: "put",
        url: "http://localhost:8082/api/report/" + id,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setDisableReport(true);
    } catch (err) {
      console.log("KO");
    }
  };

  const handleReport = () => {
    reportUser();
  };

  if (sessionEnded) {
    return <h1>Bye</h1>;
  }

  return (
    <div>
      <h1>Visit Profile</h1>
      {!liked && <button onClick={handleLike}>Like</button>}
      {liked && <button onClick={handleDislike}>Dislike</button>}

      <button disabled={disableBlock} onClick={handleBlock}>
        Block
      </button>
      <button disabled={disableReport} onClick={handleReport}>
        Report
      </button>

      {visitedUser && (
        <>
          {visitedUser.firstname}
          {visitedUser.username}
          {visitedUser.popularityscore}
          {visitedUser.bio}
          {calculateAge(visitedUser).age + " ans"}
          {visitedUser.distance + " km"}
        </>
      )}
      {visitedUser && (
        <ul>
          {visitedUser.interests.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      {visitedUser && (
        <ul>
          {visitedUser.pictures.map((item, index) => (
            <li key={index}>
              <img src={"http://localhost:8082/" + item} alt="" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VisitProfile;
