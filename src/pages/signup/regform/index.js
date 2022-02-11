import React from "react";
import { Footer, Form, Layout, Navigation } from "../../../components";

function RegForm() {
  const [pageNumber, setPageNumber] = React.useState(1);

  const nextPage = () => {
    setPageNumber((state) => state + 1);
  };
  return (
    <div className="regForm">
      <Navigation />

      <Layout>
        <div className="container--header">
          <p>SETP {pageNumber} of 3</p>
          <h2>Welcome back!</h2>
          <h2>Joining Netflix is easy.</h2>
        </div>
        <Form formType="Sign up" />
        <button onClick={nextPage}>Next</button>
      </Layout>
    </div>
  );
}

export default RegForm;
