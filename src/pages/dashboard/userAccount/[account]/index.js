import { useRouter } from "next/router";

function Account() {
  const router = useRouter();
  const { account } = router.query;
  return (
    <div>
      Account site
      <p>here are informations of users</p>
      {account}
    </div>
  );
}

export default Account;
