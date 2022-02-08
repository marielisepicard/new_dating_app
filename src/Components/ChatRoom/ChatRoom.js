import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import { UserContext } from "../../UserContext";

import "./../../App.css";
import Chatbox from "./Chatbox";

function ChatRoom() {
  const { user, setUser } = useContext(UserContext);

  const [conversations, setConversations] = useState(null);
  const [fail, setFail] = useState(false);
  const [openChatbox, setOpenChatbox] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  const getConversations = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:8082/api/conversations/all",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConversations(res.data);
    } catch (err) {
      setFail(true);
    }
  };

  useEffect(() => {
    console.log(conversations);
  }, [conversations]);

  useEffect(() => {
    if (user) {
      getConversations();
    }
  }, [user]);

  const handleClick = (e, item) => {
    setConversationId(item);
    setOpenChatbox(true);
  };

  return (
    <div>
      <h1>ChatRoom</h1>
      <div className="chatroomWrapper">
        <div>
          Liste de personnes
          {conversations && user && (
            <ul>
              {conversations.map((item, index) => (
                <li key={index}>
                  <button onClick={(e) => handleClick(e, item.id)}>
                    {item.firstname1 === user.firstname
                      ? item.firstname2
                      : item.firstname1}
                    <img
                      src={
                        "http://localhost:8082/" +
                        (item.firstname1 === user.firstname
                          ? item.picture2
                          : item.picture1)
                      }
                      alt=""
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          {openChatbox && conversationId && <Chatbox id={conversationId} />}
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
