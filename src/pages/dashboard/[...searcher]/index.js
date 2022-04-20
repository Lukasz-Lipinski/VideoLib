import { getSession } from "next-auth/react";
import useSWR from "swr";
import { DashboardLayout } from "../../../components";
import { connectDatebase } from "../../api/functions";

const findMovie = (allMovies, expression) => {
  const arr = [];
  const allFoundMovies = arr.filter((movie) => {
    //filter all movies by title and tags to return correctly-filltered movies
  });
};

function GenerePage({ profile, result }) {
  const url = `https://${process.env.NEXT_PUBLIC_VIDEOLIB_BASE_URL}${process.env.NEXT_PUBLIC_VIDEOLIB_API_KEY}`;
  const { data, error } = useSWR(url);

  if (!data) {
    return <p>Loading...</p>;
  }

  console.log(data);
  return (
    <DashboardLayout profile={profile}>
      <h2>Here is a result for {result}</h2>
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
