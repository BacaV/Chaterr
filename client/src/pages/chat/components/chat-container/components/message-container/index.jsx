import React, { useEffect } from "react";
import { useAppStore } from "@/store";
import { useRef, useState } from "react";
import moment from "moment";
import { apiClient } from "@/lib/api-client";
import { GET_ALL_MESSAGES } from "@/utils/constants";
import { HOST } from "@/utils/constants";
import { MdFolderZip, MdWindPower } from "react-icons/md";
import { IoMdArrowRoundBack, IoMdArrowRoundDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { AvatarFallback, Avatar, AvatarImage } from "@radix-ui/react-avatar";

const MessageContainer = () => {
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    selectedChatMessages,
    setSelectedChatMessages,
    setFileDownloadProgress,
    setIsDownloading,
  } = useAppStore();

  const [showImage, setShowImage] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_ALL_MESSAGES,
          { id: selectedChatData._id },
          { withCredentials: true }
        );

        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedChatData._id) {
      if (selectedChatType === "contact") getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const checkImage = (filePath) => {
    const imageRegex = /\.(jpeg|jpg|png|gif|webp|heif|svg|tiff|bmp|ico|)$/i;
    return imageRegex.test(filePath);
  };

  const downloadFile = async (url) => {
    setIsDownloading(true);
    setFileDownloadProgress(0);
    const response = await apiClient.get(
      `${HOST}/${url}`,
      {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.round((100 * loaded) / total);
          setFileDownloadProgress(percent);
        },
      },
      { withCredentials: true }
    );
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
    setIsDownloading(false);
    setFileDownloadProgress(0);
  };

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
          {selectedChatType === "channel" && renderChannelMessages(message)}
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
      {message.messageType === "file" && (
        <div
          className={`${
            message.sender === selectedChatData._id
              ? "bg-gray-500 text-white  border-gray-500/50"
              : "bg-green-500 text-white border-white/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {checkImage(message.fileURL) ? (
            <div className="cursor-pointer">
              <img
                src={`${HOST}/${message.fileURL}`}
                height={300}
                width={300}
                alt=""
                onClick={() => {
                  setShowImage(true);
                  setImageURL(message.fileURL);
                }}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <span className="text-white/80 text-3xl bg-black/20 rounded-full p-3">
                <MdFolderZip />
              </span>
              <span>{message.fileURL.split("/").pop()}</span>
              <span
                onClick={() => downloadFile(message.fileURL)}
                className=" bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
              >
                <IoMdArrowRoundDown />
              </span>
            </div>
          )}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LL")}
      </div>
    </div>
  );

  const renderChannelMessages = (message) => {
    return (
      <div
        className={`mt-5 ${
          message.sender._id !== userInfo.id ? "text-left" : "text-right"
        }`}
      >
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender._id !== userInfo.id
                ? "bg-gray-500 text-white  border-gray-500/50 ml-9"
                : "bg-green-500 text-white border-white/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {message.content}
          </div>
        )}
        {message.sender._id !== userInfo.id ? (
          <div>
            <Avatar className="size-10">
              {message.sender.image && (
                <AvatarImage src={`${HOST}/${message.sender.image}`} />
              )}
              <AvatarFallback
                className={`size-8 uppercase bg-blue-500 rounded-full  text-white flex justify-center items-center text-xs`}
              >
                {message.sender.firstName
                  ? message.sender.firstName.split("").shift()
                  : message.sender.email.split("").shift()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">
              {message.sender.firstName} {message.sender.lastName}
            </span>
            <span className="text-xs text-gray-600/60 ml-1">
              {""}
              {moment(message.timestamp).format("LT")}
            </span>
          </div>
        ) : (
          <div className="text-sm text-gray-600">
            {moment(message.timestamp).format("LT")}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="hmax-h-[80vh] w-[100%] bg-[#303030] flex-1 overflow-y-auto p-5 px-8">
        {renderMessages()}
        <div ref={scrollRef} />
        {showImage && (
          <div className="fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg flex-col">
            <div>
              <img
                src={`${HOST}/${imageURL}`}
                alt=""
                className="h-[80vh] w-full bg-cover"
              />
            </div>
            <div className="flex gap-5 fixed top-0 mt-5">
              <button
                onClick={() => downloadFile(imageURL)}
                className=" bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
              >
                <IoMdArrowRoundDown />
              </button>
              <button
                onClick={() => {
                  setShowImage(false);
                  setImageURL(null);
                }}
                className=" bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
              >
                <IoCloseSharp />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MessageContainer;
