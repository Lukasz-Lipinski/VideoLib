import { signOut, getSession } from "next-auth/react";

import { CreateProfileForm } from "../../../components";

function CreateProfilePage({ user }) {
  const signoutHandler = () => {
    signOut();
  };
  return (
    <div className="createProfile">
      <button onClick={signoutHandler}>Sign out</button>
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
