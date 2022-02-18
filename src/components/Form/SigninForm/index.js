import { ErrorMessage, Field, Form, useFormik } from "formik";
import React from "react";
import { NavLink } from "../..";

const validate = (values) => {
  const errors = {};

  if (values.password.length < 4 || values.password.length > 60) {
    errors.password = "Password must contain between 4 and 60 charackters";
    errors.isErrorPassword = true;
  }

  return errors;
};

const initialValues = { password: "" };

const onSubmit = (values) => {
  console.log(values);
};

function SigninForm({ className }) {
  const [email, setEmail] = React.useState();

  React.useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const { handleSubmit, handleChange, values, errors } = formik;

  const isError = () => {
    if (errors.isErrorPassword && values.password) return true;
    if (errors.isErrorPassword && !values.password) return true;
    if (!errors.isErrorPassword && !values.password) return null;
    else return false;
  };

  return (
    <form className={`${className}Form`} onSubmit={handleSubmit}>
      <span>
        <p>Email</p>
        <p>{email ? email : null}</p>
      </span>
      <input
        className={`error-${isError()}`}
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        values={formik.values.password}
      />
      {errors.password ? (
        <div className="errorMsg">{errors.password}</div>
      ) : null}

      <NavLink href="/" label="Forgot your password?" />
      <button type="submit">Next</button>
    </form>
  );
}

export default SigninForm;
