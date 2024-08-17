import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { UPDATE_PROFILE } from "@/utils/constants";
import { UPDATE_PROFILE_IMAGE } from "@/utils/constants";

export const Profile = () => {
  const navigate = useNavigate();
  const {userInfo, setUserInfo} = useAppStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [selectedColor, setSelectedColor] = useState(1);
  const fileInputRef = useRef(null);

  
useEffect(() => {
  if(userInfo.profileSetup) {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setImage(userInfo.image);
    setSelectedColor(userInfo.color);
  }
}, [userInfo]);


  const handleColor = (selectedColor) => {
     switch(selectedColor) {
       case 1:
         return 'gray';
       case 2:
         return 'red';
       case 3:
         return 'blue';
       case 4:
         return 'yellow';
       case 5:
         return 'green';
     }
  }


  const validateProfile = () => {
    if(!firstName.length){
      toast.error("First name is required");
      return false;
    }

    if(!lastName.length){
      toast.error("Last name is required");
      return false;
    }

    return true;
  }

  const saveChanges = async () => {
    if(validateProfile()) {
      try{

        const response = await apiClient.post(UPDATE_PROFILE, {firstName, lastName, color: selectedColor}, {withCredentials: true});
        setUserInfo({...response.data});
        toast.success("Profile updated successfully");
        navigate('/chat');
      } catch(error) {
          console.log({error});
      }
      
      
    }

  }

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if(file) {
      const formData = new FormData();
      formData.append('profile-image', file);
      const response = await apiClient.post(UPDATE_PROFILE_IMAGE, formData, {withCredentials: true});
      
    if(response.status === 200 && response.data.image) {
      setUserInfo({...userInfo, image: response.data.image});
      toast.success("Profile image updated successfully");
    }
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    }
    reader.readAsDataURL(file);
  
}

  const handleDeleteImage = () => {
    setImage('');
  }


  return (
    <>
      
      <div className="h-[100vh] w-[100vw] bg-[#fefefe] flex items-center justify-center">
        <div className=' relative bg-gradient-to-br drop-shadow-2xl from-[#a7c957] to-[#dffa9f]/60 w-[80vw] md:w-[90vw] lg:w-[70vw] h-[80vh] rounded-xl flex flex-col justify-center items-center gap-10'>
        <IoArrowBack onClick={() => navigate('/')} className="text-4xl absolute top-5 left-5 cursor-pointer" />
        <h2 className="text-3xl font-bold text-white">Profile Settings</h2>
        <div className="flex justify-center items-center gap-10 ">
          <div className="flex flex-col gap-3 justify-center items-center">
            <Avatar className="size-40">
              {image ? <AvatarImage src={image} /> : 
                <div className={`w-[160px] h-[160px] uppercase bg-${handleColor(selectedColor)}-500 rounded-full text-white flex justify-center items-center text-2xl`}>
                  {firstName ? firstName.split('').shift() :
                  userInfo.email.split('').shift()}
                </div>
              }
              
            </Avatar>

            <Button variant="outline" onClick={handleFileInputClick}>
              Change Avatar 
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} name="profile-image" className="hidden" accept=".jpg, .jpeg, .png, .svg, .webp" />
          </div>
         

          <div className="settings flex flex-col gap-3">
            <Input className="w-full" type="email" disabled value={userInfo.email}/>
            <Input className="w-full" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <Input className="w-full" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            <div className="flex gap-3">
              <div className={`p-1 m-0 flex justify-center items-center ${selectedColor === 1 ? 'border-2 rounded-full border-black' : ''} `}> <button onClick={() => setSelectedColor(1)} className={`gray m-0  w-[32px] h-[32px] bg-gray-500 rounded-full`}></button> </div>
              <div className={`p-1 m-0 flex justify-center items-center ${selectedColor === 2 ? 'border-2 rounded-full border-black' : ''} `}> <button onClick={() => setSelectedColor(2)} className={`red m-0  w-[32px] h-[32px] bg-red-500 rounded-full`}></button> </div>
              <div className={`p-1 m-0 flex justify-center items-center ${selectedColor === 3 ? 'border-2 rounded-full border-black' : ''} `}> <button onClick={() => setSelectedColor(3)} className={`blue m-0  w-[32px] h-[32px] bg-blue-500 rounded-full`}></button> </div>
              <div className={`p-1 m-0 flex justify-center items-center ${selectedColor === 4 ? 'border-2 rounded-full border-black' : ''} `}> <button onClick={() => setSelectedColor(4)} className={`yellow m-0  w-[32px] h-[32px] bg-yellow-500 rounded-full`}></button> </div>
              <div className={`p-1 m-0 flex justify-center items-center ${selectedColor === 5 ? 'border-2 rounded-full border-black' : ''} `}> <button onClick={() => setSelectedColor(5)} className={`purple m-0  w-[32px] h-[32px] bg-purple-500 rounded-full`}></button> </div>
              
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