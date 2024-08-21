import React from 'react'
import ChatHeader from './components/chat-header'
import MessageBar from './components/message-bar'
import MessageContainer from './components/message-container'

const ChatContainer = () => {
  return (
    <>
    <div className='flex flex-col w-[65vw] border-l border-[#fff] border-opacity-30'>
    <ChatHeader />
    <MessageContainer />
    <MessageBar />
    </div>
    </>
  )
}

export default ChatContainer