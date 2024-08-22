import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import ChatContainer from "./components/chat-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ContactsContainer from "./components/contacts-container";

export const Chat = () => {

  const {userInfo, selectedChatType} = useAppStore();
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
    <>
    <div className="flex">
      <ContactsContainer />
      {selectedChatType === undefined ? <EmptyChatContainer /> : <ChatContainer />}

    </div>
    </>
  )
}

export default Chat