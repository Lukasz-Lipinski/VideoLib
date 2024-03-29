import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { connectDatebase } from ".././functions";
import { comparePassword } from "../../../lib/auth";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        const client = await connectDatebase();

        const user = await client.db().collection("users").findOne({
          email,
        });

        const passwordsAreEqual = await comparePassword(
          password,
          user.password
        );

        if (passwordsAreEqual) {
          return {
            email: user.email,
            profile: user.profile ? user.profile : 0,
          };
        } else {
          throw new Error("Invalid usere's data");
        }
      },
    }),
  ],
});
