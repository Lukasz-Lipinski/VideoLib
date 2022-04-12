import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, VideoCard } from "../../../../components";

import DashboardNavigation from "../../../../components/Dashboard/Navigation/Navigation";
import { connectDatebase } from "../../../api/functions";

function AccountPage({ profiles, movies }) {
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { account } = router.query;
  let lastIndex = 0;

  useEffect(() => {
    if (profiles) {
      const foundProfile = profiles.find(
        (profile) => profile.profileName === account
      );
      setProfile(foundProfile);
    }
  }, [profiles, account]);

  return (
    <div className="dashboard">
      <DashboardNavigation
        avatarColor={profile.bgColor}
        avatarKid={profile.kidSecurity}
      />
      <p>Szlagier</p>
      <p>lists</p>
      <Container className="dashboard">
        <ul className="dashboard-container-viedoList">
          {movies.map(
            (movie, index) =>
              index < 5 && (
                <li key={movie.user_id}>
                  <VideoCard {...movie} />
                </li>
              )
          )}
        </ul>
      </Container>
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

  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_VIDEOLIB_BASE_URL}${process.env.NEXT_PUBLIC_VIDEOLIB_API_KEY}`
  );

  const data = await response.json();
  const { hits: movies } = data;

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
      movies,
    },
  };
}

export default AccountPage;
