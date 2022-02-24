import React, { useCallback } from "react";
import { useFormik } from "formik";

import MyContext from "../../../context/index";
import ErrorMsg from "../ErrorMsg";
import { initialValues, validate } from "../validationFunctions";
import { useSelector } from "react-redux";

function MainSiteForm() {
  const { classes } = React.useContext(MyContext);
  const { signup } = classes;

  const usersEmails = useSelector((state) => state.form.usersEmails);

  const goToSignupSite = useCallback((email, href) => {
    localStorage.setItem("email", email);
    window.location.href = href;
  }, []);

  const onSubmit = (values) => {
    const { email } = values;
    if (email) {
      usersEmails.includes(email)
        ? goToSignupSite(email, "/signin")
        : goToSignupSite(email, "/signup/regform");
    }
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
