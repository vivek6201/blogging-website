import { DefaultSession, NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { validateUser } from "./utils";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async (params: { token: JWT; user: any }) => {
      const { token, user } = params;
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.jwtToken = user.token;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (session.user) {
        return {
          ...session,
          user: {
            id: token.id,
            email: token.email,
            token: token.jwtToken,
          },
        };
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your Password",
        },
      },
      async authorize(credentials): Promise<{
        id: string;
        token: string;
        email: string;
      } | null> {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const data = await validateUser(credentials);

        if (!data) {
          return null;
        }

        console.log(data);

        return {
          id: data.id,
          token: data.token,
          email: credentials.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages:{
    signIn: '/signin',
  }
};
