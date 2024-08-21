import React from 'react'
import Logo from '@/assets/Logo.png'
import Lottie from 'react-lottie'
import { defaultAnimation } from '@/lib/utils'

const EmptyChatContainer = () => {
  return (
    <>
    
    <div className='h-[100vh] w-[65vw] bg-[#303030] border-l border-l-[#fff] border-opacity-30 flex items-center justify-center'>
        <div className='text-[#fff] flex flex-col items-center justify-center gap-1 text-center'>
            <Lottie isClickToPauseDisabled={true}  height={200} width={200} options={defaultAnimation} />
            <h3 className='text-3xl text-bold'>Welcome to Chaterr, your chat app!</h3>
        </div>

    </div>

    </>
  )
}

export default EmptyChatContainer