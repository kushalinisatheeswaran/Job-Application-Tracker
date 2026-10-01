import "server-only";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { initializeUserBoard } from "../init-user-board";

const mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

declare global {
  var authMongoClient: MongoClient | undefined;
}

const client =
  global.authMongoClient ??
  new MongoClient(mongodbUri, {
    tls: true,
  });
global.authMongoClient = client;
const db = client.db("job-board");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },

  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.id) {
            try {
              await initializeUserBoard(user.id);
            } catch (err) {
              console.error("Failed to initialize user board:", err);
            }
          }
        },
      },
    },
  },
});

export async function getSession() {
  const result = await auth.api.getSession({
    headers: await headers(),
  });
  return result;
}

export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  if (result.success) {
    redirect("/sign-in");
  }
}
