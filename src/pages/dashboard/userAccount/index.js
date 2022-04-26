import { getSession } from "next-auth/react";
function UserAccountPage() {
  return <>Redirecting....</>;
}

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        pernament: false,
      },
    };
  }

  const { email } = session.user;

  const account = email.substring(0, email.indexOf("@"));

  return {
    props: {
      session,
    },
    redirect: {
      destination: `/dashboard/${account}`,
      pernament: false,
    },
  };
}

export default UserAccountPage;
