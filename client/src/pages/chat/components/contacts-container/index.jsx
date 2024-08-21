import React from 'react'
import Logo from '@/assets/Logo.png'

const ContactsContainer = () => {
  return (
    
    <>
    
    <div className='h-[100vh] w-[35vw] bg-[#303030] relative overflow-hidden'>

        <img src={Logo} className='w-[200px] relative mt-5 ml-5' alt="" />

        <div className='my-5'>
            <h6 className='text-white text-opacity-80 ml-5'>Direct Messages</h6>
        </div>

        <div className='my-5'>
            <h6 className='text-white text-opacity-80 ml-5'>Channels</h6>
        </div>

        
    </div>

    </>
  )
}

export default ContactsContainer