import { betterAuth} from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URL as string);

const db = client.db("helpinghand");

export const auth = betterAuth({
  baseURL: `${process.env.BETTER_AUTH_URL}`,
  // Every host the app is served from. Without this, better-auth rejects
  // sign-in requests whose Origin differs from baseURL (403 INVALID_ORIGIN).
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://helpinghand-frontend.vercel.app",
    "https://helpinghand-frontend-pink.vercel.app",
    "https://helpinghand-frontend-*.vercel.app",
  ],
  database: mongodbAdapter(db, {
    client,
  }),
    emailAndPassword: { 
    enabled: true, 
    },
    plugins: [jwt()],

    session: {
      cookieCache: {
        enabled: true, 
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60 
    },
  }, 
});