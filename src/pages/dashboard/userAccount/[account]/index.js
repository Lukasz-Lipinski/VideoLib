import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, VideoList } from "../../../../components";

import DashboardNavigation from "../../../../components/Dashboard/Navigation/Navigation";
import { connectDatebase } from "../../../api/functions";

function AccountPage({ profiles, moviesDB }) {
  const [profile, setProfile] = useState();
  const [movies, setMovies] = useState([...new Set(moviesDB)]);
  const router = useRouter();
  const { account } = router.query;

  useEffect(() => {
    if (profiles) {
      const foundProfile = profiles.find(
        (profile) => profile.profileName === account
      );
      setProfile(foundProfile);
    }
  }, [profiles, account]);

  if (profile) {
    return (
      <div className="dashboard">
        <DashboardNavigation
          avatarColor={profile.bgColor}
          avatarKid={profile.kidSecurity}
        />
        <p>Szlagier</p>
        <p>lists</p>
        <Container className="dashboard">
          <VideoList movies={movies} title="Recommended" start={0} end={5} />
          <VideoList movies={movies} title="Last watched" start={5} end={10} />
          <VideoList movies={movies} title="News" start={10} end={15} />
        </Container>
      </div>
    );
  }

  return <div>loading...</div>;
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
  const { hits: moviesDB } = data;

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
      moviesDB,
    },
  };
}

export default AccountPage;
