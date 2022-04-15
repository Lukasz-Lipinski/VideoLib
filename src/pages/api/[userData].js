import { connectDatebase, downloadUser } from "./functions";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const userEmail = req.query.userData;

    let client;
    let allUsersCollection;
    let userProfiles;

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

    if (userEmail.includes("@")) {
      userProfiles = await client
        .db()
        .collection("users")
        .findOne({ email: userEmail });

      const { profiles } = userProfiles;

      res.status(200).json({ feedback: "Success", profiles });
      client.close();
      return;
    }

    client.close();
    res.status(200).json({ feedback: "Success", allUsersCollection });
  }
}
