import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export const Profile = () => {
  const navigate = useNavigate();
  const {userInfo, setUserInfo} = useAppStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [color, setColor] = useState('');
  const [hovered, setHovered] = useState('');

  const saveChanges = async () => {

  }


  return (
    <>
      
      <div className="h-[100vh] w-[100vw] bg-[#fefefe] flex items-center justify-center">
        <div className="h-[300px] w-[300px] gap-10 bg-gradient-to-br drop-shadow-2xl from-[#a7c957] to-[#dffa9f]/60 text-white flex items-center justify-center">
          <div className="avatar w-[64px] h-[64px] border-2">
            <img src={image} alt="Avatar" />
          </div>
          <div className="settings">
            <h3 className="text-xl font-bold">Place Holder</h3>
          </div>
        </div>
      </div>

    </>
  )
}

export default Profile