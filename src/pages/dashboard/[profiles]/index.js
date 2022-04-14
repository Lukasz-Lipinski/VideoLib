import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";

import { Card, Logo } from "../../../components";
import { connectDatebase } from "../../api/functions";

function Profiles({ user }) {
  const { profiles } = user;
  const router = useRouter();
  const [isManagePanel, setIsManagePanel] = useState(false);

  const createProfile = () => {
    router.push("/dashboard/createProfile");
  };

  const logoutHandle = async () => {
    await signOut();
  };

  const manageProfileHanlder = () => {
    setIsManagePanel((state) => !state);
  };

  if (!profiles) {
    return (
      <div className="profiles">
        <button onClick={logoutHandle}>Logout</button>
        <div className="profiles-btn" onClick={createProfile}>
          <p>Create a new profile</p>

          <IoAddSharp onClick={createProfile} />
        </div>
      </div>
    );
  }

  return (
    <section className="profiles">
      <div className="profiles-nav">
        <Logo />
        <button onClick={logoutHandle}>Logout</button>
      </div>
      <h1>Who&apos;s watching?</h1>
      <ul>
        {profiles.map((profile, index) => (
          <li key={`profile-list-${index}`}>
            <Card {...profile} isManagePanel={isManagePanel} />
          </li>
        ))}
        <li className="addProfile">
          <IoAddSharp onClick={createProfile} />
        </li>
      </ul>
      <button onClick={manageProfileHanlder} className="manageProfile-btn">
        {isManagePanel ? "Back" : "Manage profiles"}
      </button>
    </section>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const client = await connectDatebase();
  let user = await client
    .db()
    .collection("users")
    .findOne({ email: session.user.email });

  user._id = user._id.toString();

  client.close();

  return {
    props: {
      session,
      user,
    },
  };
}

export default Profiles;
