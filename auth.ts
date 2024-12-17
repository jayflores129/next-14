import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { baseUrl } from "./api.utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await fetch(baseUrl + "/auth/jwt", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }: any) {
      if (user) {
        token = user;
      }

      return token;
    },
    async session({ session, token }: any) {
      if (!token?.access_token) {
        return null;
      }

      if (token.access_token) {
        session.user = token.user || null;
        session.access_token = token.access_token || null;
        session.exp = token.exp || null;
        return session;
      }
    },
  },
  pages: {
    signIn: "/account/signin",
    signOut: "/account/signout",
    error: "/account/error",
    verifyRequest: "/account/verify-request",
    newUser: "/account/new-user",
  },
});
