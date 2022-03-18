import React from "react";
import useSWR from "swr";
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

function Signin({ number }) {
  const context = React.useContext(MyContext);

  const { content } = context;
  const { homepageFooter } = content.footer;

  return (
    <>
      <Navigation />
      <Layout>
        <div className="signin">
          <Form typeofForm="SigninForm" />
        </div>
        <Footer {...homepageFooter} number={number} />
      </Layout>
    </>
  );
}

export default Signin;
