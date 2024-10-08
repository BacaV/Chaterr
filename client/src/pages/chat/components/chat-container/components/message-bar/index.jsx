import React from "react";
import { useState, useRef, useEffect } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useAppStore } from "@/store";
import { useSocket } from "@/context/SocketContext";
import { apiClient } from "@/lib/api-client";
import { UPLOAD_FILE } from "@/utils/constants";

const MessageBar = () => {
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    setIsUploading,
    setFileUploadProgress,
  } = useAppStore();
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        recipient: selectedChatData._id,
        content: message,
        messageType: "text",
        fileURL: undefined,
      });
    } else if( selectedChatType === "channel") {
      socket.emit("send-channel-message", {
        sender: userInfo.id,
        content: message,
        messageType: "text",
        fileURL: undefined,
        channelId: selectedChatData._id});
    }
    setMessage("");
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        setIsUploading(true);
        const response = await apiClient.post(UPLOAD_FILE, formData, {
          withCredentials: true,
          onUploadProgress: data=>{
            setFileUploadProgress(Math.round((100 * data.loaded) / data.total));
          }
        });
        if (response.status === 200 && response.data) {
            setIsUploading(false);
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userInfo.id,
              recipient: selectedChatData._id,
              content: undefined,
              messageType: "file",
              fileURL: response.data.filePath,
            });
          } else if (selectedChatType === "channel") {
            socket.emit("send-channel-message", {
              sender: userInfo.id,
              content: undefined,
              messageType: "file",
              fileURL: response.data.filePath,
              channelId: selectedChatData._id});
          }
        }
      }
    } catch (error) {
      setIsUploading(false);
      console.log(error);
    }
  };
  return (
    <>
      <div className="h-[10vh] w-[100%] bg-green-900 flex justify-center items-center p-5 px-8 border-t border-[#fff] border-opacity-30">
        <div className="flex-1 flex items-center gap-5 p-2 bg-white rounded-md">
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            type="text"
            placeholder="Type a message"
            className="flex-1 bg-transparent outline-none text-black"
          />
          <button
            onClick={handleAttachmentClick}
            className="text-neutral-400 focus:outline-none focus:text-black transition-all duration-300 focus:border-none"
          >
            <GrAttachment />
          </button>

          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAttachmentChange}
          />
          <div className="relative flex justify-center items-center">
            <button
              onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
              className="text-neutral-400 focus:outline-none focus:text-black transition-all duration-300 focus:border-none"
            >
              <RiEmojiStickerLine className="text-xl" />
            </button>
            <div className="absolute bottom-16 right-0" ref={emojiRef}>
              <EmojiPicker
                theme="dark"
                open={emojiPickerOpen}
                onEmojiClick={handleAddEmoji}
                autoFocusSearch={false}
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleSendMessage}
          className="text-white bg-green-500 rounded-full focus:outline-none ml-5 p-2 flex justify-center items-center hover:bg-green-700 focus:text-black transition-all duration-300 focus:border-none"
        >
          <IoSend className="text-xl " />
        </button>
      </div>
    </>
  );
};

export default MessageBar;
