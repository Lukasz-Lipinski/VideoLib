import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import DashboardNavigation from "../../../../components/Dashboard/Navigation/Navigation";
import { connectDatebase } from "../../../api/functions";

function AccountPage({ profiles }) {
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { account } = router.query;

  useEffect(() => {
    if (profiles) {
      const foundProfile = profiles.find(
        (profile) => profile.profileName === account
      );
      console.log(foundProfile);
      setProfile(foundProfile);
    }
  }, [profiles, account]);

  return (
    <div className="dashboard">
      <DashboardNavigation
        avatarColor={profile.bgColor}
        avatarKid={profile.kidSecurity}
      />
      Account site
      <p>here are informations of users</p>
      {account}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const { email } = session.user;

  const client = await connectDatebase();
  const user = await client.db().collection("users").findOne({
    email,
  });
  const { profiles } = user;

  return {
    props: {
      session,
      profiles,
    },
  };
}

export default AccountPage;
