import React from "react";
import { useFormik } from "formik";

import MyContext from "../../../context/index";
import ErrorMsg from "../ErrorMsg";
import { initialValues, validate } from "../validationFunctions";

function MainSiteForm() {
  const { classes } = React.useContext(MyContext);

  const { signup } = classes;

  const goToSignupSite = (email) => {
    localStorage.setItem("email", email);
    window.location.href = "/signup/regform";
  };

  const onSubmit = () => {
    goToSignupSite(values.email);
  };
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  });

  const { values, errors, handleSubmit, handleChange } = formik;

  return (
    <div className={signup}>
      <form className={`${signup}--form`} onSubmit={handleSubmit}>
        <span className={`${signup}--form__emailAddress  `}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            value={values.email}
          />
        </span>
        <button role="link" type="submit">
          Get Started &rsaquo;
        </button>
      </form>
      <ErrorMsg component="p" msg={errors.email} />
    </div>
  );
}

export default MainSiteForm;
