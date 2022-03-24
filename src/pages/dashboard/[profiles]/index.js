import { useRouter } from "next/router";
import { IoMdAddCircleOutline } from "react-icons/io";

import { Card, Layout } from "../../../components";
import { connectDatebase, downloadUser } from "../../api/functions";

function Profiles({ user, isError, msg }) {
  const router = useRouter();

  const { profiles } = user;

  if (isError) {
    return <p>{msg}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  const createProfile = () => {
    router.push("createProfile");
  };

  if (!profiles) {
    return (
      <Layout>
        <div>
          <IoMdAddCircleOutline onClick={createProfile} />
        </div>
      </Layout>
    );
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
        <IoMdAddCircleOutline onClik={createProfile} />
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
