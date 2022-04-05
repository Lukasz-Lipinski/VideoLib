import { signOut, getSession } from "next-auth/react";
import Link from "next/link";

import { CreateProfileForm } from "../../../components";

function CreateProfilePage({ user }) {
  const { email } = user;
  const userEmail = email.slice(0, email.indexOf("@"));

  const signoutHandler = () => {
    signOut();
  };

  return (
    <div className="createProfile">
      <div id="logo">
        <Link
          href={{
            pathname: "/dashboard/[profile]",
            query: { profile: userEmail },
          }}
        >
          <a id="logo">VideoLib</a>
        </Link>
      </div>
      <CreateProfileForm user={user} />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });

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
      user: session.user,
      session,
    },
  };
};

export default CreateProfilePage;
