import React from "react";
import { useAppStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { HOST } from "@/utils/constants";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatType,
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    setSelectedChatMessages,
  } = useAppStore();

  const hanldeClick = (contact) => {
    if (isChannel) {
      setSelectedChatType("channel");
    } else {
      setSelectedChatType("contact");
    }
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-green-500 text-white"
              : "text-white hover:bg-[#1f1f1f]"
          }`}
          onClick={() => hanldeClick(contact)}
          key={contact._id}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
                {!isChannel && (
                    <Avatar className="size-10">
                    {contact.Image ? (
                      <AvatarImage src={`${HOST}/${contact.Image}`} />
                    ) : (
                      <div
                        className={`size-10 uppercase bg-gray-500 rounded-md  text-white flex justify-center items-center text-xs`}
                      >
                        {contact.firstName
                          ? contact.firstName.split("").shift()
                          : contact.email.split("").shift()}

                          
                      </div>
                    )}
                  </Avatar>
                )}
                {isChannel && <div className="text-white size-10 text-lg border flex items-center justify-center rounded-full">#</div>}
                {
                    isChannel ? <div className="text-white">{contact.name}</div> : <div className="text-white">{contact.firstName} {contact.lastName}</div>
                }
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
