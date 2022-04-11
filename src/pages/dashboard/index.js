import { getSession } from "next-auth/react";

function Dashboard() {}

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

  const { email } = session.user;

  const userLogin = email.slice(0, email.indexOf("@"));

  return {
    redirect: {
      destination: `/dashboard/${userLogin}`,
      pernament: false,
    },
  };
};

export default Dashboard;
