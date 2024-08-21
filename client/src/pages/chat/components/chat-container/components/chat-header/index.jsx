import React from 'react'
import {RiCloseFill} from 'react-icons/ri'

const ChatHeader = () => {
  return (
    <>
    <div className='flex h-[10vh] w-[100%] bg-green-900 border-b border-[#fff] border-opacity-30 items-center justify-between'>

    <div className='text-white text-opacity-80 ml-5 flex items-center'></div>
    <div className='mr-5 p-0 mb-0 flex justify-center items-center'>
        <button className='text-neutral-400 focus:outline-none focus:text-white transition-all duration-300 focus:border-none'>
            <RiCloseFill className='text-3xl'/>
            </button>
    </div>
    </div>
    </>
  )
}

export default ChatHeader