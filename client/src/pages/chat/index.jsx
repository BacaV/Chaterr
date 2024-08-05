import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { useEffect } from "react";

export const Chat = () => {

  const {userInfo} = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(!userInfo.profileSetup){
      toast("Please login to access this page");
      navigate('/profile');
    } else {
      navigate('/chat');
    }
  }, [userInfo, navigate]);

  return (
    <div>Chat</div>
  )
}

export default Chat