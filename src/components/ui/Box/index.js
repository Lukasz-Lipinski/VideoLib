import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";

import { Snackbar } from "../../";
import AppConext from "../../../context/index";
import { signOut } from "next-auth/react";

const Box = ({ option, email, title, price }) => {
  const { abonament } = useContext(AppConext);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackbar, SetSnackbar] = useState({
    className: "pending",
    status: "pending",
    message: "pending",
  });

  const router = useRouter();
  const { account: profileName } = router.query;

  const updateData = async (option, data) => {
    let newProfileName;
    setIsSnackbar(true);

    const response = await fetch(`/api/update/${option}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      SetSnackbar({
        className: "success",
        status: "Success",
        message: "An update has done successfully",
      });

      if (data.hasOwnProperty("profile")) {
        newProfileName = data.profile;
      }

      newProfileName = profileName;

      option === "privacy"
        ? signOut()
        : router.push({
            pathname: "/dashboard/userAccount/[newProfileName]",
            query: { newProfileName },
          });

      return;
    }

    SetSnackbar({
      className: "error",
      status: "Error",
      message: "Something went wrong...",
    });
  };

  const emailValidation = useFormik({
    initialValues: { email: "" },
    validate: (values) => {
      const errors = {};

      if (!values.email.includes("@")) {
        errors.email = "Incorretly-written email address";
      }
      if (values.email.trim() === email.trim()) {
        errors.email = "Assigned email wasn't changed";
      }

      return errors;
    },
    onSubmit: async (values) => {
      await updateData("email", {
        ...values,
        user: email,
      });
    },
  });

  const abonamentValidation = useFormik({
    initialValues: {
      abonament: `${abonament[0].title} - ${abonament[0].description.price}$`,
    },
    validate: (values) => {
      const { abonament } = values;
      const errors = {};

      const newPrice = abonament.includes(`${price}`);

      if (newPrice) {
        errors.abonament = "Abonament hasn't been changed";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const title = values.abonament
        .substring(0, values.abonament.indexOf("-"))
        .trim();

      const price = parseInt(
        values.abonament
          .substring(
            values.abonament.lastIndexOf(" "),
            values.abonament.length - 1
          )
          .trim()
      );

      await updateData(option, {
        abonament: {
          title,
          price,
        },
        user: email,
      });
    },
  });

  const profileValidation = useFormik({
    initialValues: { profile: "" },
    validate: (values) => {
      const errors = {};

      if (values.profile.trim() === profileName.trim()) {
        errors.profile = "The profile name hasn't been changed";
      }

      if (!values.profile.trim()) errors.profile = "A field cannot be empty";

      return errors;
    },
    onSubmit: async (values) => {
      await updateData(option, {
        ...values,
        user: email,
        profileName,
      });
    },
  });

  return (
    <div className="box">
      <h3>{option.toUpperCase()}</h3>
      {option === "abonament" && (
        <>
          <p>Your abonament: {title}</p>
          <p>Price per month: {price}$</p>
          <form onSubmit={abonamentValidation.handleSubmit}>
            <select
              name="abonament"
              onChange={abonamentValidation.handleChange}
              value={abonamentValidation.values.abonament}
            >
              {abonament.map((opt, index) => (
                <option key={`abonament-list-item-${index}`}>
                  {opt.title} - {opt.description.price}$
                </option>
              ))}
            </select>

            <button type="submit">Save</button>
          </form>
          <div className="errorMsg">{abonamentValidation.errors.abonament}</div>
        </>
      )}
      {option === "privacy" && (
        <>
          <form onSubmit={emailValidation.handleSubmit}>
            <p>Email: {email}</p>
            <input
              name="email"
              onChange={emailValidation.handleChange}
              value={emailValidation.values.email}
            />
            <button type="submit">Save</button>
          </form>
          <div className="errorMsg">{emailValidation.errors.email}</div>
        </>
      )}
      {option === "profile" && (
        <>
          <form onSubmit={profileValidation.handleSubmit}>
            <p>Profile: {profileName}</p>
            <input
              name="profile"
              type="text"
              onChange={profileValidation.handleChange}
              value={profileValidation.values.profile}
            />
            <button type="submit">Save</button>
          </form>
          <div className="errorMsg">{profileValidation.errors.profile}</div>
        </>
      )}
      {isSnackbar && <Snackbar hideSnackbar={setIsSnackbar} {...snackbar} />}
    </div>
  );
};

export default Box;
