import NextAuth, { User, Session } from "next-auth";
import { AuthOptions, getServerSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
declare module "next-auth" {
  interface User {
    id?: string | null;
    accessToken?: string;
    refreshToken?: string;
    role?: string[];
  }
  interface Session {
    id?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    role?: string[];
  }
}

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        try {
          const res = await axios.post(
            "http://11.11.7.81:3002/api/v1/auth/sign-in",
            {
              username: credentials?.username,
              password: credentials?.password,
            }
          );
          if (res.status === 200 && res.data?.data) {
            const user = res.data.data;
            return {
              id: user.userInformation.userId.toString(),
              name: `${user.userInformation.firstName} ${user.userInformation.lastName}`,
              email: user.userInformation.email,
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
              role: user.userInformation.role,
            };
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  debug: true,
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        // id: token.id,
        name: token.name,
        email: token.email,
        // role: token.role,
      };
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;

      return session;
    },
  },
  pages: { signIn: "/SignIn" },
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
