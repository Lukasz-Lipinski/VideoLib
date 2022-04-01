import { connectDatebase, downloadUser } from "./functions";

export default async function handler(req, res) {
  let client;
  let allUsersCollection;

  try {
    client = await connectDatebase();
  } catch (error) {
    res.status(501).json({ feedback: "Someting went wrong..." });
    return;
  }

  try {
    allUsersCollection = await downloadUser(client, "users");
  } catch (error) {
    res.status(502).json({ feedback: "Connection is invalid!" });
    return;
  }

  res.status(200).json({ feedback: "Success", allUsersCollection });
  client.close();
}
