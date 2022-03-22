import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import useSWR from "swr";

import { NavLink } from "../..";
import ErrorMsg from "../ErrorMsg";
import Options from "../Options";
import { initialValues, validate } from "../validationFunctions";
import Snackbar from "../../ui/Snackbar";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

function SigninFrom({ formType, isSignin, isHeader, className }) {
  const router = useRouter();
  const [snackbarData, setSnackbarData] = useState({
    className: "",
    status: "",
    message: "",
  });
  const [isSnackbar, setIsSnackbar] = useState(false);

  const { data, error } = useSWR("/api/register", fetcher);

  const onSubmit = (values) => {
    const { email, password } = values;
    const { users } = data;

    const isEmailAndPassCorrected = users.filter(
      (userData) => userData.email === email && userData.password === password
    );

    if (isEmailAndPassCorrected.length !== 0) {
      setIsSnackbar(false);
      setSnackbarData({
        className: "",
        status: "",
        message: "",
      });

      const userAccount = email.trim().slice(0, email.indexOf("@"));

      router.push(`/dashboard/${userAccount}`);
      return;
    }
    setIsSnackbar(true);

    setSnackbarData({
      className: "error",
      status: "error",
      message: "An user doesn't exsist",
    });
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
    <>
      <form className={`${className}Form`} onSubmit={handleSubmit}>
        {isHeader ? <h2>{formType}</h2> : null}

        <input
          className={setIsError.bind(this, errors.email)}
          type="email"
          placeholder="Email or phone number"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <ErrorMsg component="div" msg={errors.email} />

        <input
          className={setIsError.bind(this, errors.password)}
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
      {isSnackbar ? (
        <Snackbar {...snackbarData} hideSnackbar={setIsSnackbar} />
      ) : null}
    </>
  );
}

export default SigninFrom;
