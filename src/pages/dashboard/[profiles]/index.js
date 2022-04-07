import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { IoAddSharp } from "react-icons/io5";

import { Card, Logo } from "../../../components";
import { connectDatebase } from "../../api/functions";

function Profiles({ user }) {
  const { profiles } = user;
  const router = useRouter();

  const createProfile = () => {
    router.push("/dashboard/createProfile");
  };

  const logoutHandle = async () => {
    await signOut();
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
            <Card {...profile} />
          </li>
        ))}
        <li className="addProfile">
          <IoAddSharp onClick={createProfile} />
        </li>
      </ul>
      <button className="manageProfile-btn">Manage profiles</button>
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
