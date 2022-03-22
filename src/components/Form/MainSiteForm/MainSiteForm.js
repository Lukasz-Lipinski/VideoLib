import { useRouter } from "next/router";

import { useContext, useCallback } from "react";
import { useFormik } from "formik";
import useSWR from "swr";

import MyContext from "../../../context/index";
import ErrorMsg from "../ErrorMsg";
import { initialValues, validate } from "../validationFunctions";

const fetcher = (url) => fetch(url).then((res) => res.json());

function MainSiteForm() {
  const router = useRouter();
  const { data, error } = useSWR(`/api/all-users`, fetcher);

  const { classes } = useContext(MyContext);
  const { signup } = classes;

  const goToSignupSite = useCallback(
    (email, href) => {
      localStorage.setItem("email", email);
      router.push(href);
    },
    [router]
  );

  const onSubmit = (values) => {
    const { email } = values;
    if (email) {
      const { allUsersCollection } = data;

      allUsersCollection.find((el) => el.email === email)
        ? goToSignupSite(email, "/signin")
        : goToSignupSite(email, "/signup/regform");
    }
  };
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  });

  const { values, errors, handleSubmit, handleChange } = formik;

  return (
    <div className={signup}>
      <form className={`${signup}--form`} onSubmit={handleSubmit}>
        <span className={`${signup}--form__emailAddress  `}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            value={values.email}
          />
        </span>
        <button role="link" type="submit">
          Get Started &rsaquo;
        </button>
      </form>
      <ErrorMsg component="p" msg={errors.email} />
    </div>
  );
}

export default MainSiteForm;
