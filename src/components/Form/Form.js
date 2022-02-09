import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { GrFacebook } from "react-icons/gr";

function FormContainer() {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values, actions) => {
        const emailConition = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const errors = {};
        if (!values.email) {
          errors.email = "the field is required";
          errors.isEmailError = true;
        } else if (!emailConition.test(values.email)) {
          errors.email = "An email is incorrected";
          errors.isEmailError = true;
        } else errors.isEmailError = false;

        if (!values.password) {
          errors.password = "the field is required";
          errors.isPasswordError = true;
        } else errors.isPasswordError = false;

        return errors;
      }}
    >
      {({ errors, handleSubmit, values, isSubmitting }) => (
        <Form className="signinForm">
          <h2>Sign In</h2>
          <Field
            className={`error-${errors.isEmailError}`}
            type="text"
            placeholder="Email or phone number"
            name="email"
          />
          <ErrorMessage className="errorMsg" component="div" name="email" />
          <Field
            className={`error-${errors.isPasswordError}`}
            type="password"
            placeholder="Password"
            name="password"
          />
          <ErrorMessage className="errorMsg" component="div" name="password" />

          <button type="submit" disabled={isSubmitting}>
            Sign in
          </button>

          <div className="form--options">
            <span>
              <label htmlFor="rememberMe">Remember me</label>
              <Field id="rememberMe" type="checkbox" name="remeberMe" />
            </span>
            <Link href="">
              <a>Need help?</a>
            </Link>
          </div>

          <Link href="">
            <a>
              <span>
                <GrFacebook />
              </span>
              Log with Facebook
            </a>
          </Link>
          <p>
            New to Netflix?
            <Link href="/signup">
              <a>SIGN UP NOW!</a>
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}

export default FormContainer;
