import { connectDatebase } from "../functions";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    let client;

    const { update } = req.query;

    try {
      client = await connectDatebase();
    } catch (error) {
      res.status(501).json({
        message: "Connection's error",
      });
    }

    let data;

    if (update === "abonament") {
      const { abonament } = req.body;
      data = abonament;
    } else {
      const { profileName, forKids, bgColor } = req.body;
      data = {
        profileName,
        kidSecurity: forKids,
        bgColor,
      };
    }

    const { user } = req.body;

    const result = await client
      .db()
      .collection("users")
      .updateOne(
        { email: user.email },
        {
          $addToSet: {
            [update]: data,
          },
        }
      );

    if (result.modifiedCount) {
      res.status(200).json({ message: "successfully", redirect: true });
    } else {
      res.status(202).json({
        message: "A profile including the same name exsits",
        redirect: false,
      });
    }

    client.close();
    return;
  }

  if (req.method === "DELETE") {
    const {} = req.body;
  }
}
