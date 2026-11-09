import { betterAuth} from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URL as string);

const db = client.db("helpinghand");

export const auth = betterAuth({
  baseURL: "http://localhost:3000",
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