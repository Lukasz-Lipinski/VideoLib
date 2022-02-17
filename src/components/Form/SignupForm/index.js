import { Formik, Field, ErrorMessage, Form } from "formik";
import React from "react";
import { NavLink } from "../../";

import Options from "../Options";

function SignupFrom({ formType, signin, isHeader, className }) {
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

        if (!values.email) {
          errors.email = "the field is required";
          errors.errorIsEmail = true;
        } else if (!emailConition.test(values.email)) {
          errors.email = "An email is incorrected";
          errors.errorIsEmail = true;
        } else errors.errorIsEmail = false;

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
            {isHeader ? <h2>{formType}</h2> : null}
            {signin ? (
              <>
                <Field
                  className={`error-${errors.errorIsEmail}`}
                  type="email"
                  placeholder="Email or phone number"
                  name="email"
                />
                <ErrorMessage
                  className="errorMsg"
                  component="div"
                  name="email"
                />
              </>
            ) : (
              <span>
                <p>Email</p>
                <p>{email ? email : null}</p>
              </span>
            )}
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

            {isHeader ? (
              <button type="submit">{formType}</button>
            ) : (
              <>
                <NavLink href="/" label="Forgot your password?" />
                <button type="submit">Next</button>
              </>
            )}
            {signin ? <Options /> : null}
          </Form>
        );
      }}
    </Formik>
  );
}

export default SignupFrom;
