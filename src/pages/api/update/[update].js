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

    if (update) {
      const { [update]: userData } = req.body;
      data = userData;
    } else {
      const { profileName, forKids, bgColor } = req.body;
      data = {
        profileName,
        kidSecurity: forKids,
        bgColor,
      };
    }

    const { user } = req.body;
    let result;

    switch (update) {
      case "abonament":
        result = await client
          .db()
          .collection("users")
          .updateOne(
            { email: user },
            {
              $set: {
                [update]: [{ ...data }],
              },
            }
          );

        break;

      case "email":
        result = await client
          .db()
          .collection("users")
          .updateOne(
            { email: user },
            {
              $set: {
                [update]: data,
              },
            }
          );
        break;

      case "profile":
        const { profileName } = req.body;

        const userAccount = await client
          .db()
          .collection("users")
          .findOne({ email: user });

        const { profiles } = userAccount;
        profiles.forEach((element) => {
          if (element.profileName === profileName) {
            element.profileName = data;
          }
        });

        result = await client
          .db()
          .collection("users")
          .updateOne(
            { email: user },
            {
              $set: {
                profiles: profiles,
              },
            }
          );

        break;
      default: {
        result = await client
          .db()
          .collection("users")
          .updateOne(
            { email: user },
            {
              $addToSet: {
                [update]: data,
              },
            }
          );
      }
    }

    console.log(result.modifiedCount);

    if (result.modifiedCount) {
      res.status(200).json({ message: "successfully", redirect: true });
    } else {
      res.status(202).json({
        message: "A profile including the same data exsits",
        redirect: false,
      });
    }

    client.close();
    return;
  }

  if (req.method === "DELETE") {
    const { email, profileName } = req.body;

    let client;

    try {
      client = await connectDatebase();
    } catch (error) {
      res.status(500).json({ message: "Invalid connection" });
      return;
    }

    try {
      await client
        .db()
        .collection("users")
        .updateOne({ email }, { $pull: { profiles: { profileName } } });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Error's connection, so sorry" });
      return;
    }

    client.close();

    res.status(200).json({
      message: "profile has been deleted successfully",
    });
  }
}
