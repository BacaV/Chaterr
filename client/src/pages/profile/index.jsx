import { useAppStore } from "@/store";

export const Profile = () => {
  const {userInfo} = useAppStore();
  return (
    <div>
      <div>
        <div>Profile</div>
        <div>
          Email: {userInfo.email}
          <br /><br />
          You will need to setup some things on your profile
          <br /><br />
          <button>Setup Profile</button>
          <br /><br />
          <button>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Profile