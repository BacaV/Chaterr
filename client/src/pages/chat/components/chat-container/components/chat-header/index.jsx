import React from 'react'
import {RiCloseFill} from 'react-icons/ri'
import { useAppStore } from "@/store";
import {HOST} from "@/utils/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const ChatHeader = () => {


  const {closeChat, selectedChatData, selectedChatType} = useAppStore();

  return (
    <>
    <div className='flex h-[10vh] w-[100%] bg-green-900 border-b border-[#fff] border-opacity-30 items-center justify-between'>

    <div className='text-white text-opacity-80 ml-5 flex items-center'>
    <div>
                  <Avatar className="size-10">
                    {selectedChatData.Image ? (
                      <AvatarImage src={`${HOST}/${selectedChatData.Image}`} />
                    ) : (
                      <div
                        className={`size-10 uppercase bg-gray-500 rounded-md  text-white flex justify-center items-center text-xs`}
                      >
                        {selectedChatData.firstName
                          ? selectedChatData.firstName.split("").shift()
                          : selectedChatData.email.split("").shift()}

                          
                      </div>
                    )}
                  </Avatar>
                </div>
                <div className='ml-3 text-white'>
                  {selectedChatType === "contact" ? (
                    <div>{`${selectedChatData.firstName} ${selectedChatData.lastName}`}</div>
                  ) : (
                    <div>{selectedChatData.email}</div>
                  )}
                </div>


    </div>
    <div className='mr-5 p-0 mb-0 flex justify-center items-center'>
        <button onClick={closeChat} className='text-neutral-400 focus:outline-none focus:text-white transition-all duration-300 focus:border-none'>
            <RiCloseFill className='text-3xl'/>
            </button>
    </div>
    </div>
    </>
  )
}

export default ChatHeader