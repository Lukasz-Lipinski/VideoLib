import React from "react";
import MainSiteForm from "./MainSiteForm/MainSiteForm";
import SignupForm from "./SignupForm";
import SigninFrom from "./SigninForm";

function FormContainer({ typeofForm }) {
  switch (typeofForm) {
    case "SigninForm":
      return (
        <SigninFrom className="signin" formType="Sign in" isSignin isHeader />
      );
    case "SignupForm":
      return <SignupForm className="registration" />;
    case "MainSiteForm":
      return <MainSiteForm />;
    default:
      return <p>Error</p>;
  }
}

export default FormContainer;
