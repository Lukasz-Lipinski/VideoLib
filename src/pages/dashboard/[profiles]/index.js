import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { IoAddSharp } from "react-icons/io5";

import { Card, Layout } from "../../../components";
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
    <Layout>
      <section className="profiles">
        <button onClick={logoutHandle}>Logout</button>

        <ul>
          {profiles.map((profile, index) => (
            <li key={`profile-list-${index}`}>
              <Card {...profile} />
            </li>
          ))}
        </ul>
        <IoAddSharp onClick={createProfile} />
      </section>
    </Layout>
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
