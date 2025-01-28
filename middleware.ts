import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// export default NextAuth(authConfig).auth;
const { auth } = NextAuth(authConfig);

export default async function middleware(...args: Parameters<typeof auth>) {
  return auth(...args);
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};





//https://github.com/nextauthjs/next-auth/issues/10912