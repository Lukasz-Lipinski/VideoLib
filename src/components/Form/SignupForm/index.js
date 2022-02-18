import { useFormik } from "formik";
import React from "react";
import { NavLink } from "../..";
import ErrorMsg from "../ErrorMsg";
import { validate, initialValues } from "../validationFunctions";

function SignupForm({ className }) {
  const [email, setEmail] = React.useState();

  React.useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  const onSubmit = (values) => {
    console.log(values);
  };

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
        values={values.password}
      />
      <ErrorMsg msg={errors.password} component="div" />

      <NavLink href="/" label="Forgot your password?" />
      <button type="submit">Next</button>
    </form>
  );
}

export default SignupForm;
