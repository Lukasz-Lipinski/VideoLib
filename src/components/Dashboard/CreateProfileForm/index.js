import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import randomColor from "randomcolor";

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
      const color = randomColor({
        luminosity: "dark",
      });
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
        body: JSON.stringify({ profileName, forKids, user, color }),
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

  const cancelHanlder = () => {
    router.back();
  };

  return (
    <div className="createProfile-container">
      <div>
        <h1>Add a profile</h1>
        <p>add another-pearson profile using VideoLib&apos; s services</p>
      </div>
      <form className="createProfile-form" onSubmit={handleSubmit}>
        <div className="createProfile-form-content">
          <div id="name">
            <input
              id="profileName"
              type="text"
              placeholder="Name"
              values={values.profileName}
              onChange={handleChange}
            />
            {errors.isError && <div id="name-error">{errors.msg}</div>}
          </div>

          <div id="kidsSecurity">
            <label htmlFor="forKids" className="checkbox">
              For kids?
              <input
                type="checkbox"
                id="forKids"
                className="checkbox-input"
                value={values.forKids}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <div className="createProfile-form-content-buttons">
          <button type="submit">Create</button>
          <button type="button" onClick={cancelHanlder}>
            Cancel
          </button>
        </div>
      </form>
      {snackbar ? (
        <Snackbar {...snackbarData} hideSnackbar={setSnackbar} />
      ) : null}
    </div>
  );
}

export default CreateProfileForm;
