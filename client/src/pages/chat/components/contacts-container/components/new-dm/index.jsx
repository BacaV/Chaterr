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


const NewDm = () => {
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


          {searchedContacts.length > 0 && (
                <ScrollArea className="h-[250px]">
          <div className="flex flex-col gap-5">
            {searchedContacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => selectNewContact(contact)}
                className="flex gap-3 items-center cursor-pointer"
              >
                <div>
                  <Avatar className="size-10">
                    {contact.Image ? (
                      <AvatarImage src={`${HOST}/${contact.Image}`} />
                    ) : (
                      <div
                        className={`size-10 uppercase bg-gray-500 rounded-md  text-white flex justify-center items-center text-xs`}
                      >
                        {contact.firstName
                          ? contact.firstName.split("").shift()
                          : contact.email.split("").shift()}

                          
                      </div>
                    )}
                  </Avatar>
                </div>

              <div className="flex flex-col text-white">
                  {contact.firstName && contact.lastName
                    ? `${contact.firstName} ${contact.lastName}` : `${contact.email}`}

                  <span className="text-xs text-white text-opacity-50">{contact.email}</span>
              </div>

              </div>
            ))}
          </div>
                </ScrollArea>
          )}

          {searchedContacts.length <= 0 && (
            <div className="text-[#fff] flex flex-col items-center justify-center gap-1 text-center">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={defaultAnimation}
              />
              <h3 className="text-xl text-bold">Search for contacts.</h3>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDm;
