import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { UserContext } from "../../UserContext";

import "./../../App.css";

function Chatbox({ id }) {
  const { user, setUser } = useContext(UserContext);

  const [messages, setMessages] = useState(null);

  const getMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios({
        method: "get",
        url: "http://localhost:8082/api/messages/" + id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(res.data.messages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      getMessages();
    }
  }, [id]);

  return (
    <>
      <div>Chatbox {id}</div>
      {messages && user && (
        <ul>
          {messages.map((item, index) => (
            <li key={index}>
              {item.sendername}
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Chatbox;
