import React from "react";
import MyContext from "../../context/index";

import { Formik, Form, Field, ErrorMessage } from "formik";

function Signup() {
  const { classes } = React.useContext(MyContext);

  const { signup } = classes;

  const goToSignupSite = (email) => {
    localStorage.setItem("email", email);
    window.location.href = "/signup/regform";
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validate={(values) => {
        const errors = {};
        const emailConition = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!values.email) {
          errors.email = "this field can't be empty";
        } else if (!emailConition.test(values.email)) {
          errors.email = "An email is incorrected";
        }

        return errors;
      }}
      onSubmit={(values) => {
        if (values.email) return goToSignupSite(values.email);
      }}
    >
      {(action) => (
        <div className={signup}>
          <Form className={`${signup}--form`} onSubmit={action.handleSubmit}>
            <span className={`${signup}--form__emailAddress  `}>
              <label htmlFor="email">Email address</label>
              <Field type="email" id="email" name="email" />
            </span>
            <button role="link" type="submit">
              Get Started &rsaquo;
            </button>
          </Form>
          <ErrorMessage component="p" name="email" />
        </div>
      )}
    </Formik>
  );
}

export default Signup;
