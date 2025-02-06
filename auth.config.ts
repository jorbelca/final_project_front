import type { NextAuthConfig } from "next-auth";
import { sql } from "@vercel/postgres";
import { User } from "./app/lib/definitions";

type SessionProps = {
  session: any;
  token: any;
  user: any;
};

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && !isOnDashboard) {
        return Response.redirect(new URL("/dashboard/budgets", nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      // Si el usuario se autentica por primera vez, agrega el ID

      if (user) {
        const dbUser =
          await sql<User>`SELECT * FROM users WHERE email=${user.email}`;
        if (dbUser) {
          token.user_id = dbUser.rows[0].user_id;
        }
      }

      return token;
    },
    async session({ session, token }: SessionProps) {
      // Añadir propiedades personalizadas al objeto session

      session.user.id = token.user_id;

      return session; // Devolver el objeto modificado
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
