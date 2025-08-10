import "dotenv/config";
import { db } from "@/lib";
import { users } from "@/lib/schema";
import { compare } from "bcrypt";
import { eq } from "drizzle-orm";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Data did not come through");
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.username, credentials.username))
          .get();

        if (!user) {
          throw new Error("Invalid username");
        }

        const passwordValid = await compare(
          credentials.password,
          user.password
        );

        if (!passwordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  }
};

