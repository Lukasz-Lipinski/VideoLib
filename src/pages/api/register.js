import { connectDatebase, insertData, downloadUser } from "./functions";
import { hashPassword } from "../../lib/auth";

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

    try {
      const hashedPassword = hashPassword(password);
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
      snackbar: {
        className: "success",
        status: "success",
        message: "An account was created successfully",
      },
    });
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
