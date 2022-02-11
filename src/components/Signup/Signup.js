import React from "react";
import MyContext from "../../context/index";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { NavLink } from "../";

function Signup() {
  const { classes } = React.useContext(MyContext);

  const { signup } = classes;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validate={(values) => {
        const errors = {};
        const emailConition = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!values.email) {
          errors.email = "this field can't be empty";
          errors.isEmailError = true;
        } else if (!emailConition.test(values.email)) {
          errors.email = "An email is incorrected";
          errors.isEmailError = true;
        } else errors.isEmailError = false;

        return errors;
      }}
    >
      {() => (
        <div className={signup}>
          <Form className={`${signup}--form`} onSubmit={handleSubmit}>
            <span className={`${signup}--form__emailAddress  `}>
              <label htmlFor="email">Email address</label>
              <Field type="email" id="email" name="email" />
            </span>

            <NavLink href="/signup/regform" label="Get Started &rsaquo;" />
          </Form>
          <ErrorMessage component="p" name="email" />
        </div>
      )}
    </Formik>
  );
}

export default Signup;
