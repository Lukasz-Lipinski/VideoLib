import { getSession } from "next-auth/react";
import { DashboardLayout } from "../../../../../components";
import { connectDatebase } from "../../../../api/functions";

function GenerePage({ profile }) {
  return (
    <DashboardLayout profile={profile}>
      <p>Body</p>
      <p>Footer</p>
    </DashboardLayout>
  );
}

export const getServerSideProps = async (ctx) => {
  const { req, query } = ctx;
  const session = await getSession({ req });

  if (query.genre === "/") {
    return {
      redirect: {
        destination: "/",
        pernament: false,
      },
    };
  }

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        pernament: false,
      },
    };
  }

  const { user } = session;

  const client = await connectDatebase();
  const userAccount = await client
    .db()
    .collection("users")
    .findOne({ email: user.email });

  const { profiles } = userAccount;
  const { account } = query;
  let profile;

  for (const val of profiles) {
    if (val.profileName === account) {
      profile = { ...val };
    }
  }

  return {
    props: {
      session,
      profile,
    },
  };
};

export default GenerePage;
