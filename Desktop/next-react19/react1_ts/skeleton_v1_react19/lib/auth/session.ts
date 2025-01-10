// utils/session.ts
import { auth } from "./options";

export interface Session {
  user: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    roles: string[];
  };
}

export const getSession = async (): Promise<Session | null> => {
  const session = await auth(); // Replace with actual logic to fetch the session.
  return session ? (session as Session) : null; // Return session or null
};
