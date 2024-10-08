import { useEffect } from 'react'
import Logo from '@/assets/Logo.png'
import ProfileInfo from './components/profile-info'
import NewDm from './components/new-dm'
import { apiClient } from '@/lib/api-client'
import { GET_CONTACTS_FOR_DM, GET_USER_CHANNELS } from '@/utils/constants'
import { useAppStore } from '@/store' 
import ContactList from '@/components/contact-list'
import CreateChannel from './components/create-channel'

const ContactsContainer = () => {

  const { setDirectMessagesContacts, setChannels, directMessagesContacts, channels } = useAppStore()

  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_CONTACTS_FOR_DM, {withCredentials: true})

      if(response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts)
      }
    }

    const getChannels = async () => {
      const response = await apiClient.get(GET_USER_CHANNELS, {withCredentials: true})

      if(response.data.channels) {
        setChannels(response.data.channels)
      }
    }

    
    getChannels();
    getContacts();
  }, [setChannels, setDirectMessagesContacts])

  return (
    
    <>
    
    <div className='h-[100vh] w-[35vw] bg-[#303030] relative overflow-hidden'>

        <img src={Logo} className='w-[200px] relative mt-5 ml-5' alt="" />

        <div className='my-5'>
          <div className='pr-10 flex items-center justify-between'>
            <h6 className='text-white text-opacity-80 ml-5'>Direct Messages</h6>
            <NewDm />
          </div>
          <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
            <ContactList contacts={directMessagesContacts} />
          </div>
        </div>

        <div className='my-5'>
        <div className='pr-10 flex items-center justify-between'>
            <h6 className='text-white text-opacity-80 ml-5'>Channels</h6>
            <CreateChannel />
            </div>
            <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
            <ContactList contacts={channels} isChannel={true}/>
          </div>
        </div>

        <ProfileInfo />
    </div>

    </>
  )
}

export default ContactsContainer