import { useMemo } from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { connectDatebase } from "../../../api/functions";

function SettingsPage({ user }) {
  const { email } = user;
  const account = useMemo(() => {
    return email.substring(0, email.indexOf("@"));
  }, [email]);

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
          <li>Link 2</li>
          <li>Link 3</li>
          <li>Link 4</li>
        </ul>
      </nav>
      <main className="settings-content">
        <div className=" menu">
          <ul>
            <li>Menu</li>
          </ul>
        </div>
        <div className="settings-content_box">
          Main account data, including amounts of profiles e.g.
        </div>
        <div className="settings-content_box">Profile data</div>
        <div className="settings-content_box"> Profile data</div>
        <div className="settings-content_box"> Profile data</div>
        <div className="settings-content_box"> Profile data</div>
        <div className="settings-content_box"> Profile data</div>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });

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

  return {
    props: {
      session,
      user,
    },
  };
}

export default SettingsPage;
