import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useFormik } from "formik";

import { connectDatebase } from "../../../../api/functions";
import AppConext from "../../../../../context/index";
import { Snackbar } from "../../../../../components";

const Box = ({ option, email, title, price, profileName }) => {
  const { abonament } = useContext(AppConext);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackbar, SetSnackbar] = useState({
    className: "pending",
    status: "pending",
    message: "pending",
  });

  const updateData = async (option, data) => {
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
        className: "sucess",
        status: "Success",
        message: "An update has done successfully",
      });
    }
  };

  const emailValidation = useFormik({
    initialValues: { email: "" },
    validate: (values) => {
      const errors = {};

      if (!values.email.includes("@")) {
        errors.email = "Incorretly-written email address";
      }
      if (values.email === email) {
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
    initialValues: { abonament: "" },
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

      if (values.profile === profileName) {
        errors.profile = "The profile name hasn't been changed";
      }

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
        <form onSubmit={abonamentValidation.handleSubmit}>
          <p>Your abonament: {title}</p>
          <p>price per month: {price}$</p>
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
          <div className="errorMsg">{abonamentValidation.errors.abonament}</div>
        </form>
      )}
      {option === "privacy" && (
        <form onSubmit={emailValidation.handleSubmit}>
          <p>Email: {email}</p>
          <input
            name="email"
            onChange={emailValidation.handleChange}
            value={emailValidation.values.email}
          />
          <button type="submit">Save</button>
          <div className="errorMsg">{emailValidation.errors.email}</div>
        </form>
      )}
      {option === "profile" && (
        <form onSubmit={profileValidation.handleSubmit}>
          <p>Profile: {profileName}</p>
          <input
            name="profile"
            type="text"
            onChange={profileValidation.handleChange}
            value={profileValidation.values.profile}
          />
          <button type="submit">Save</button>
          <div className="errorMsg">{profileValidation.errors.profile}</div>
        </form>
      )}
      {isSnackbar && <Snackbar hideSnackbar={setIsSnackbar} {...snackbar} />}
    </div>
  );
};

function SettingsPage({ user, profileName }) {
  const { account, abonament, email } = user;
  const settingsOptions = ["Abonament", "Privacy", "Profile"];
  const [option, setOption] = useState(settingsOptions[0].toLowerCase());

  const router = useRouter();
  const { account: profile } = router.query;

  const changeOptionHandler = (e) => {
    const label = e.target.innerText.toLowerCase();
    document.querySelectorAll("li").forEach((link) => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");
    setOption(label);
  };

  return (
    <div className="settings">
      <nav className="settings-nav">
        <ul>
          <li>
            <Link
              href={{
                pathname: "/dashboard/[account]",
                query: { account },
              }}
            >
              <a id="logo">VideoLib</a>
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/dashboard/userAccount/[profile]",
                query: { profile },
              }}
            >
              <a>Back</a>
            </Link>
          </li>
        </ul>
      </nav>

      <main className="settings-content">
        <div className="menu">
          <ul>
            {settingsOptions.map((link, index) => (
              <li
                key={`settings-options-link-${index}`}
                onClick={changeOptionHandler}
              >
                {link}
              </li>
            ))}
          </ul>
        </div>
        <div className="settings-content_box">
          <Box
            option={option}
            email={email}
            {...abonament}
            profileName={profile}
          />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });
  const { account: profileName } = ctx.query;
  console.log(profileName);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        pernament: false,
      },
    };
  }

  const { email } = session.user;

  const client = await connectDatebase();

  const user = await client.db().collection("users").findOne({ email });

  user._id = user._id.toString();
  const account = email.substring(0, email.indexOf("@"));
  const [abonament] = user.abonament;

  return {
    props: {
      session,
      profileName,
      user: {
        account,
        abonament,
        email,
      },
    },
  };
}

export default SettingsPage;
