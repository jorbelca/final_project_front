import type { NextAuthConfig } from "next-auth";
import { redirect } from "next/navigation";

// declare module "next-auth" {
//   interface Session {
//     url: string;
//     baseUrl: string;
//     user: User & { user_id: string }; // Asegúrate de que el user tenga el user_id
//   }

//   interface User {
//     user_id: string; // Añade el user_id aquí también
//   }
// }

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true; // Puedes personalizar esta lógica si es necesario
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false; // Redirige si no está permitido
      }
    },
    async redirect({ url, baseUrl }) {
      // Redirigimos al dashboard añadiendo el user_id como parámetro
      if (url.startsWith("/dashboard")) {
        return `${baseUrl}/dashboard}`;
      }
      return baseUrl;
    },
    // async session({ session, token, user }) {
    //   // Recuperamos el user_id del token y lo agregamos a la sesión
    //   session.user.user_id = user.user_id;

    //   return session;
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   if (user) {
    //     // Se agrega el user_id al JWT
    //     token.user_id = user.user_id;
    //   }
    //   return token;
    // },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
