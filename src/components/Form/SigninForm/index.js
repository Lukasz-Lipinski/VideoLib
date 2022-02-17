import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { NavLink } from "../..";

function SigninForm() {
  const [email, setEmail] = React.useState();

  React.useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const emailConition = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const errors = {};

        if (values.password.length < 4 || values.password.length > 60) {
          errors.password =
            "Password must contain between 4 and 60 charackters";
          errors.errorIsPassword = true;
        } else errors.errorIsPassword = false;

        return errors;
      }}
    >
      {({ errors }) => {
        return (
          <Form className={`${className}Form`}>
            <span>
              <p>Email</p>
              <p>{email ? email : null}</p>
            </span>
            <Field
              className={`error-${errors.errorIsPassword}`}
              type="password"
              placeholder="Password"
              name="password"
            />
            <ErrorMessage
              className="errorMsg"
              component="div"
              name="password"
            />

            <NavLink href="/" label="Forgot your password?" />
            <button type="submit">Next</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SigninForm;
