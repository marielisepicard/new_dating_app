import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import InputTag from "./TagsInput";

import { UserContext } from "../../UserContext";

function PublicProfile() {
  const { user, setUser } = useContext(UserContext);

  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [orientation, setOrientation] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState([]);

  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  useEffect(() => {
    if (user) {
      console.log(user);
      setFirstname(user.firstname);
      setUsername(user.username);
      setGender(user.gender ? user.gender : "notgiven");
      setOrientation(
        user.sexualOrientation ? user.sexualOrientation : "notgiven"
      );
      setBio(user.bio ? user.bio : "");
      setInterests(user.interests ? user.interests : ["tag1", "tag2"]);
    }
  }, [user]);

  const updateUser = async () => {
    console.log("update user");
    try {
      const res = await axios({
        method: "put",
        url: "http://localhost:8082/api/profile",
        data: {
          firstname: firstname,
          username: username,
          gender: gender,
          sexualorientation: orientation,
          bio: bio,
          interests: interests,
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
    updateUser();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <Link to="/home">Go back</Link>
      <h1>Update private info</h1>

      {user && (
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <input
            placeholder="firstname"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          ></input>
          <input
            placeholder="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>

          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="notgiven">Not given</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          <select
            name="orientation"
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
          >
            <option value="notgiven">Not given</option>
            <option value="straight">Straight</option>
            <option value="gay">Gay</option>
          </select>
          <textarea
            rows="5"
            placeholder="Your bio..."
            defaultValue={bio}
            name="bio"
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <InputTag initialTags={interests} updateTags={setInterests} />
          <button disabled={success ? true : false}>Update Profile</button>
        </form>
      )}
      {user && success && <div>Your info are well updated.</div>}
      {user && fail && <div>Something wrong happened. Try again later.</div>}
    </div>
  );
}

export default PublicProfile;
