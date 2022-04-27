import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { connectDatebase } from "../../../../api/functions";

function SettingsPage({ account }) {
  const settingsOptions = ["Abonament", "Privacy", "Profile"];
  const [option, setOption] = useState(settingsOptions[0].toLowerCase());

  const router = useRouter();
  const { account: profile } = router.query;

  const changeOptionHandler = (e) => {
    const label = e.target.innerText.toLowerCase();
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
              Back
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
                <span>{link}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="settings-content_box">
          {profile} {option}
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
      account: {
        account,
        abonament,
      },
    },
  };
}

export default SettingsPage;
