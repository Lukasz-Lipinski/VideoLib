import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import { NavLink } from "../..";
import ErrorMsg from "../ErrorMsg";
import { validate, initialValues } from "../validationFunctions";
import { increamentStep } from "../redux";

function SignupForm({ className }) {
  const [email, setEmail] = React.useState("");
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    if (values.password) dispatch(increamentStep());
  };

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
    if (errors.password && values.password) return true;
    if (errors.password && !values.password) return true;
    if (!errors.password && !values.password) return null;
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
        values={values.password}
      />
      <ErrorMsg msg={errors.password} component="div" />

      <NavLink href="/" label="Forgot your password?" />
      <button type="submit">Next</button>
    </form>
  );
}

export default SignupForm;
