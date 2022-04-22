import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { DashboardLayout, VideoCard } from "../../../components";
import { filtredByTag } from "../../../context/functions";
import { connectDatebase } from "../../api/functions";

function GenerePage({ profile, result }) {
  const url = `https://${process.env.NEXT_PUBLIC_VIDEOLIB_BASE_URL}${process.env.NEXT_PUBLIC_VIDEOLIB_API_KEY}`;
  const { data, error } = useSWR(url);
  const [filtredMovies, setFilredMovies] = useState([]);

  useEffect(() => {
    if (data) {
      const movies = filtredByTag(data.hits, result);
      setFilredMovies(movies);
    }
  }, [data, result]);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <DashboardLayout profile={profile}>
      <h2>Here is a result for {result}</h2>

      {!!filtredMovies.length ? (
        <ul className="filred-movies-list">
          {filtredMovies.map((movie, index) => (
            <li key={`filtred-movies-list-${index}`}>
              <VideoCard videos={movie.videos} size="tiny" />
            </li>
          ))}
        </ul>
      ) : (
        <p>Nothing was found</p>
      )}
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
  const [, account, result] = query.searcher;
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
      result,
    },
  };
};

export default GenerePage;
