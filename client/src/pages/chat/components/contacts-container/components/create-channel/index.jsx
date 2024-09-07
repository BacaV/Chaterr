import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import { FaPlus } from "react-icons/fa";
  import { useState } from "react";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { Input } from "@/components/ui/input";
  import Lottie from "react-lottie";
  import { defaultAnimation } from "@/lib/utils";
  import { SEARCH_CONTACTS } from "@/utils/constants";
  import { apiClient } from "@/lib/api-client";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import {HOST} from "@/utils/constants";
  import { useAppStore } from "@/store";
  
  
  const CreateChannel = () => {
    const { setSelectedChatData, setSelectedChatType } = useAppStore();
    const [openNewContactModal, setOpenNewContactModal] = useState(false);
    const [searchedContacts, setSearchedContacts] = useState([]);
  
    const searchContacts = async (searchTerm) => {
      try {
        if (searchTerm.length > 0) {
          const response = await apiClient.post(
            SEARCH_CONTACTS,
            { searchTerm },
            { withCredentials: true }
          );
          if (response.status === 200 && response.data.contacts) {
            setSearchedContacts(response.data.contacts);
          } 
        }  else {
          setSearchedContacts([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const selectNewContact = (contact) => {
      setOpenNewContactModal(false);
      setSelectedChatData(contact);
      setSelectedChatType("contact");
      setSearchedContacts([]);
  
    }
  
  
  
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FaPlus
                onClick={() => setOpenNewContactModal(true)}
                className="text-neutral-400 text-opacity-80 text-light hover:text-neutral-100 cursor-pointer transition-all duration-300"
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#303030] text-white border-white border-opacity-30">
              <p>Create new dm</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
  
        <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
          <DialogContent className="bg-[#303030]">
            <DialogHeader>
              <DialogTitle className="text-white">
                Please select a contact.
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div>
              <Input
                placeholder="Search..."
                onChange={(e) => searchContacts(e.target.value)}
                className="bg-[#303030] text-white border-white focus:outline-none focus:border-none"
              />
            </div>
  
          </DialogContent>
        </Dialog>
      </>
    );
  };
  
  export default CreateChannel;
  