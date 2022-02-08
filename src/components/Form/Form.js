import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { GrFacebook } from "react-icons/gr";

function FormContainer() {
  return (
    <Formik initialValues={{ email: "", password: "" }}>
      {() => (
        <Form className="form">
          <h2>Sign In</h2>
          <Field type="text" placeholder="Email or phone number" />
          <Field type="password" placeholder="Password" />
          <button>Sign in</button>
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
