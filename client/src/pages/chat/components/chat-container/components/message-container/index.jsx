import React, { useEffect } from "react";
import { useAppStore } from "@/store";
import { useRef } from "react";
import moment from "moment";
import { apiClient } from "@/lib/api-client";
import { GET_ALL_MESSAGES } from "@/utils/constants";

const MessageContainer = () => {
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    selectedChatMessages,
    setSelectedChatMessages,
  } = useAppStore();

  useEffect(() => {

    const getMessages = async () => {
      try {

        const response = await apiClient.post(GET_ALL_MESSAGES, {id: selectedChatData._id}, {withCredentials: true});

        if(response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }

      } catch (error) {
        console.log(error);
      }
    };

    if(selectedChatData._id) {
      if(selectedChatType === "contact") getMessages();
  }}, [
    selectedChatData,
    selectedChatType,
    setSelectedChatMessages,
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  const renderDMMessages = (message) => (
    <div
      className={`${
        message.sender === selectedChatData._id ? "text-left" : "text-right"
      }`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender === selectedChatData._id
              ? "bg-gray-500 text-white  border-gray-500/50"
              : "bg-green-500 text-white border-white/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {message.content}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
        <p>ojsa</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="hmax-h-[80vh] w-[100%] bg-[#303030] flex-1 overflow-y-auto p-5 px-8">
        {renderMessages()}
        <div ref={scrollRef} />
      </div>
    </>
  );
};

export default MessageContainer;
