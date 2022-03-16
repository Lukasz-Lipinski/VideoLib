import React from "react";
import { useFormik } from "formik";

import { NavLink } from "../..";
import ErrorMsg from "../ErrorMsg";
import Options from "../Options";
import { initialValues, validate } from "../validationFunctions";
import { useSelector } from "react-redux";

function SigninFrom({ formType, isSignin, isHeader, className }) {
  const users = useSelector((state) => state.form.users);

  const goToDashboard = React.useCallback((href) => {
    window.location.href = href;
  }, []);

  const onSubmit = (values) => {
    const { email, password } = values;

    const isEmailAndPassCorrected = users.includes(
      (user) => user.email === email && user.password === password
    );

    console.log(isEmailAndPassCorrected, users);

    if (isEmailAndPassCorrected) {
      goToDashboard("dashboard/profiles");
    }
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  });
  const { errors, values, handleChange, handleSubmit } = formik;

  const setIsError = (condition) => {
    if (condition) return "error-true";
  };

  return (
    <form className={`${className}Form`} onSubmit={handleSubmit}>
      {isHeader ? <h2>{formType}</h2> : null}

      <input
        className={setIsError(errors.email)}
        type="email"
        placeholder="Email or phone number"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <ErrorMsg component="div" msg={errors.email} />

      <input
        className={setIsError(errors.password)}
        type="password"
        placeholder="Password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <ErrorMsg component="div" msg={errors.password} />

      {isHeader ? (
        <button type="submit">{formType}</button>
      ) : (
        <>
          <NavLink href="/" label="Forgot your password?" />
          <button type="submit">Next</button>
        </>
      )}
      {isSignin ? <Options /> : null}
    </form>
  );
}

export default SigninFrom;
