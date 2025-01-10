import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
 * The shape of the user object returned in the OAuth providers' `profile` callback,
 * or the second parameter of the `session` callback, when using a database.
 */
  interface User {
    id:string | null
    username:string
    first_name:string
    last_name:string
    roles:Array
  }


  interface Session {
    user: {
      id:string | null
      username:string
      first_name:string
      last_name:string
      roles:Array
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string
    id:string
    username:string
    first_name:string
    last_name:string
    roles:Array
  }
}