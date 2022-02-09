import React from "react";
import { Form, Layout, Navigation, Footer } from "../../components";

import MyContext from "../../context";

function Signin() {
  const context = React.useContext(MyContext);

  const { content } = context;
  const { homepageFooter } = content.footer;

  return (
    <>
      <Navigation />
      <Layout>
        <div className="signin">
          <Form />
        </div>
        <Footer {...homepageFooter} />
      </Layout>
    </>
  );
}

export default Signin;
