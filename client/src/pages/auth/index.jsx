import React from 'react'
import Victory from "@/assets/victory.svg";
import Background from "@/assets/login2.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input"
import { useState } from 'react';
import { Button } from '@/components/ui/button';




export const Auth = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async () => {
    
  }

  const handleRegister = async () => {

  }


  return (
<>
    <div className='flex h-[100vh] w-[100vw] items-center justify-center bg-[#fafafa]'>
      <div className= 'bg-gradient-to-br drop-shadow-2xl from-[#a7c957] to-[#dffa9f]/60 w-[80vw] md:w-[90vw] lg:w-[70vw] h-[80vh] rounded-xl flex flex-row justify-center items-center gap-10'>
      <div >
      <div className='text-center'>
          <div className='title-wrapper flex flex-row justify-center items-center h-[1/2vh]'>
              <h1 className='font-bold  text-6xl '>Welcome to Chaterr</h1>
              <img src= { Victory } alt="Victory Image" className='h-[100px]' />
          </div>
          <p className='text-xl text-bold'>Login or register to get started!</p>
        </div>
        <div className='flex items-center justify-center w-full mt-5'>
          <Tabs defaultValue="login" className='w-3/4'>
            <TabsList className='bg-transparent rounded-none w-full'>
              <TabsTrigger value="login" className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-green-800 p-3 transition-all duration-300'>Login</TabsTrigger>
              <TabsTrigger value="register" className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-green-800 p-3 transition-all duration-300'>Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <div className='flex flex-col gap-3 mt-6  items-center'>
                <Input
                  type="email"
                  placeholder="Enter your email here"
                  value={email}
                  onchange={(e) => setEmail(e.target.value)}
                  />
                <Input
                  type="password"
                  placeholder="Enter your password here"
                  value={password}
                  onchange={(e) => setPassword(e.target.value)}
                  />
                <Button onClick={handleLogin} className='w-full'>Login</Button>
              </div>
            </TabsContent>

            <TabsContent value="register" >
            <div className='flex flex-col gap-3 mt-6  items-center'>
                <Input
                  type="email"
                  placeholder="Enter your email here"
                  value={email}
                  onchange={(e) => setEmail(e.target.value)}
                  />
                <Input
                  type="password"
                  placeholder="Enter your password here"
                  value={password}
                  onchange={(e) => setPassword(e.target.value)}
                  />
                <Input
                  type="password"
                  placeholder="Confirm your password here"
                  value={confirmPassword}
                  onchange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className='w-full bg-purple-700' onClick={handleRegister}>Register</Button>  
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </div>
      <div className='hidden xl:flex justify-center items-center'>
          <img src={Background} alt="" />
        </div>
      </div>
    </div>
</>

  )
}

export default Auth