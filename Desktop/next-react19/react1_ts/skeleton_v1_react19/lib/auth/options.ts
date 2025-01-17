
import NextAuth from "next-auth"

import CredentialsProvider from 'next-auth/providers/credentials';
import { signInSchema } from "@/zod/schemas/userSchema";
import { compare } from "bcryptjs"
import { prisma } from "../db/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: {label: 'Username',type: 'text',placeholder: 'Username'},
          password: { label: 'Password', type: 'password',placeholder: 'Password' }
        },
         authorize: async(credentials) => {
          const { username, password } = await signInSchema.parseAsync(credentials)

          const user = await prisma.user.findUnique({
            where: { username: username},
            include: {
              roles: {
                include: {
                  role_types: { select: { name: true } },
                  permissions: { select: { type: true } },
                },
              },
            },
          });
  
          if (!user) {
            return null;
          }
  
          const isPasswordValid = await compare(password, user.password);
          if (!isPasswordValid) {
            return null;
          }
          
    
          return {
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            roles: user.roles.map(role => ({
              role_type: role.role_types.map(role_type => role_type.name),
              permissions: role.permissions.map(permission => permission.type)
            }))
          };
      
        }
      })
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;

      const { pathname } = nextUrl;
      if (pathname.startsWith('/login') && isLoggedIn) {
          return Response.redirect(new URL('/', nextUrl));
      }
    
      return !!auth;
    },
    signIn({user}) {
      console.log(user)
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.roles = user.roles;
      }
    
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.sub??'';
        session.user.username = token.username;
        session.user.first_name = token.first_name;
        session.user.last_name = token.last_name;
        session.user.roles = token.roles;
      }
      return session;
    }
  },
  pages:{
    signIn:'/login',
  }
})

