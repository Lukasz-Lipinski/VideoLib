import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

import { NavLink } from "../..";
import ErrorMsg from "../ErrorMsg";
import { validate, initialValues } from "../validationFunctions";
import Snackbar from "../../ui/Snackbar";

function SignupForm({ className }) {
  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarData, setSnackbarData] = useState({
    className: "",
    status: "",
    message: "",
  });

  const onSubmit = (values) => {
    const { password } = values;

    const user = {
      email,
      password,
    };

    if (password) {
      setSnackbar(true);
      setSnackbarData({
        className: "pending",
        status: "pending",
        message: "An account is creating...",
      });

      fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          const { message, status } = data;

          setSnackbarData({
            className: status,
            status,
            message,
          });
        });
    }
  };

  useEffect(() => {
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
    <>
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

        <NavLink href="/info/forgot" label="Forgot your password?" />
        <button type="submit">Next</button>
      </form>
      {snackbar && (
        <Snackbar {...snackbarData} hideSnackbar={setSnackbar} isStep="true" />
      )}
    </>
  );
}

export default SignupForm;
