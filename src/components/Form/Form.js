import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { GrFacebook } from "react-icons/gr";

function FormContainer() {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const emailConition = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const errors = {};
        if (!values.email) errors.email = "the field is required";
        else if (emailConition.test(values.email))
          errors.email = "An email is incorrected";

        if (!values.password) errors.password = "the field is required";

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        if (!values.email || !values.password) setSubmitting(false);
        else setSubmitting(true);
      }}
    >
      {(handleSubmitting) => (
        <Form className="signinForm">
          <h2>Sign In</h2>
          <Field type="text" placeholder="Email or phone number" name="email" />
          <ErrorMessage className="errorMsg" component="div" name="email" />
          <Field type="password" placeholder="Password" name="password" />
          <ErrorMessage className="errorMsg" component="div" name="password" />

          <button type="submit">Sign in</button>

          <div className="form--options">
            <label htmlFor="rememberMe">Remember me</label>
            <Field id="rememberMe" type="checkbox" name="remeberMe" />
            <Link href="">
              <a>Need help?</a>
            </Link>
          </div>

          <Link href="">
            <a>
              <GrFacebook />
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
