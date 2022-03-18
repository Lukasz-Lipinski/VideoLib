import { MongoClient } from "mongodb";

export const connectDatebase = async () => {
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGO_BASE_URL
  );

  return client;
};

export const insertData = async (client, collection, data) => {
  const db = client.db();
  await db.collection(collection).insertOne(data);
};

export const downloadUser = async (client, collection) => {
  const db = client.db();

  const document = await db.collection(collection).find().toArray();

  console.log(document);
  return document;
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

    try {
      await insertData(client, "users", { email, password });
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
