import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { connectDatebase } from "../../../../api/functions";

const Box = ({ option, email, title, price, account }) => {
  return (
    <div className="box">
      <h3>{option.toUpperCase()}</h3>
      {option === "abonament" && (
        <>
          <p>Your abonament: {title}</p>
          <p>price per month: {price}$</p>
        </>
      )}
      {option === "privacy" && (
        <>
          <p>Email: {email}</p>
        </>
      )}
      {option === "profile" && (
        <>
          <p>Profile: {account}</p>
        </>
      )}
    </div>
  );
};

function SettingsPage({ user }) {
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
          <Box option={option} email={email} {...abonament} account={account} />
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
