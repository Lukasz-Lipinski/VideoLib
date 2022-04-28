import { useState } from "react";
import Link from "next/link";

import { getSession } from "next-auth/react";

import { connectDatebase } from "../../../../api/functions";
import { Box } from "../../../../../components";

function SettingsPage({ user, profileName }) {
  const { account, abonament, email } = user;
  const settingsOptions = ["Abonament", "Privacy", "Profile"];
  const [option, setOption] = useState(settingsOptions[0].toLowerCase());

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
                pathname: "/dashboard/userAccount/[profileName]",
                query: { profileName },
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
                className={link === "Abonament" ? "active" : null}
                key={`settings-options-link-${index}`}
                onClick={changeOptionHandler}
              >
                {link}
              </li>
            ))}
          </ul>
        </div>
        <div className="settings-content_box">
          <Box option={option} email={email} {...abonament} />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });
  const { account: profileName } = ctx.query;

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
