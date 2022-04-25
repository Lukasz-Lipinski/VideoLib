import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useContext, useMemo } from "react";

import myContext from "../../../../context/index";
import { DashboardLayout, VideoList } from "../../../../components";
import { connectDatebase } from "../../../api/functions";
import { filtredByTag } from "../../../../context/functions";

function GenerePage({ profile, movies }) {
  const router = useRouter();

  const ctx = useContext(myContext);
  const { nav } = ctx.content.userProfiles;

  const [_, tag] = router.query.genre;

  const filteredMovies = useMemo(() => {
    let condition;

    for (const link of nav) {
      if (link.label === tag) {
        condition = link.tag;
      }
    }
    const foundMovies = filtredByTag(movies, condition);
    const length = foundMovies.length;

    return {
      length,
      movies: foundMovies,
    };
  }, [tag]);

  return (
    <DashboardLayout profile={profile}>
      <VideoList
        movies={filteredMovies.movies}
        title="Recommended"
        start={0}
        end={filteredMovies.length}
        inline
      />
    </DashboardLayout>
  );
}

export const getServerSideProps = async (ctx) => {
  const { req, query } = ctx;
  const session = await getSession({ req });

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
  const [account] = query.genre;
  let profile;

  for (const val of profiles) {
    if (val.profileName === account) {
      profile = { ...val };
    }
  }

  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_VIDEOLIB_BASE_URL}${process.env.NEXT_PUBLIC_VIDEOLIB_API_KEY}`
  );
  let data, movies;

  if (response.ok) {
    data = await response.json();
    movies = await data.hits;
  }

  return {
    props: {
      session,
      profile,
      movies,
    },
  };
};

export default GenerePage;
