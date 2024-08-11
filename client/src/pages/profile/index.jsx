import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



export const Profile = () => {
  const navigate = useNavigate();
  const {userInfo, setUserInfo} = useAppStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [color, setColor] = useState('');
  const [hovered, setHovered] = useState('');
  const [email, setEmail] = useState('');

  const saveChanges = async () => {

  }


  return (
    <>
      
      <div className="h-[100vh] w-[100vw] bg-[#fefefe] flex items-center justify-center">
        <div className='bg-gradient-to-br drop-shadow-2xl from-[#a7c957] to-[#dffa9f]/60 w-[80vw] md:w-[90vw] lg:w-[70vw] h-[80vh] rounded-xl flex flex-col justify-center items-center gap-10'>
        <h2 className="text-3xl font-bold text-white">Profile Settings</h2>
        <div className="flex justify-center items-center gap-10 ">
          <div className="flex flex-col gap-3">
            <Avatar className="size-40">
              <AvatarImage src={image} />
              <AvatarFallback>Us</AvatarFallback>
            </Avatar>

            <Button variant="outline" onClick={() => setHovered('')}>
              Change Avatar 
            </Button>
          </div>
         

          <div className="settings flex flex-col gap-3">
            <Input className="w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input className="w-full" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <Input className="w-full" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            <div className="flex gap-3">
              <button className="red w-[35px] h-[35px] bg-red-500 rounded-full"></button>
              <button className="green w-[35px] h-[35px] bg-green-500 rounded-full"></button>
              <button className="blue w-[35px] h-[35px] bg-blue-500 rounded-full"></button>
              <button className="yellow w-[35px] h-[35px] bg-yellow-500 rounded-full"></button>
              <button className="purple w-[35px] h-[35px] bg-purple-500 rounded-full"></button>
            </div>
            <Button className='w-full bg-purple-700' onClick={saveChanges}>Save Changes</Button>
          </div>
        </div>
        </div>
      </div>

    </>
  )
}

export default Profile