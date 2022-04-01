import { useFormik } from "formik";
import { signIn } from "next-auth/react";

import { NavLink } from "../..";
import ErrorMsg from "../ErrorMsg";
import Options from "../Options";
import { validate } from "../validationFunctions";

function SigninFrom({ formType, isSignin, isHeader, className }) {
  const onSubmit = async (values) => {
    const { email, password } = values;

    await signIn("credentials", {
      email,
      password,
    });
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate,
    onSubmit,
  });
  const { errors, values, handleChange, handleSubmit } = formik;

  console.log(errors, values);

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
    </>
  );
}

export default SigninFrom;
