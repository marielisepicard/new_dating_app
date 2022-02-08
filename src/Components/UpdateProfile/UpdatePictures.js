import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { UserContext } from "../../UserContext";

import "../../App.css";

function UpdatePictures() {
  const { user, setUser } = useContext(UserContext);

  const [picture1, setPicture1] = useState(false);
  const [picture2, setPicture2] = useState(false);
  const [picture3, setPicture3] = useState(false);
  const [picture4, setPicture4] = useState(false);
  const [picture5, setPicture5] = useState(false);
  const [fail, setFail] = useState(false);

  useEffect(() => {
    if (user) {
      const currentPictures = user.pictures ? user.pictures.length : 0;
      if (currentPictures > 0) {
        setPicture1(true);
      }
      if (currentPictures > 1) {
        setPicture2(true);
      }
      if (currentPictures > 2) {
        setPicture3(true);
      }
      if (currentPictures > 3) {
        setPicture4(true);
      }
      if (currentPictures > 4) {
        setPicture4(true);
      }
    }
  }, [user]);

  const deleteUserPictures = async (data, nb) => {
    try {
      const res = await axios({
        method: "put",
        url: "http://localhost:8082/api/profile/pictures",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(res.data.user);
    } catch (err) {
      setFail(true);
    }
  };

  const handleDeletion = async () => {
    setPicture1(false);
    setPicture2(false);
    setPicture3(false);
    setPicture4(false);
    setPicture5(false);
    // api call
    deleteUserPictures();
  };

  const updateUser = async (data, nb) => {
    try {
      const res = await axios({
        method: "put",
        url: "http://localhost:8082/api/profile",
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(res.data.user);
      disableInput(nb);
    } catch (err) {
      setFail(true);
    }
  };

  const handleImage = (e, nb) => {
    const file = e.target.files[0];
    let data = new FormData();
    data.append("pictures", file);
    updateUser(data, nb);
  };

  const disableInput = (nb) => {
    if (nb === 1) {
      setPicture1(true);
    } else if (nb === 2) {
      setPicture2(true);
    } else if (nb === 3) {
      setPicture3(true);
    } else if (nb === 4) {
      setPicture4(true);
    } else if (nb === 5) {
      setPicture5(true);
    }
  };

  return (
    <div>
      <Link to="/home">Go back</Link>
      <h1>Upload your profil pictures</h1>
      <div>5 pictures maximum</div>
      <br />
      <br />

      <label htmlFor="picture">
        <i>Choisir une image</i>
      </label>
      <input
        id="picture"
        type="file"
        onChange={(e) => handleImage(e, 1)}
        accept=".png,.jpeg,.jpg"
        className="pictureInput"
        disabled={picture1 ? true : false}
      />
      {picture1 && <div>✅</div>}
      <br />
      <br />
      <label htmlFor="picture2">
        <i>Choisir une image</i>
      </label>
      <input
        id="picture2"
        type="file"
        onChange={(e) => handleImage(e, 2)}
        accept=".png,.jpeg,.jpg"
        className="pictureInput"
        disabled={picture2 ? true : false}
      />
      {picture2 && <p>✅</p>}
      <br />
      <br />
      <label htmlFor="picture3">
        <i>Choisir une image</i>
      </label>
      <input
        id="picture3"
        type="file"
        onChange={(e) => handleImage(e, 3)}
        accept=".png,.jpeg,.jpg"
        className="pictureInput"
        disabled={picture3 ? true : false}
      />
      {picture3 && <div>✅</div>}
      <br />
      <br />

      <label htmlFor="picture4">
        <i>Choisir une image</i>
      </label>
      <input
        id="picture4"
        type="file"
        onChange={(e) => handleImage(e, 4)}
        accept=".png,.jpeg,.jpg"
        className="pictureInput"
        disabled={picture4 ? true : false}
      />
      {picture4 && <div>✅</div>}
      <br />
      <br />
      <label htmlFor="picture5">
        <i>Choisir une image</i>
      </label>
      <input
        id="picture5"
        type="file"
        onChange={(e) => handleImage(e, 5)}
        accept=".png,.jpeg,.jpg"
        className="pictureInput"
        disabled={picture5 ? true : false}
      />
      {picture5 && <div>✅</div>}
      <br />
      <br />
      <button onClick={handleDeletion}>Supprimer mes images</button>
      {user && fail && <div>Something wrong happened. Try again later.</div>}
    </div>
  );
}

export default UpdatePictures;
