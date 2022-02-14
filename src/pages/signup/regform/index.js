import React from "react";
import { Footer, Form, Layout, Navigation, NavLink } from "../../../components";

function RegForm() {
  const [pageNumber, setPageNumber] = React.useState(1);

  const nextPage = () => {
    setPageNumber((state) => state + 1);
  };
  return (
    <div className="registration">
      <Navigation />

      <Layout>
        <div>
          <p>SETP {pageNumber} of 3</p>
          <h2>Welcome back!</h2>
          <h2>Joining Netflix is easy.</h2>
          <Form formType="Sign up" className="registration" />
          <NavLink label="Forgot your password?" href="/" />
          <button onClick={nextPage}>Next</button>
        </div>
      </Layout>
    </div>
  );
}

export default RegForm;
