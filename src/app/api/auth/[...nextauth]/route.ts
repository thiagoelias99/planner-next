import prisma from "@/prisma/prisma-client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { AuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        },
      },
      from: process.env.EMAIL_FROM
    }),
  ],
  callbacks: { //Adiciona id do usuário na sessão
    async session({ session, user }) {
      session.user = { ...session.user, id: user.id }

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }