import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "../libs/prismadb";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { lable: "Email", type: "email" },
        passward: { label: "passward", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.passward) {
          throw new Error("Missing credentials");
        }

        const user = await prismadb.user.findFirst({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.id || !user.hashedpassword) {
          throw new Error("invalid credentials");
        }
        const currentHashedpassword = await bcrypt.hash(
          credentials.passward,
          12
        );
        bcrypt.compare(currentHashedpassword, user.hashedpassword);
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};
