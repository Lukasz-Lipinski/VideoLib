import { getSession, signOut } from "next-auth/react";
import { IoAddSharp } from "react-icons/io5";

import { Card, Layout } from "../../../components";

function Profiles({ user, isError, msg, profiles }) {
  const createProfile = () => {
    router.push("createProfile");
  };

  const logoutHandle = async () => {
    await signOut();
  };

  if (!profiles) {
    return (
      <div className="addNewProfile">
        <button onClick={logoutHandle}>Logout</button>
        <div className="addNewProfile-btn" onClick={createProfile}>
          <p>Create a new profile</p>

          <IoAddSharp />
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <section className="profiles">
        <ul>
          {profiles.map((profile) => (
            <li key={`profile-list-${index}`}>
              <Card {...profile} />
            </li>
          ))}
        </ul>
        <IoAddSharp onClik={createProfile} />
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

  return {
    props: {
      session,
    },
  };
}

export default Profiles;
