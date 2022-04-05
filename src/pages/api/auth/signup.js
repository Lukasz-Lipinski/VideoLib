import { connectDatebase, insertData, downloadUser } from "../functions";
import { hashPassword } from "../../../lib/auth";

const checkIsEmail = async (email, client) => {
  const result = await client.db().collection("users").findOne({ email });

  if (result) {
    return true;
  }

  return false;
};

export default async function registerHandler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    let client;

    try {
      client = await connectDatebase();
    } catch (error) {
      res.status(500).json({
        feedback: "Connecting with database failed!",
        snackbar: {
          className: "error",
          status: "error",
          message: "Something went wrong...",
        },
      });
      return;
    }

    const isUser = await checkIsEmail(email, client);

    if (isUser) {
      res
        .status(200)
        .json({ message: "Assigned email is already used", status: "error" });
      client.close();
      return;
    }

    try {
      const hashedPassword = await hashPassword(password);
      await insertData(client, "users", { email, password: hashedPassword });
    } catch (error) {
      res.status(500).json({
        feedback: "Incorrected data",
        snackbar: {
          className: "error",
          status: "error",
          message: "Incorrected data!",
        },
      });
      return;
    }

    res.status(200).json({
      feedback: "account created successfully",
      message: "An account was created successfully",
      status: "success",
    });

    client.close();
    return;
  }

  let client;
  try {
    client = await connectDatebase();
  } catch (error) {
    res.status(501).json({ feedback: "Something went wrong" });
    return;
  }

  let users;
  try {
    users = await downloadUser(client, "users");
  } catch (error) {
    res.status(501).json({ feedback: "Invalid data" });
    return;
  }
  res.status(200).json({ users });

  client.close();
}
