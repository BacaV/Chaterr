import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import {FaPlus} from 'react-icons/fa'  
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { ScrollArea } from "@/components/ui/scroll-area"
  import { Input } from "@/components/ui/input";
  import Lottie from 'react-lottie'
  import { defaultAnimation } from "@/lib/utils";


const NewDm = () => {

    const [openNewContactModal, setOpenNewContactModal] = useState(false);
    const [searchedContacts, setSearchedContacts] = useState([]);


    const searchContacts = async (searchTerm) => {

    }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus onClick={() =>setOpenNewContactModal(true)} className="text-neutral-400 text-opacity-80 text-light hover:text-neutral-100 cursor-pointer transition-all duration-300" />
          </TooltipTrigger>
          <TooltipContent className="bg-[#303030] text-white border-white border-opacity-30">
            <p>Create new dm</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal} >
  
  <DialogContent className="bg-[#303030]">
    <DialogHeader>
      <DialogTitle className="text-white">Please select a contact.</DialogTitle>
    </DialogHeader>
    <div>
        <Input placeholder="Search..." onChange={(e) => searchContacts(e.target.value)} className="bg-[#303030] text-white border-white focus:outline-none focus:border-none" />
    </div>
    {
        searchedContacts.length <= 0 && (
            <div className='text-[#fff] flex flex-col items-center justify-center gap-1 text-center'>
            <Lottie isClickToPauseDisabled={true}  height={100} width={100} options={defaultAnimation} />
            <h3 className='text-xl text-bold'>Search for contacts.</h3>
        </div>
        )
    }


  </DialogContent>
</Dialog>

    </>
  );
};

export default NewDm;
