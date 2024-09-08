import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CREATE_CHANNEL, GET_ALL_CONTACTS } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";

const CreateChannel = () => {
  const { setSelectedChatData, setSelectedChatType, addChannel } = useAppStore();
  const [newChannelModal, setNewChannelModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await apiClient.get(GET_ALL_CONTACTS, {
        withCredentials: true,
      });
      setAllContacts(response.data.contacts);
    };
    getData();
  }, []);

  const CreateChannel = async () => {
    try {
        if( channelName.length > 0 && selectedContacts.length > 0 ){
            const response = await apiClient.post(CREATE_CHANNEL, {
                name: channelName,
                members: selectedContacts.map((contact) => contact.value),
              }, {withCredentials: true});
              if(response.status === 201) {
                setChannelName("");
                setSelectedContacts([]);
                setNewChannelModal(false);
                addChannel(response.data.channel);
              }
        }
      
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              onClick={() => setNewChannelModal(true)}
              className="text-neutral-400 text-opacity-80 text-light hover:text-neutral-100 cursor-pointer transition-all duration-300"
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#303030] text-white border-white border-opacity-30">
            <p>Create new channel</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
        <DialogContent className="bg-[#303030]">
          <DialogHeader>
            <DialogTitle className="text-white">
              Please fill up the details to create a new channel
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Channel Name"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
              className="bg-[#303030] text-white border-white focus:outline-none focus:border-none"
            />
          </div>
          <div>
            <MultipleSelector
              className="rounded-lg border-none py-2 text-white bg-[#303030]"
              defaultOptions={allContacts}
              placeholder="Select Contacts"
              value={selectedContacts}
              onChange={setSelectedContacts}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600"> No results found</p>
              }
            />
          </div>
          <div>
            <Button
              onClick={CreateChannel}
              className="w-full bg-green-500 hover:bg-green-900 duration-300 transition-all"
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChannel;
