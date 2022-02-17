import React from "react";
import MainSiteForm from "./MainSiteForm/MainSiteForm";
import SigninForm from "./SigninForm";
import SignupFrom from "./SignupForm";

function FormContainer({ typeofForm }) {
  switch (typeofForm) {
    case "SignupForm":
      return (
        <SignupFrom className="signin" formType="Sign in" signin isHeader />
      );
    case "SigninForm":
      return <SigninForm />;
    case "MainSiteForm":
      return <MainSiteForm />;
    default:
      return <p>Error</p>;
  }
}

export default FormContainer;
