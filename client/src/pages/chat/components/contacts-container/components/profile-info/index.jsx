import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {FiEdit2} from 'react-icons/fi'
import { HOST } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { IoPowerSharp } from "react-icons/io5";
import { apiClient } from "@/lib/api-client";
import { LOGOUT } from "@/utils/constants";


const ProfileInfo = () => {

  const { userInfo, setUserInfo } = useAppStore();


  const navigate = useNavigate();

  const logOut = async () => {
    
    try {
      const response = await apiClient.post(LOGOUT, {}, {withCredentials: true});
      
      if(response.status === 200) {
        setUserInfo(null);
        navigate("/auth");
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="absolute bottom-0 h-[10vh] flex items-center justify-center px-10 w-full bg-neutral-800 border-t border-white border-opacity-30">
      <div className="flex items-center justify-between gap-3">
        <div>
          <Avatar className="size-12">
            {userInfo.image ? (
              <AvatarImage src={`${HOST}/${userInfo.image}`} />
            ) : (
              <div
                className={`w-[160px] h-[160px] uppercase bg-${userInfo.color}-500 rounded-full text-white flex justify-center items-center text-2xl`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>

        <div className="text-white text-xl ">
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : "Anonymous"}
        </div>

        <div className="flex gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FiEdit2 onClick={() => navigate('/profile')} className="text-white"/>
              </TooltipTrigger>
              <TooltipContent className="text-white bg-[#303030] border-opacity-30">
                Edit Profile
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-white bg-[#303030] border-opacity-30">
                <IoPowerSharp onClick={logOut} className="text-red-500 bg-transparent" />
              </TooltipTrigger>
              <TooltipContent className="text-white bg-[#303030] border-opacity-30">
                Logout
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
