import { signOut } from "next-auth/react";
import { CreateProfileForm } from "../../../components";

function CreateProfile() {
  const signoutHandler = () => {
    signOut();
  };
  return (
    <div className="createProfile">
      <button onClick={signoutHandler}>Sign out</button>
      <CreateProfileForm />
    </div>
  );
}

export default CreateProfile;
