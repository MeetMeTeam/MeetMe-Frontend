import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { sendMessage } from "../../../realtimeCommunication/socketConnection";
import Chat from "./Chat";

export default function ChatRoom({ people }) {
  const userDetail = useSelector((state) => state.auth.userDetails);
  const chatList = useSelector((state) => state.allChat.chatList);
  const otherPeopleList = useSelector((state) => state.room.otherUserActionCam);

  const color = ["purple", "yellow", "red", "blue", "green", "black", "orange"];
  const [inputValue, setInputValue] = useState("");
  const [colorText, setColorText] = useState("");

  const sendText = () => {
    if (inputValue !== "") {
      const newChat = {
        textId: chatList.length + 1,
        id: userDetail._id,
        name: userDetail.username,
        text: inputValue,
        color: colorText,
        people: otherPeopleList,
      };
      sendMessage(newChat);
      setInputValue("");
    }
  };
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * inputValue.length);
    setColorText(color[randomIndex]);
  }, []);

  return (
    <div>
      <Chat
        sendText={sendText}
        chat={chatList}
        inputValue={inputValue}
        setInputValue={setInputValue}
        name="Rooms Chat"
        height={100}
        width={400}
        isExpanded={true}
      />
    </div>
  );
}
