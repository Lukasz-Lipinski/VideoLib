import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { Form, Layout, Navigation, Footer } from "../../components";

import MyContext from "../../context";
import { getContentForSite } from "../../context/functions";

export async function getStaticProps() {
  const number = getContentForSite("number");

  return {
    props: {
      number,
    },
  };
}

function SigninPage({ number }) {
  const router = useRouter();
  const { data, status } = useSession();

  const context = React.useContext(MyContext);
  const { content } = context;
  const { homepageFooter } = content.footer;

  if (status === "authenticated") {
    const {
      user: { email },
    } = data;

    const userLogin = email.slice(0, email.indexOf("@"));
    router.push(`/dashboard/${userLogin}`);
  }

  console.log(status);

  return (
    <>
      <Navigation />
      <Layout>
        <div className="signin">
          {status === "unauthenticated" ? (
            <Form typeofForm="SigninForm" />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <Footer {...homepageFooter} number={number} />
      </Layout>
    </>
  );
}

export default SigninPage;
