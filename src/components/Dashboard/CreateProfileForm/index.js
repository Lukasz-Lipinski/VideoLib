import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

import { Snackbar } from "../../";

function CreateProfileForm({ user }) {
  const router = useRouter();
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarData, setSnackbarData] = useState({
    className: "",
    status: "",
    message: "",
  });

  const { errors, handleSubmit, values, handleChange } = useFormik({
    initialValues: { profileName: "", forKids: false },
    initialErrors: { isError: false, msg: "" },
    validate: (values) => {
      const { profileName } = values;

      if (!profileName) {
        return {
          isError: true,
          msg: "Profile name is empty!",
        };
      }
      return {};
    },
    onSubmit: function (values) {
      const { profileName, forKids } = values;
      setSnackbarData({
        className: "pending",
        status: "pending",
        message: "profile is creating",
      });
      setSnackbar((currState) => !currState);

      fetch("/api/update/profiles", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileName, forKids, user }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          const { redirect, message } = data;

          if (redirect) {
            const userLogin = user.email.slice(0, user.email.indexOf("@"));
            router.push(`/dashboard/${userLogin}`);
            return;
          }
          setSnackbarData({
            className: "error",
            status: "error",
            message,
          });
        });
    },
  });

  return (
    <>
      <form className="createProfile-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="profileName">Profile name:</label>
          <input
            id="profileName"
            type="text"
            values={values.profileName}
            onChange={handleChange}
          />
        </div>
        {errors.isError ? (
          <div className="createProfile-form-error">{errors.msg}</div>
        ) : null}
        <div>
          <label htmlFor="forKids" className="checkbox">
            For kids
            <input
              type="checkbox"
              id="forKids"
              className="checkbox-input"
              value={values.forKids}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
      {snackbar ? (
        <Snackbar {...snackbarData} hideSnackbar={setSnackbar} />
      ) : null}
    </>
  );
}

export default CreateProfileForm;
