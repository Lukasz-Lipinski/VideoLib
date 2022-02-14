import React from "react";
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
          <Form className="signin" formType="Sign in" signin isHeader />
        </div>
        <Footer {...homepageFooter} number={number} />
      </Layout>
    </>
  );
}

export default Signin;
