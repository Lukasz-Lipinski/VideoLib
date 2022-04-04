import { getSession } from "next-auth/react";
import { Layout } from "../../components";

function Dashboard() {
  return (
    <div>
      <Layout></Layout>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession({
    req: ctx.req,
  });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        pernament: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Dashboard;
