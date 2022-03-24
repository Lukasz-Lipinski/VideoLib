import { Card, Layout } from "../../../components";
import { connectDatebase, downloadUser } from "../../api/functions";
import { useContext, useState } from "react";

import MyContext from "../../../context/";

function Profiles({ user, isError, msg }) {
  const [option, setOption] = useState("Personal Data");
  const ctx = useContext(MyContext);
  const { sideNav } = ctx;

  const { profiles } = user;

  if (isError) {
    return <p>{msg}</p>;
  }

  if (!profiles) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <section className="profiles">
        <ul>
          {profiles.map((profile) => (
            <li key={`profile-list-${index}`}>
              <Card {...profile} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { profiles } = context.params;

  let client;
  try {
    client = await connectDatebase();
  } catch (error) {
    return {
      props: {
        isError: true,
        msg: error.message,
      },
    };
  }

  let allUsers;
  try {
    allUsers = await downloadUser(client, "users");
  } catch (error) {
    return {
      props: {
        isError: true,
        msg: error.message,
      },
    };
  }

  for (const key of allUsers) {
    key._id = key._id.toString();
  }

  const user = allUsers.find((user) => {
    const { email } = user;

    const userNick = email.slice(0, email.indexOf("@"));

    if (profiles === userNick) return user;
  });

  return {
    props: {
      user,
    },
  };
}

export default Profiles;
